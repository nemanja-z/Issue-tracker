import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({children, ...rest}) => {
    const auth= localStorage.getItem('auth');
    return(
        <Route
        {...rest}
        render={({location})=>
        auth? (children):
        (<Redirect
        to="/login"/>)}
        />
    )
}

export default PrivateRoute;