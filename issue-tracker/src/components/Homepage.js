import React from "react";
import { useApolloClient } from '@apollo/client';
import {useHistory} from "react-router-dom";
import Header from "./Header";
import {Switch, Route} from "react-router-dom";
import AllProjects from "./project/AllProjects";

const Homepage = () => {
    const history = useHistory();
    const client = useApolloClient();
    const logOut = () => {
        client.resetStore();
        localStorage.clear();
        history.push("/login");
    };

    return(
        <>
        <Header logOut={logOut}/>
        <Switch>
            <Route path="/tickets">

            </Route>
            <Route path="/users">
                
            </Route>
            <Route path="/roles">
                
            </Route>
            <Route path="/projects">
                <AllProjects/>
            </Route>
        </Switch>
        </>
    )
}



export default Homepage;