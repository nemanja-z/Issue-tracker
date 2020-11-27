import React from "react";
import Table from "react-bootstrap/Table";
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import ModalRole from "../role/ModalRole";
import ModalStatus from "./ModalStatus";
import Dropdown from 'react-bootstrap/Dropdown';
import Button from "react-bootstrap/Button";
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const AllProjects = ({projects, username, users}) => {
    return(
        <Table responsive="xs" striped bordered hover>
        <thead>
            <tr>
                <th>Project</th>
                <th>Project leader</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {projects.map(p=>
            <tr key={p.name}>
                <td><Link to={`/projects/:${p.id}`}>{p.name}</Link></td>
                <td><Link to={`/projects/:${p.member[0].id}`}>{p.member[0].username}</Link></td>
                {username===p.manager.id ? 
                <td>
                <Dropdown as={ButtonGroup}>
                    <Button variant="info">Edit</Button>
                    <Dropdown.Toggle split />
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