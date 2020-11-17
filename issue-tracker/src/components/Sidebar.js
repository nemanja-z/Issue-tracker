import React from "react";
import Nav from "react-bootstrap/Nav";
import {Link} from "react-router-dom";
import  "./navbar.css";
import PropTypes from 'prop-types';
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

const Sidebar = ({picture, username, logOut}) => {
            return(
            <Nav className="sidebar">
                <Nav.Item style={{"marginLeft":"20px"}}>
                     <Image src={picture} roundedCircle style={{"height":"50px", "width":"50px"}} fluid/>
                    <Nav.Item>{username}</Nav.Item>
                </Nav.Item>
                <Nav.Item>
                    <Link to="/home" className="nav-link">Home</Link>
                
                    <Link to="/my_tasks" className="nav-link">My Tasks</Link>
                
                    <Link to="/manage" className="nav-link">Manage</Link>

                    
                </Nav.Item>
                <Nav.Item>
                <Nav.Link><Button size="sm" className="nav-dropdown-item" onClick={logOut}>Log Out</Button></Nav.Link>
                </Nav.Item>
            </Nav>
    )
}
Sidebar.propTypes={
    picture:PropTypes.string.isRequired,
    username:PropTypes.string.isRequired,
    logOut:PropTypes.func.isRequired
}
export default Sidebar;