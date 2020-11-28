import React, {useState, useContext} from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import ListGroup from 'react-bootstrap/ListGroup';
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import {ADD_ROLE} from "../queries/user/queries";
import {useMutation} from "@apollo/client";
import Button from 'react-bootstrap/Button';
import shortid from 'shortid';
import Spinner from 'react-bootstrap/Spinner';
import {ErrorContext} from "../App";
import "./lists.css";
import PropTypes from 'prop-types';
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ManageUsers = ({users, user_projects}) => {
    const {dispatch} = useContext(ErrorContext);
    const [username, setUsername] = useState('');
    const [project, setProject] = useState('');
    const [addRole, {loading}] = useMutation(ADD_ROLE, {
        onError:(e)=>dispatch({type:'set', payload:e})
    });
    const handleAssign = () => addRole({variables:{username, project}});
    
    
    if(loading)  {
        return (<Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                  </Spinner>);
    }

    return(
        <Container fluid style={{border:"none"}}>
        
        <Card>
            <Card.Header as="h2">Assign users to your project</Card.Header>
            <Card.Link>
                <Button type="submit" onClick={handleAssign}><FontAwesomeIcon icon={faUsers} /> Add Role</Button>
            </Card.Link>
        </Card>
        <Row>
        <Col>
        <Card>
            <Card.Header as="h4">Project names</Card.Header>
        </Card>
                    <ListGroup style={{overflowY: 'auto', maxHeight: 'calc(100vh - 150px)'}}>
                    {user_projects.map(project=>
                        <ListGroup.Item key={project.id} onClick={()=>setProject(project.name)}>{project.name}</ListGroup.Item>)}
                    </ListGroup>
                </Col>
        <Col>
        <Card>
                <Card.Header as="h4">Users</Card.Header>
            </Card>
            <ListGroup style={{overflowY: 'auto', maxHeight: 'calc(100vh - 150px)'}}>
                {users.map(user=>
                <ListGroup.Item onClick={()=>setUsername(user.username)} key={shortid.generate()}>{user.username}</ListGroup.Item>)}
            </ListGroup>
        </Col>
        </Row>
        </Container>
        
    )
}
ManageUsers.propTypes = {
    users: PropTypes.array,
    user_projects: PropTypes.array
}

export default ManageUsers;