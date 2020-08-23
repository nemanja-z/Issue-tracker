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
                    <Link to="/projects" className="nav-item">All Projects</Link>
                    <Dropdown.Divider />
                    <Link to="/user/projects" className="nav-item">My Projects</Link>
                </NavDropdown>
                <NavDropdown title="Issues" id="nav-dropdown">
                    <Link to="/issues" className="nav-item">Search for issues</Link>
                </NavDropdown>
                <NavDropdown title="Manage"  id="nav-dropdown">
                    <Link to="/roles" className="nav-item">User Roles</Link>
                    <Dropdown.Divider />
                    <Link to="/users" className="nav-item">Project Users</Link>
                    <Dropdown.Divider />
                    <Link to="/projects" className="nav-item">My projects</Link>
                    <Dropdown.Divider />
                    <Link to="/tickets"  className="nav-item">My tickets</Link>
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