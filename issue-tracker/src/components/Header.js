import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
const Header = ({logOut}) => {

    return(
        <>
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand >Bug tracker</Navbar.Brand>
            <Nav className="mr-auto">
                <Link to="/my-view" className="nav-link">My View</Link>
            </Nav>
            <Form inline>
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