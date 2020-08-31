import React from "react";
import Table from "react-bootstrap/Table";
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';

const MyProjects = ({projects}) =>{
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
            {projects.map(p=>
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

MyProjects.propTypes={
    projects:PropTypes.array
}

export default MyProjects;