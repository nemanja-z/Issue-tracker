import React from "react";
import {ISSUES} from "../../queries/issue/queries";
import {useParams} from "react-router-dom";
import {useQuery} from "@apollo/client";
import Error from "../Error";
import {Link} from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";

const Project = () => {
    const {id} = useParams();
    const { loading, error, data } = useQuery(ISSUES, {
        variables: { projectId:id },
      });
    
    if (loading) return <span>loading...</span>;
    if (error) return <Error error={error.message}/>

    return(
                <Navbar fixed="left">
                {data.allIssues.map(issue=>
                        <Link key={issue.id} to={`/issues/:${issue.id}`} className="nav-item">{issue.description}</Link>)}
                        
                </Navbar>
            
    )
}
/*<>
                <Navbar bg="dark" variant="light">
                <Navbar.Brand >Issues</Navbar.Brand></Navbar>*/
export default Project;