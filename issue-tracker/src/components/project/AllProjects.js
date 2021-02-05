import React from "react";
import Table from "react-bootstrap/Table";
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import ModalRole from "../role/ModalRole";
import ModalStatus from "./ModalStatus";
import Dropdown from 'react-bootstrap/Dropdown';

const AllProjects = ({projects, username, users}) => {
    return(
        <Table responsive striped bordered hover>
        <thead>
            <tr>
                <th>Project</th>
                <th>Project leader</th>
                <th>Url</th>
                <th>Active</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {projects.map(p=>
            <tr key={p.id}>
                <td><Link to={`/projects/:${p.id}`}>{p.name}</Link></td>
                <td>{p.member[0].username}</td>
                <th>{p.url}</th>
                <td>{p.isActive.toString()}</td>
                {username===p.manager.id ? 
                <td>
                <Dropdown>
                    <Dropdown.Toggle
                    variant="info">
                    Edit
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                    <ModalRole users={users} project={p.name}/>
                    <Dropdown.Divider />
                    <ModalStatus projectId={p.id}/>
                    </Dropdown.Menu>
                </Dropdown>
                </td>: <td></td>}
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