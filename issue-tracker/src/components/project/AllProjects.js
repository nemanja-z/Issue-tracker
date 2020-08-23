import React from "react";
import {useQuery} from "@apollo/client";
import {PROJECTS} from "../../queries/project/queries";
import Table from "react-bootstrap/Table";


const AllProjects = () => {
    const { loading, error, data } = useQuery(PROJECTS);
    if(loading) return <span>loading...</span>;
    console.log(data);
    return(
        <Table striped bordered hover variant="dark">
        <thead>
            <tr>
                <th>Project</th>
                <th>Project_lead</th>
                <th>Url</th>
            </tr>
        </thead>
        </Table>
    )
}

export default AllProjects;