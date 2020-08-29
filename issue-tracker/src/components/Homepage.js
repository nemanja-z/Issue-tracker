import React from "react";
import { useApolloClient } from '@apollo/client';
import {useHistory} from "react-router-dom";
import Header from "./Header";
import {Switch, Route} from "react-router-dom";
import AllProjects from "./project/AllProjects";
import Project from "./project/Project";
import IssueForm from './issue/IssueForm';
import {useQuery} from "@apollo/client";
import {PROJECTS} from "../queries/project/queries";
import Error from "./Error";


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
    if(loading) return <span>loading...</span>;
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
              {data && <IssueForm projects={data.allProjectManagers}/>}
            </Route>
        </Switch>
        </>
    )
}



export default Homepage;