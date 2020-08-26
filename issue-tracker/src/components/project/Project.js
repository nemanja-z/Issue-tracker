import React from "react";
import {ISSUES} from "../../queries/issue/queries";
import {useParams, Route} from "react-router-dom";
import {useQuery} from "@apollo/client";
import Error from "../Error";
import {Link} from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import TabContainer from "react-bootstrap/TabContainer";
import Tab from "react-bootstrap/Tab";
import Issue from "../issue/Issue";
import { useRouteMatch } from "react-router-dom";

const Project = () => {
    const {id} = useParams();
    const match=useRouteMatch("/projects/issue/:id");
    const { loading, error, data } = useQuery(ISSUES, {
        variables: { projectId:id },
      });
    
    if (loading) return <span>loading...</span>;
    if (error) return <Error error={error.message}/>
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
          <Issue />
      </Tab.Content>
    </Col>
      </Row>
      </Tab.Container>
                          
    )
}
export default Project;

/*
<Col sm={8}>
      <Tab.Content>
        <Tab.Cone>
          <Issue />
        </Tab.Cone>
      </Tab.Content>
    </Col>
{data.allIssues.map(issue=>
                <Navbar key={issue.id} fixed="left">
                
                        <Link  to={`/issues/:${issue.id}`} className="nav-item">{issue.description}</Link>      
                </Navbar> )} 
                
                
                <ListGroup fixed="left">
                {data.allIssues.map(issue=>
                <Link  to={`/issues/:${issue.id}`} className="list-group-item">{issue.description}</Link>)} 
               </ListGroup>  
               <ListGroup fixed="left">
                {data.allIssues.map(issue=>
                <Link action="true" href={`#${issue.id}`} key={issue.id} to={`/issues/:${issue.id}`} className="list-group-item">Description:{issue.description}</Link>)}
          </ListGroup>
          <Link key={issue.id} to={`/projects/issue/:${issue.id}`} className="nav-item">{issue.description}</Link> )} 
          
          */