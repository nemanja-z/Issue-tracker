import React, {useState, useEffect} from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import ListGroup from 'react-bootstrap/ListGroup';
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import {ADD_ROLE} from "../queries/user/queries";
import {useMutation} from "@apollo/client";
import Button from 'react-bootstrap/Button';
import shortid from 'shortid';
import Error from './Error';
import Spinner from 'react-bootstrap/Spinner';


const ManageUsers = ({users, user_projects}) => {
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');
    const [project, setProject] = useState('');
    const [error, setError] = useState(null);
    const [addRole, {loading}] = useMutation(ADD_ROLE, {
        onError:(error)=>setError(error.graphQLErrors[0].message)
    });
    const handleAssign = () => addRole({variables:{username, project, role}});
    useEffect(()=>{
        if(error){
            setTimeout(()=>{setError(null)}, 5000);
        }
    },[error])
    
    if(loading)  {
        return (<Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                  </Spinner>);
                  }
    if(error) return <Error error={error}/>
    return(
        <>
        
        <Container>
        <Card>
            <Card.Header as="h2">Assign users to your project(s)</Card.Header>
        </Card>
        <Row>

        <Col>
        <Card>
            <Card.Header as="h4">Project names</Card.Header>
        </Card>
                    <ListGroup style={{overflowY: 'auto', maxHeight: 'calc(100vh - 150px)'}}>
                    {user_projects.map(project=>
                        <ListGroup.Item key={project.projectId} onClick={()=>setProject(project.project)}>{project.project}</ListGroup.Item>)}
                    </ListGroup>
                </Col>
        <Col>
            <Card>
                <Card.Header as="h4">Roles</Card.Header>
            </Card>
            <ListGroup horizontal>
                <ListGroup.Item onClick={()=>setRole("Manager")} key="Manager">Manager</ListGroup.Item>
                <ListGroup.Item onClick={()=>setRole("Developer")} key="Developer">Developer</ListGroup.Item>
                <ListGroup.Item onClick={()=>setRole("Contractor")} key="Contractor">Contractor</ListGroup.Item>
                <ListGroup.Item onClick={()=>setRole("Support")} key="Support">Support</ListGroup.Item>
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
        <Button type="submit" onClick={handleAssign}>Add Role</Button>
        </>
    )
}


export default ManageUsers;