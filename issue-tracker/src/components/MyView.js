import React from "react";
import AllProjects from './project/AllProjects';
import ModalProject from './project/ModalProject';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';

const MyView = ({history, projects, username, users}) => {
    const leader = users.filter(user=>user.role === "Leader");
    return(
        
        <>
        <Card xs={2}>
        <Card.Header as="h2">Home</Card.Header>
        </Card>
        <div className="my-2">
        <ModalProject history={history} leader={leader}/>
        </div>
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