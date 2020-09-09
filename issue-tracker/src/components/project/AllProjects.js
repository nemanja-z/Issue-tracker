import React from "react";
import Table from "react-bootstrap/Table";
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import ModalRole from "../role/ModalRole";

const AllProjects = ({projects}) => {
    return(
        <Table striped bordered hover>
        <thead>
            <tr>
                <th>Project</th>
                <th>Project_lead</th>
                <th>Url</th>
                <th>Add User</th>
            </tr>
        </thead>
        <tbody>
            {projects.map(p=>
            <tr key={p.project}>
                <td><Link to={`/projects/:${p.projectId}`}>{p.project}</Link></td>
                <td><Link to={`/projects/:${p.leaderId}`}>{p.project_lead}</Link></td>
                <td>{p.url}</td>
                <td><ModalRole project={p.project}/></td>
            </tr>
            )}
        </tbody>
        </Table>
    )
}
AllProjects.propTypes={
    projects:PropTypes.array
}
export default AllProjects;