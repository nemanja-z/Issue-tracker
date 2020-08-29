import React, {useState} from "react";
import {ISSUES} from "../../queries/issue/queries";
import {useParams} from "react-router-dom";
import {useQuery} from "@apollo/client";
import Error from "../Error";
import IssueForm from '../issue/IssueForm'
import ListGroup from "react-bootstrap/ListGroup";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Issue from "../issue/Issue";

const Project = () => {
    const [toggleForm, setToggleForm] = useState(false);
    const {id} = useParams();
    const [issueId, setIssueId] = useState(null);
    const { loading, error, data } = useQuery(ISSUES, {
        variables: { projectId:id.slice(1) },
      });
    if (loading) return <span>loading...</span>;
    if (error) return <Error error={error.message}/>;
    console.log(data)
    
    return( 
    <Tab.Container id="list-group-tabs-example">
    <Button onClick={()=>setToggleForm(!toggleForm)}>{toggleForm ? 'See issues' : 'Add issue'}</Button>
    <Row>
      <Col sm={2}>
          <ListGroup fixed="left">
                {data.allIssues.map(issue=>
                  <ListGroup.Item key={issue.id} onClick={()=>setIssueId(issue.id)}>{issue.summary}</ListGroup.Item>)}
          </ListGroup>
      </Col>
      <Col sm={8}>
      {!toggleForm&&(<Tab.Content>
        {issueId && <Issue issueId={issueId}/>}
      </Tab.Content>)}
      {toggleForm&&(<Tab.Content>
        {<IssueForm toggle={toggleForm}/>}
      </Tab.Content>)}
    </Col>
      </Row>
      </Tab.Container>
                          
    )
}

export default Project;

