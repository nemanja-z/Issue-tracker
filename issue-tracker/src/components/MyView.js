import React, {useState} from "react";
import Container from "react-bootstrap/Container";
import AllProjects from './project/AllProjects';
import ModalProject from './project/ModalProject';
import Card from 'react-bootstrap/Card';

const MyView = ({history, projects, username, updateCacheWith}) => {

    return(
        
        <Container>
        <Card>
        <Card.Header as="h2">Home</Card.Header>
        <Card.Link><ModalProject history={history} updateCacheWith={updateCacheWith}/></Card.Link>
        </Card>
        <AllProjects projects={projects} username={username}/>
        </Container>
    )
}

export default MyView;