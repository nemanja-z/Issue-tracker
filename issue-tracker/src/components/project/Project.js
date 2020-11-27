import React, {useEffect, useState, useContext, useRef} from "react";
import {ISSUES} from "../../queries/issue/queries";
import {useParams} from "react-router-dom";
import {useLazyQuery} from "@apollo/client";
import ModalIssue from "../issue/ModalIssue";
import ListGroup from "react-bootstrap/ListGroup";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Issue from "../issue/Issue";
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import './index.css';
import {ErrorContext} from "../../App";
import PropTypes from 'prop-types';


const Project = ({projectId, setProjectId, client}) => {
    const {id} = useParams();
    const {dispatch} = useContext(ErrorContext);
    const [issueId, setIssueId] = useState(null);
    const [ALL_ISSUES, { loading, data }] = useLazyQuery(ISSUES, {
      variables: { projectId },
      onError:(e)=>dispatch({type:'set', payload:e}),
      });
    let isMounted = useRef(true);
    useEffect(()=>{
      if(id){
        setProjectId(id.slice(1));
      }
      if(isMounted.current === true){
        ALL_ISSUES();
      }
      return () => isMounted.current = false;
    }, [ALL_ISSUES, id, setProjectId])
    
    if (loading){ 
        return (<Spinner animation="border" role="status">
                  <span className="sr-only">Loading...</span>
                </Spinner>);
            }
    
    return( 
        <>
        <Card>
        <Card.Header as="h2">All issues</Card.Header>
        {data && <Card.Link><ModalIssue projectId={projectId}/></Card.Link>}
        </Card>
        <Tab.Container id="list-group-tabs-example">
        <Row>
          <Col style={{"border":"solid", "height": "calc(80% - 20px)"}} sm={4} className="list-group-items">
              <ListGroup>
                    {data && data.allIssues.map(issue=>
                      <ListGroup.Item style={{border:"none"}} key={issue.id} onClick={()=>setIssueId(issue.id)}>
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
            {issueId && <Issue issueId={issueId}/>}
          </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
      </>                   
    )
}

Project.propTypes = {
  projectId:PropTypes.string, 
  setProjectId:PropTypes.func.isRequired, 
  client:PropTypes.object.isRequired
}

export default Project;
