import React from "react";
//import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

const Header = ({logOut}) => {
    return(
            <SideNav>
            <SideNav.Nav>
                <NavItem>
                <Link to="/home" className="nav-link">Home</Link>
                </NavItem>
            </SideNav.Nav>
            <SideNav.Nav>
            <NavItem>
                <Link to="/my_tasks" className="nav-link">My Tasks</Link>
                </NavItem>
            </SideNav.Nav>
            <SideNav.Nav>
                <NavItem>
                <Button className="btn" onClick={logOut}>Log Out</Button>
                </NavItem>
            </SideNav.Nav>
            </SideNav>
    )
}
Header.propTypes={
    logOut:PropTypes.func.isRequired
}
export default Header;