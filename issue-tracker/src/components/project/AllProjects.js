import React from "react";
import Table from "react-bootstrap/Table";
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import ModalRole from "../role/ModalRole";

const AllProjects = ({projects, username, users}) => {
    return(
        <Table striped bordered hover>
        <thead>
            <tr>
                <th>Project</th>
                <th>Project_lead</th>
                <th>Add User</th>
            </tr>
        </thead>
        <tbody>
            {projects.map(p=>
            <tr key={p.name}>
                <td><Link to={`/projects/:${p.id}`}>{p.name}</Link></td>
                <td><Link to={`/projects/:${p.projectLead.id}`}>{p.projectLead.username}</Link></td>
                {username===p.projectLead.id ? <td><ModalRole users={users} project={p.name}/></td> : <td></td>}
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