import React, {useState, useContext, useEffect, useRef} from "react";
import {ASSIGNED} from "../../queries/issue/queries";
import ListGroup from "react-bootstrap/ListGroup";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import { useLazyQuery } from '@apollo/client';
import Issue from "./Issue";
import {ErrorContext} from "../../App";


const AssignedToMe = () => {
    const [issueId, setIssueId] = useState(null);
    const {dispatch} = useContext(ErrorContext);
    const [ASSIGN, { loading, data }] = useLazyQuery(ASSIGNED, {
      onError:(e)=>dispatch({type:'set', payload:e})});
    
    let isMounted = useRef(true);
    useEffect(()=>{
      if(isMounted.current === true){
        ASSIGN();
      }
      return () => isMounted.current = false;
    }, [ASSIGN])
    
    if (loading){ 
        return (
        <Spinner animation="border" role="status">
                  <span className="sr-only">Loading...</span>
        </Spinner>);
            }
    if (data?.assignedToMe?.length===0) {
      return(
        <>
        <Alert variant='info' className="text-center">
            There are no issues assigned to you!
        </Alert>
        </>

      )
    } 
    return(
    <>
    <Card>
        <Card.Header as="h2">Issues assigned to you</Card.Header>
    </Card>
    <Tab.Container id="list-group-tabs-example">
    <Row>
      <Col style={{"border":"solid", "height": "calc(80% - 20px)"}} className="list-group-items">
          <ListGroup fixed="left">
                {data?.assignedToMe?.map(issue=>
                  <ListGroup.Item style={{border:"none"}} key={issue.id} onClick={()=>setIssueId(issue.id)}>
                  <Card>
                  <Card.Title>{issue.Project.name}</Card.Title>
                  <Card.Text>
                  Summary: {issue.summary}
                  </Card.Text>
                  </Card></ListGroup.Item>)}
          </ListGroup>
      </Col>
      <Col>
      <Tab.Content>
        {issueId && <Issue  issueId={issueId}/>}
      </Tab.Content>
      </Col>
    </Row>
    </Tab.Container>
    </>
    )
}

export default AssignedToMe;