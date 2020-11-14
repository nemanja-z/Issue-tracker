import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';


const BaseNavbar = ({picture, username, logOut}) => {

    return(
        <Navbar bg="light" fixed="top" expand="lg">
        <Navbar.Brand>Issue tracker</Navbar.Brand>
        <Nav>
            <NavDropdown title={
                    <div>
                        <img alt="profile" style={{width:"20px", height:"20px"}} src={picture}/>{username}
                    </div>}>
                    <Button size="sm" className="nav-dropdown-item" onClick={logOut}>Log Out</Button>
            </NavDropdown>
        </Nav>
    </Navbar>)
}

export default BaseNavbar;