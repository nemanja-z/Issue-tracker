import React, {useState} from "react";
import Container from "react-bootstrap/Container";
import AllProjects from './project/AllProjects';
import ModalProject from './project/ModalProject';
import Card from 'react-bootstrap/Card';

const MyView = ({history, projects, username, updateCacheWith, users, leader}) => {

    return(
        
        <>
        <Card>
        <Card.Header as="h2">Home</Card.Header>
        <Card.Link><ModalProject history={history} leader={leader} updateCacheWith={updateCacheWith}/></Card.Link>
        </Card>
        <br/>
        <AllProjects users={users} projects={projects} username={username}/>
        </>
    )
}

export default MyView;