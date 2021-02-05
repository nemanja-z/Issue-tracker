import React from "react";
import Nav from "react-bootstrap/Nav";
import {Link} from "react-router-dom";
import  "./navbar.css";
import PropTypes from 'prop-types';
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import NavDropdown from "react-bootstrap/NavDropdown";
import { faHome, faTasks, faEdit, faUsers, faBug } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Sidebar = ({auth, picture, logOut}) => {
            return(
                <Nav className="sidebar">
                <Nav.Item className="pb-5" style={{"fontFamily":"Verdana","color":"#40a8c4", "fontWeight":"bold", "fontSize":"20px", "marginLeft":"10px"}}>
                <FontAwesomeIcon icon={faBug} size="5x" />
                </Nav.Item>
                <Nav.Item>
                    <Link to="/home" className="nav-link"><FontAwesomeIcon icon={faHome} /> Home</Link>
                
                    <Link to="/my_tasks" className="nav-link"><FontAwesomeIcon icon={faTasks} /> Tasks</Link>
                
                    {auth.role==="Manager" && <Link to="/manage" className="nav-link"><FontAwesomeIcon icon={faUsers} /> Manage</Link>}

                    <Link to="/settings" className="nav-link"><FontAwesomeIcon icon={faEdit} /> Settings</Link>
                </Nav.Item>
                <Nav.Item style={{"justifyContent":"center"}}>
                <NavDropdown size="sm" drop='down' title={
                <>
                    
                   <Nav.Item className="ml-3 d-flex flex-column">
                   <Image style={{"height":"40px", "width":"40px"}} src={picture} fluid/> 
                   {auth.username}</Nav.Item> 
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