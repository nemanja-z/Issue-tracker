import React from "react";
import { Route, Redirect } from "react-router-dom";
const PrivateRoute = ({token, children, ...rest}) => {
    return(
        <Route
        {...rest}
        render={()=>
        token ? (children):
        (<Redirect
            to="/login"
        />)
        }
        />)
}

export default PrivateRoute;