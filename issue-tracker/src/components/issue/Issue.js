import React from "react";
import PropTypes from 'prop-types';
import {ISSUE} from "../../queries/issue/queries";
import {useQuery} from "@apollo/client";
import Error from "../Error";
import Card from "react-bootstrap/Card";

const Issue = ({issueId}) => {
  const { loading, error, data } = useQuery(ISSUE, {
    variables: { issueId },
  });
  if (loading) return <span>loading...</span>;
  if (error) return <Error error={error.message}/>;
  return(<Card bg="light">
      <Card.Body>
        <Card.Title>Details</Card.Title>
            <Card.Text>
            Type: {data.targetIssue.issue_type}
            </Card.Text>
            <Card.Text>
            Priority: {data.targetIssue.priority}
            </Card.Text>
            <Card.Text>
            Description: {data.targetIssue.description}
            </Card.Text>
            <Card.Text>
            Resolution: {data.targetIssue.resolution}
            </Card.Text>
            <Card.Text>
            Status: {data.targetIssue.status}
            </Card.Text>
            <Card.Text>
            Reporter: {data.targetIssue.reporter}
            </Card.Text>
            <Card.Text>
            UpdatedAt: {data.targetIssue.updatedAt}
            </Card.Text>
            <Card.Text>
            CreatedAt: {data.targetIssue.createdAt}
            </Card.Text>
        </Card.Body>
    </Card>

          
    )
}
 Issue.propTypes = {
    issueId: PropTypes.string
  }; 
export default Issue;

