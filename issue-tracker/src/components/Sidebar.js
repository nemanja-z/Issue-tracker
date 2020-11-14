import React from "react";
import Nav from "react-bootstrap/Nav";
import {Link} from "react-router-dom";
import  "./navbar.css";

const Sidebar = () => {
            return(
            <Nav className="sidebar" style={{"marginTop":"70px"}}>
                <Nav.Item>
                    <Link to="/home" className="nav-link">Home</Link>
                
                    <Link to="/my_tasks" className="nav-link">My Tasks</Link>
                
                    <Link to="/manage" className="nav-link">Manage</Link>
                </Nav.Item>
            </Nav>
    )
}

export default Sidebar;