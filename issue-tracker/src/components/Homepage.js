import React from "react";
import { useApolloClient } from '@apollo/client';
import {useHistory} from "react-router-dom";
import Header from "./Header";
import {Switch, Route} from "react-router-dom";
import Project from "./project/Project";
import {useQuery} from "@apollo/client";
import {PROJECTS, USER_PROJECTS} from "../queries/project/queries";
import {AUTH} from "../queries/user/queries";
import Error from "./Error";
import Spinner from 'react-bootstrap/Spinner';
import MyView from './MyView';
import AssignedToMe from "./issue/AssignedToMe";

const Homepage = () => {
    const history = useHistory();
    const client = useApolloClient();
    const logOut = () => {
        localStorage.clear();
        history.push("/login");
    };
    const { loading:me_loading, error:me_error, data:data_me } = useQuery(AUTH, {
        pollInterval:1000,
        onError: (error) =>  console.log(error.graphQLErrors[0].message)
    });
    const { loading:user_loading, error:user_error, data:user_data } = useQuery(USER_PROJECTS, {
        onError: (error) =>  console.log(error.graphQLErrors[0].message)
    });
    const { loading, error, data } = useQuery(PROJECTS, {
        onError: (error) =>  console.log(error.graphQLErrors[0].message)
    });
    if (me_loading||loading||user_loading){ 
        return (<Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
              </Spinner>);}
    if(error||user_error){
        return error?<Error error={error.message}/>:<Error error={user_error.message}/>
    }
    const updateCacheWith = project => {
        const includedIn = (set, object) =>
        set.map(b => b.id).includes(object.id)
        const dataInStore = client.readQuery({ query: PROJECTS });
        if (!includedIn(dataInStore.allProjectManagers, project)) {
          client.writeQuery({
            query: PROJECTS,
            data: { allProjectManagers: dataInStore.allProjectManagers.concat(project) }
          });
        }
      }
    const username=data_me?.me?.id;
    const projects = user_data.userProjects?.map(project=>project);
    return(
        <>
        <Header logOut={logOut}/>
        <Switch>
            <Route path="/projects/:id">
                <Project projects={projects}/>
            </Route>
            <Route path="/home">
            {(data, username) && <MyView username={username} updateCacheWith={updateCacheWith} history={history} projects={data.allProjectManagers}/>}
            </Route>
            <Route path="/my_tasks">
                <AssignedToMe projectList={projects}/>
            </Route>
        </Switch>
        </>
    )
}

export default Homepage;