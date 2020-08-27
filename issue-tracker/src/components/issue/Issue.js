import React from "react";
import PropTypes from 'prop-types';
import Jumbotron from "react-bootstrap/Jumbotron";
import {ISSUE} from "../../queries/issue/queries";
import {useQuery} from "@apollo/client";
import Error from "../Error";

const Issue = ({issueId}) => {
  const { loading, error, data } = useQuery(ISSUE, {
    variables: { issueId },
  });
  if (loading) return <span>loading...</span>;
  if (error) return <Error error={error.message}/>;
  return(
          <Jumbotron>
            <p>Type: {data.targetIssue.issue_type}</p>
            <p>Priority: {data.targetIssue.priority}</p>
            <p>Description: {data.targetIssue.description}</p>
            <p>Resolution: {data.targetIssue.resolution}</p>
            <p>Status: {data.targetIssue.status}</p>
            <p>Reporter: {data.targetIssue.reporter}</p>
            <p>UpdatedAt: {data.targetIssue.updatedAt}</p>
            <p>CreatedAt: {data.targetIssue.createdAt}</p>     
           </Jumbotron>
    )
}
 Issue.propTypes = {
    issueId: PropTypes.string
  }; 
export default Issue;