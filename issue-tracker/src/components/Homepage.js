import React from "react";
import { useApolloClient } from '@apollo/client';
import {useHistory} from "react-router-dom";
import Header from "./Header";
//import {Switch, Link} from "react-router-dom";

const Homepage = () => {
    const history = useHistory();
    const client = useApolloClient();
    const logOut = () => {
        client.resetStore();
        localStorage.clear();
        history.push("/login");
    };

    return(
        <Header logOut={logOut}/>
    )
}



export default Homepage;