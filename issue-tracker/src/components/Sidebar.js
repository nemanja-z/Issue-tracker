import React from "react";
import Nav from "react-bootstrap/Nav";
import {Link} from "react-router-dom";
import  "./navbar.css";
import PropTypes from 'prop-types';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from "react-bootstrap/Button";


const Sidebar = ({picture, username, logOut}) => {
            return(
            <Nav className="sidebar" style={{"marginTop":"70px"}}>
                <Nav.Item>
                <NavDropdown title={
                    <div>
                        <img alt="profile" style={{width:"20px", height:"20px"}} src={picture}/>{username}
                    </div>}>
                    <Button size="sm" className="nav-dropdown-item" onClick={logOut}>Log Out</Button>
                    </NavDropdown>
                </Nav.Item>
                <Nav.Item>
                    <Link to="/home" className="nav-link">Home</Link>
                
                    <Link to="/my_tasks" className="nav-link">My Tasks</Link>
                
                    <Link to="/manage" className="nav-link">Manage</Link>
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