import React from "react";
import Button from 'react-bootstrap/Button';
import { useApolloClient } from '@apollo/client';
import {useHistory} from "react-router-dom";

const Homepage = ({user}) => {
    const history = useHistory();
    const client = useApolloClient();
    const logOut = () => {
        client.resetStore();
        localStorage.clear();
        history.push("/");
    };

    return(<div>
        <h1>Hello there! Authentication's working!!</h1>
        {user&&<Button
            size='lg'
            variant='primary'
            onClick={logOut}>Logout</Button>}
        </div>
    )
}



export default Homepage;