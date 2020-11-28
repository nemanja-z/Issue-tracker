import React, {useContext, useEffect, useRef} from "react";
import PropTypes from 'prop-types';
import {ISSUE} from "../../queries/issue/queries";
import {useLazyQuery} from "@apollo/client";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Spinner from 'react-bootstrap/Spinner';
import './index.css';
import ModalAssign from "../user/ModalAssign";
import ModalEdit from "../issue/ModalEdit";
import CommentForm from "../comment/CommentForm";
import Comments from "../comment/Comments";
import {ErrorContext} from "../../App";
import shortid from 'shortid';

const Issue = ({issueId}) => {
  const {dispatch} = useContext(ErrorContext);
  const [GET_ISSUE, { loading, data }] = useLazyQuery(ISSUE, {
    variables: { issueId },
    onError:(e)=>dispatch({type:'set', payload:e})
  });
  let isMounted = useRef(true);
    useEffect(()=>{
      if(isMounted.current === true){
        GET_ISSUE();
      }
      return () => isMounted.current = false;
    }, [GET_ISSUE])
  
  if (loading) {
    return (<Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
          </Spinner>);
    }
  return(
    <>
    {data && <>
    <div className="container">
    {data.targetIssue.Project.isActive && <ModalAssign project={data.targetIssue.Project.name} issue={data.targetIssue.id}/>}
    {data.targetIssue.Project.isActive && <ModalEdit issue={data.targetIssue} />}
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
      <Col>Assigned to: {data.targetIssue.assignees?.map(user=>
      <>
      <p key={shortid.generate()}><Image src={user.profile} width="30px" height="30px"/>{user.username}</p>
      </>)}
      </Col>
    </Row>
    <Row>
        <Col>
        {data.targetIssue.attachment?.map(pic=>
        <Image key={shortid.generate()} src={pic} height="100px" width="100px"/>)}
        </Col>
    </Row>
    <Row >
      <Col><p key={shortid.generate()}>Reporter:<Image src={data.targetIssue.reporter.profile} width="30px" height="30px"/> {data.targetIssue.reporter.username}</p></Col>
    </Row>
    <Row >
      <Col>Created: {new Date(data.targetIssue.createdAt).toUTCString()}</Col>
      <Col>Updated: {new Date(data.targetIssue.updatedAt).toUTCString()}</Col>
    </Row>
  </div>
  <hr/>
    <>
    {data.targetIssue.Project.isActive && <CommentForm issueId={issueId}/>}
      <hr/>
      <Comments issueId={issueId}/>
    </>
    </> }
    </>
  )
}
 Issue.propTypes = {
    issueId: PropTypes.string
  }; 
export default Issue;

