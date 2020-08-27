import React, {useState} from "react";
import {ISSUES} from "../../queries/issue/queries";
import {useParams} from "react-router-dom";
import {useQuery} from "@apollo/client";
import Error from "../Error";
import ListGroup from "react-bootstrap/ListGroup";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Issue from "../issue/Issue";

const Project = () => {
    const {id} = useParams();
    const [issueId, setIssueId] = useState(null);
    const { loading, error, data } = useQuery(ISSUES, {
        variables: { projectId:id.slice(1) },
      });
    console.log(issueId)
    if (loading) return <span>loading...</span>;
    if (error) return <Error error={error.message}/>;
    return( 
    <Tab.Container id="list-group-tabs-example">
    <Row>
      <Col sm={2}>
      <ListGroup fixed="left">
                {data.allIssues.map(issue=>
                        <ListGroup.Item key={issue.id} onClick={()=>setIssueId(issue.id)}>{issue.description}</ListGroup.Item>)}
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

//<Issue issue={issue}/>
//<Link key={issue.id} to={`/projects/:id/issue/:${issue.id}`} className="list-group-item">{issue.description}</Link> )}
export default Project;