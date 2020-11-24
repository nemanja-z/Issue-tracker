import React from "react";
import Nav from "react-bootstrap/Nav";
import {Link} from "react-router-dom";
import  "./navbar.css";
import PropTypes from 'prop-types';
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import NavDropdown from "react-bootstrap/NavDropdown";


const Sidebar = ({auth, picture, logOut}) => {
            return(
                <Nav className="sidebar">
                <Nav.Item style={{"fontFamily":"Verdana","color":"#40a8c4", "fontWeight":"bold", "fontSize":"20px", "marginLeft":"10px"}}>
                Issue Tracker
                </Nav.Item>
                <Nav.Item>
                    <Link to="/home" className="nav-link">Home</Link>
                
                    <Link to="/my_tasks" className="nav-link">My Tasks</Link>
                
                    {auth.role==="Manager" && <Link to="/manage" className="nav-link">Manage</Link>}

                    <Link to="/settings" className="nav-link">Settings</Link>
                </Nav.Item>
                <Nav.Item style={{"justifyContent":"center"}}>
                <NavDropdown size="sm" drop='down' title={
                <>
                    <Image style={{"height":"50px", "width":"50px"}} src={picture} fluid/>
                    <Nav.Item>{auth.username}</Nav.Item>
                </>}>
                    <Button size="sm" className="dropdown-item" onClick={logOut}>Log Out</Button>
                    
                </NavDropdown>
                </Nav.Item>
            </Nav>
    )
}
Sidebar.propTypes={
    auth:PropTypes.object.isRequired,
    picture:PropTypes.string.isRequired,
    logOut:PropTypes.func.isRequired
}
export default Sidebar;