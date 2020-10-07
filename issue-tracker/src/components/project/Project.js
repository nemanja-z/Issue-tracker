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
import './index.css';


const Project = ({projects}) => {
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
    return( 
      <>
        <Tab.Container id="list-group-tabs-example">
        {data && <ModalIssue id={id.slice(1)}/>}
        <Row>
          <Col sm={4}>
              <ListGroup>
                    {data.allIssues.map(issue=>
                      <ListGroup.Item key={issue.id} onClick={()=>setIssueId(issue.id)}>
                      <Card>
                        <Card.Body>
                          <Card.Title>{issue.Project.name}</Card.Title>
                          <Card.Text>{issue.summary}</Card.Text>
                        </Card.Body>
                      </Card>
                      </ListGroup.Item>)}
              </ListGroup>
          </Col>
          <Col sm={8}>
          <Tab.Content>
            {issueId && <Issue projects={projects} issueId={issueId}/>}
          </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
      </>                   
    )
}

export default Project;
