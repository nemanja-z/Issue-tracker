import React, {useState} from "react";
import {ASSIGNED} from "../../queries/issue/queries";
import Error from "../Error";
import ListGroup from "react-bootstrap/ListGroup";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import {useQuery} from "@apollo/client";
import Issue from "./Issue";

const AssignedToMe = ({projects}) => {
    const [issueId, setIssueId] = useState(null);
    const { loading, error, data } = useQuery(ASSIGNED);
    if (loading){ 
        return (
        <Spinner animation="border" role="status">
                  <span className="sr-only">Loading...</span>
        </Spinner>);
            }
    if (error) return <Error error={error.message}/>;
    console.log(data)
    /* if (data.allIssues.length===0) {
      return(
        <div>
          {data && <ModalIssue id={id.slice(1)}/>}
        </div>
      )
    } */
    return( 
    <Tab.Container id="list-group-tabs-example">
    <Row>
      <Col sm={2}>
          <ListGroup fixed="left">
                {data.assignedToMe.map(issue=>
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
        {issueId && <Issue projects={projects} issueId={issueId}/>}
      </Tab.Content>
    </Col>
      </Row>
      </Tab.Container>
    )
}

export default AssignedToMe;