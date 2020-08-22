import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

const Header = ({logOut}) => {



    return(
        <>
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand >Issue buster</Navbar.Brand>
            <Nav className="mr-auto">
                <Link to="/dashboard" className="nav-link">Dashboard</Link>
                <Link to="/roles" className="nav-link">Manage Role Assignment</Link>
                <Link to="/users" className="nav-link">Manage Project Users</Link>
                <Link to="/project" className="nav-link">My projects</Link>
                <Link to="/tickets" className="nav-link">My tickets</Link>
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