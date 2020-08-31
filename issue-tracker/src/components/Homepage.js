import React from "react";
import { useApolloClient } from '@apollo/client';
import {useHistory} from "react-router-dom";
import Header from "./Header";
import {Switch, Route} from "react-router-dom";
import AllProjects from "./project/AllProjects";
import MyProjects from "./project/MyProjects";
import Assigned from './issue/Assigned';
import Project from "./project/Project";
import IssueForm from './issue/IssueForm';
import ProjectForm from './project/ProjectForm';
import AddUser from './user/AddUser';
import AddRole from './role/AddRole';
import {useQuery} from "@apollo/client";
import {PROJECTS} from "../queries/project/queries";
import Error from "./Error";
import Spinner from 'react-bootstrap/Spinner';

const Homepage = () => {
    const history = useHistory();
    const client = useApolloClient();
    const logOut = () => {
        client.resetStore();
        localStorage.clear();
        history.push("/login");
    };
    const { loading, error, data } = useQuery(PROJECTS, {
        onError: (error) =>  console.log(error.graphQLErrors[0].message)
    });
    if (loading) return (<Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
              </Spinner>);
    if(error){
        return <Error error={error.message}/>
    }
    return(
        <>
        <Header logOut={logOut}/>
        <Switch>
            <Route path="/projects/:id">
                <Project/>
            </Route>
            <Route path="/projects">
              {data&&<AllProjects projects={data.allProjectManagers}/>}
            </Route>
            <Route path="/new-issue">
              {data && <IssueForm history={history} projects={data.allProjectManagers}/>}
            </Route>
            <Route path="/new-project">
              <ProjectForm history={history}/>
            </Route>
            <Route path="/add-users">
                <AddUser/>
            </Route>
            <Route path="/add-roles">
               {data && <AddRole projects={data.allProjectManagers}/>}
            </Route>
            <Route path="/assigned-issues">
                <Assigned/>
            </Route>
            <Route path="/user-projects">
                <MyProjects/>
            </Route>
        </Switch>
        </>
    )
}



export default Homepage;