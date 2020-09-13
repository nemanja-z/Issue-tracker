import React from "react";
import PropTypes from 'prop-types';
import {ISSUE} from "../../queries/issue/queries";
import {useQuery} from "@apollo/client";
import Error from "../Error";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Spinner from 'react-bootstrap/Spinner';
import './index.css';
import ModalAssign from "../user/ModalAssign";


const Issue = ({issueId, projects}) => {
  const { loading, error, data } = useQuery(ISSUE, {
    variables: { issueId },
  });
  if (loading) {
    return (<Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
          </Spinner>);}
  if (error) return <Error error={error.message}/>;
  return(
    <>
  <ModalAssign projects={projects}/>
  <Container>
  <Row>
    <Col>Type: {data.targetIssue.issue_type}</Col>
    <Col>Priority: {data.targetIssue.priority}</Col>
  </Row>
  <Row >
    <Col>Resolution: {data.targetIssue.resolution}</Col>
    <Col>Status: {data.targetIssue.status}</Col>
  </Row>
  <Row>
    <Col>Description: {data.targetIssue.description}</Col>
  </Row>
  <Row >
    <Col>Reporter: {data.targetIssue.reporter}</Col>
    <Col>Assigned to: </Col>
  </Row>
  <Row >
    <Col>Created: {new Date(data.targetIssue.createdAt).toUTCString()}</Col>
    <Col>Updated: {new Date(data.targetIssue.updatedAt).toUTCString()}</Col>
  </Row>
  </Container>
      </>    
    )
}
 Issue.propTypes = {
    issueId: PropTypes.string
  }; 
export default Issue;

