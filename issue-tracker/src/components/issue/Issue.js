import React, {useContext} from "react";
import PropTypes from 'prop-types';
import {ISSUE} from "../../queries/issue/queries";
import {useQuery} from "@apollo/client";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from 'react-bootstrap/Spinner';
import './index.css';
import ModalAssign from "../user/ModalAssign";
import ModalEdit from "../issue/ModalEdit";
import CommentForm from "../comment/CommentForm";
import Comments from "../comment/Comments";
import {ErrorContext} from "../../App";


const Issue = ({issueId}) => {
  const {dispatch} = useContext(ErrorContext);
  const { loading, error, data } = useQuery(ISSUE, {
    variables: { issueId },
    onError:(e)=>dispatch({type:'set', payload:e})
  });
  if (loading) {
    return (<Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
          </Spinner>);}
  return(
    <>
    <div className="container">
    <ModalAssign project={data.targetIssue.Project.name} issue={data.targetIssue.id}/>
    <ModalEdit issue={data.targetIssue} />
    <Row>
      <Col>Type: {data.targetIssue.issue_type}</Col>
      <Col>Priority: {data.targetIssue.priority}</Col>
    </Row>
    <Row >
      <Col>Resolution: {data.targetIssue.resolution}</Col>
      <Col>Status: {data.targetIssue.status}</Col>
    </Row>
    <Row>
      <Col>Summary: {data.targetIssue.summary}</Col>
      <Col>Description: {data.targetIssue.description}</Col>
    </Row>
    <Row >
      <Col>Reporter: {data.targetIssue.reporter.username}</Col>
      <Col>Assigned to: {data.targetIssue.Users?.map(user=>
      <p key={user.username}>{user.username}</p>)}</Col>
    </Row>
    <Row >
      <Col>Created: {new Date(data.targetIssue.createdAt).toUTCString()}</Col>
      <Col>Updated: {new Date(data.targetIssue.updatedAt).toUTCString()}</Col>
    </Row>
  </div>
    <>
      <CommentForm issueId={issueId}/>
      <Comments issueId={issueId}/>
    </>
    </> 
    )
}
 Issue.propTypes = {
    issueId: PropTypes.string
  }; 
export default Issue;

