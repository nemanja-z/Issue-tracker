import React from "react";
import {useQuery} from "@apollo/client";
import {PROJECTS} from "../../queries/project/queries";
import Table from "react-bootstrap/Table";
import {Link} from "react-router-dom";
import Error from "../Error";

const AllProjects = () => {
    const { loading, error, data } = useQuery(PROJECTS);
    if(loading) return <span>loading...</span>;
    if(error){
        return <Error error={error}/>
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
            {data.allProjectManagers.map(p=>
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

export default AllProjects;