import React from "react";
import {useRouteMatch} from "react-router-dom";


const Issue = () => {
    const match = useRouteMatch("/issues/:id");
    console.log(match)
    return(
        <>
            <h1>Heyyyy</h1>
        </>
    )
}

export default Issue;