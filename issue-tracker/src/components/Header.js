import React from "react";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import "./header.css";


const Header = ({logOut}) => {

    return(
            <Nav className="sidenav">
                <Link to="/home" className="nav-link">Home</Link>
                <Link to="/my_tasks" className="nav-link">My tasks</Link>
                <Button className="btn" onClick={logOut}>Log Out</Button>
            </Nav>
            
    )
}
Header.propTypes={
    logOut:PropTypes.func.isRequired
}
export default Header;