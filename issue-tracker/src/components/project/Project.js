import React from "react";
import {ISSUES} from "../../queries/issue/queries";
import {useParams} from "react-router-dom";
import {useQuery} from "@apollo/client";
import Error from "../Error";
import {Link} from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Issue from "../issue/Issue";
import { useRouteMatch } from "react-router-dom";

const Project = () => {
    const {id} = useParams();
    const match=useRouteMatch("/projects/issue/:id");
    const { loading, error, data } = useQuery(ISSUES, {
        variables: { projectId:id.slice(1) },
      });
    
    if (loading) return <span>loading...</span>;
    if (error) return <Error error={error.message}/>;
    const issue = match ? data.allIssues.filter(d=>d.id===match.params.id.slice(1)) : null;
    console.log(issue);
    return( 
    <Tab.Container id="list-group-tabs-example">
    <Row>
      <Col sm={2}>
      <ListGroup fixed="left">
                {data.allIssues.map(issue=>
                  <Link key={issue.id} to={`/projects/issue/:${issue.id}`} className="list-group-item">{issue.description}</Link> )}       
          </ListGroup>
      </Col>
      <Col sm={8}>
      <Tab.Content>
          <Issue id={issue}/>
      </Tab.Content>
    </Col>
      </Row>
      </Tab.Container>
                          
    )
}
export default Project;