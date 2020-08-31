import React from "react";
import Table from "react-bootstrap/Table";
import {Link} from "react-router-dom";
import {useQuery} from "@apollo/client";
import {USER_PROJECTS} from "../../queries/project/queries";
import Error from "../Error";
import Spinner from 'react-bootstrap/Spinner';
const MyProjects = () =>{
    const { loading, error, data } = useQuery(USER_PROJECTS, {
        onError: (error) =>  console.log(error.graphQLErrors[0].message)
    });
    if (loading) 
        return (<Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
                </Spinner>);
    if(error){
        return <Error error={error.message}/>
    }
    return(
        <Table striped bordered hover>
        <thead>
            <tr>
                <th>Project</th>
                <th>Project_lead</th>
                <th>Url</th>
            </tr>
        </thead>
        <tbody>
            {data.userProjects.map(p=>
            <tr key={p.project}>
                <td><Link to={`/projects/:${p.projectId}`}>{p.project}</Link></td>
                <td><Link to={`/projects/:${p.leaderId}`}>{p.project_lead}</Link></td>
                <td>{p.url}</td>
            </tr>
            )}
        </tbody>
        </Table>
    )
}
export default MyProjects;