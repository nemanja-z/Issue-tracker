import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import NavDropdown from "react-bootstrap/NavDropdown";

const Header = ({logOut}) => {

    return(
        <>
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand >Issue buster</Navbar.Brand>
            <Nav className="mr-auto">
                <Link to="/dashboard" className="nav-link">Dashboard</Link>
                <NavDropdown title="Projects" id="nav-dropdown">
                    <Link to="/user-projects" className="nav-item">My Projects</Link>
                    <Dropdown.Divider />
                    <Link to="/projects" className="nav-item">All Projects</Link>
                    <Dropdown.Divider />
                    <Link to="/new-project" className="nav-item">Create Project</Link>
                </NavDropdown>
                <NavDropdown title="Issues" id="nav-dropdown">
                    <Link to="/assigned-issues" className="nav-item">Assigned to me</Link>
                    <Dropdown.Divider />
                    <Link to="/issues" className="nav-item">Search for issues</Link>
                    <Dropdown.Divider />
                    <Link to="/new-issue" className="nav-item">Report Issue</Link>
                </NavDropdown>
                <NavDropdown title="Manage"  id="nav-dropdown">
                    <Link to="/add-roles" className="nav-item">User Roles</Link>
                    <Dropdown.Divider />
                    <Link to="/add-users" className="nav-item">Project Users</Link>
                </NavDropdown>
            </Nav>
            <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2"/>
                <Button variant="outline-info">Search</Button>
                <Button variant="secondary" onClick={logOut}>Log Out</Button>
            </Form>
        </Navbar>

        </>
    )
}
Header.propTypes={
    logOut:PropTypes.func.isRequired
}
export default Header;