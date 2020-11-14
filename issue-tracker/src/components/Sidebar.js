import React from "react";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import NavDropdown from 'react-bootstrap/NavDropdown';
import  "./navbar.css";

const Sidebar = () => {
            return(
            <Nav className="sidebar">
                <Nav.Item>
                    <Link to="/home" className="nav-link">Home</Link>
                </Nav.Item>
                <Nav.Item>
                    <Link to="/my_tasks" className="nav-link">My Tasks</Link>
                </Nav.Item>
                <Nav.Item>
                    <Link to="/manage" className="nav-link">Manage</Link>
                </Nav.Item>
            </Nav>
    )
}

export default Sidebar;