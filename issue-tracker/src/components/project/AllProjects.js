import React from "react";
import {useQuery} from "@apollo/client";
import {PROJECTS} from "../../queries/project/queries";
import Table from "react-bootstrap/Table";


const AllProjects = () => {
    const { loading, error, data } = useQuery(PROJECTS);
    if(loading) return <span>loading...</span>;
    console.log(data);
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
                <td>{p.project}</td>
                <td>{p.project_lead}</td>
                <td>{p.url}</td>
            </tr>
            )}
        </tbody>
        </Table>
    )
}

export default AllProjects;