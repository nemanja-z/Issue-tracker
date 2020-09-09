import React, {useState} from "react";
import {ISSUES} from "../../queries/issue/queries";
import {useParams} from "react-router-dom";
import {useQuery} from "@apollo/client";
import ModalIssue from "../issue/ModalIssue";
import Error from "../Error";
import ListGroup from "react-bootstrap/ListGroup";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Issue from "../issue/Issue";
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


const Project = ({history}) => {
    const {id} = useParams();
    const [issueId, setIssueId] = useState(null);
    const { loading, error, data } = useQuery(ISSUES, {
        variables: { projectId:id.slice(1) },
      });
    if (loading){ 
        return (
        <Spinner animation="border" role="status">
                  <span className="sr-only">Loading...</span>
        </Spinner>);
            }
    if (error) return <Error error={error.message}/>;
    
    if (data.allIssues.length===0) {
      setTimeout(()=>{history.push("/projects")}, 5000);
      return <Error error={'This project doesn\'t have created issues'}/>;
    }
    console.log(data)
    return( 
    <Tab.Container id="list-group-tabs-example">
    {data && <ModalIssue project={data}/>}
    <Row>
      <Col sm={2}>
          <ListGroup fixed="left">
                {data.allIssues.map(issue=>
                  <ListGroup.Item key={issue.id} onClick={()=>setIssueId(issue.id)}>
                  <Card>
                  <Card.Title>{issue.Project.name}</Card.Title>
                  <Card.Text>
                  Summary: {issue.summary}
                  </Card.Text>
                  </Card></ListGroup.Item>)}
          </ListGroup>
      </Col>
      <Col sm={8}>
      <Tab.Content>
        {issueId && <Issue issueId={issueId}/>}
      </Tab.Content>
      
    </Col>
      </Row>
      </Tab.Container>
                          
    )
}

export default Project;

