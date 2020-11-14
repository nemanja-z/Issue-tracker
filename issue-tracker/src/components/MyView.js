import React from "react";
import AllProjects from './project/AllProjects';
import ModalProject from './project/ModalProject';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';

const MyView = ({history, projects, username, users}) => {

    return(
        
        <>
        <Card>
        <Card.Header as="h2">Home</Card.Header>
        <Card.Link><ModalProject history={history} leader={users}/></Card.Link>
        </Card>
        <br/>
        <AllProjects users={users} projects={projects} username={username}/>
        </>
    )
}
MyView.propTypes = {
    history:PropTypes.object.isRequired, 
    projects:PropTypes.array, 
    username:PropTypes.string.isRequired, 
    users:PropTypes.array
} 
export default MyView;