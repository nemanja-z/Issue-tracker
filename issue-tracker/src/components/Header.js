import React from "react";
//import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import SideNav, { NavItem} from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import NavDropdown from 'react-bootstrap/NavDropdown';


const Header = ({picture, logOut, username}) => {
    return(<Container style={{border:"solid"}}>
            <SideNav style={{backgroundColor:"transparent"}}>
            <SideNav.Nav>
                <NavItem>
                    <Link to="/home" className="nav-link">Home</Link>
                </NavItem>
                <NavItem>
                    <Link to="/my_tasks" className="nav-link">My Tasks</Link>
                </NavItem>
                <NavItem>
                    <Link to="/manage" className="nav-link">Manage</Link>
                </NavItem>
                <NavDropdown title={
                    <div>
                <img style={{width:"20px", height:"20px"}} src={picture}/>{username}
                </div>}>
                    <Button className="nav-dropdown-item" size="sm" onClick={logOut}>Log Out</Button>
                </NavDropdown>
            </SideNav.Nav>
            </SideNav>
            </Container>
    )
}
Header.propTypes={
    logOut:PropTypes.func.isRequired
}
export default Header;