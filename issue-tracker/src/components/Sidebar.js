import React from "react";
import Nav from "react-bootstrap/Nav";
import {Link} from "react-router-dom";
import  "./navbar.css";
import PropTypes from 'prop-types';
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import DropdownButton from "react-bootstrap/DropdownButton";


const Sidebar = ({picture, username, logOut}) => {
            return(
                <Nav className="sidebar">
                <Nav.Item style={{"fontFamily":"Verdana","color":"#40a8c4", "fontWeight":"bold", "fontSize":"20px", "marginLeft":"10px"}}>
                Issue Tracker
                </Nav.Item>
                <Nav.Item>
                    <Link to="/home" className="nav-link">Home</Link>
                
                    <Link to="/my_tasks" className="nav-link">My Tasks</Link>
                
                    <Link to="/manage" className="nav-link">Manage</Link>

                </Nav.Item>
                <Nav.Item style={{"marginLeft":"10px"}}>
                <DropdownButton drop='down' title={
                <>
                    <Image style={{"height":"50px", "width":"50px"}} src={picture}/>
                    <Nav.Item>{username}</Nav.Item>
                </>}>
                    <Button size="sm" className="dropdown-item" onClick={logOut}>Log Out</Button>
                    
                </DropdownButton>
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