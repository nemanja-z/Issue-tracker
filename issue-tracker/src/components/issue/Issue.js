import React from "react";
import PropTypes from 'prop-types';
import {ISSUE} from "../../queries/issue/queries";
import {useQuery} from "@apollo/client";
import Error from "../Error";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import Spinner from 'react-bootstrap/Spinner';


const Issue = ({issueId}) => {
  const { loading, error, data } = useQuery(ISSUE, {
    variables: { issueId },
  });
  if (loading) 
  return (<Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
          </Spinner>);
  if (error) return <Error error={error.message}/>;
  return(
  <CardDeck>
    <Card text="info">
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
            Created: {new Date(data.targetIssue.createdAt).toUTCString()}
            </Card.Text>
            <Card.Text>
            Updated: {new Date(data.targetIssue.updatedAt).toUTCString()}
            </Card.Text>
            </Card.Body>
            </Card>
            <Card  text="info">
            <Card.Body>
            <Card.Title>
              People
            </Card.Title>
            <Card.Text>
            Reporter: {data.targetIssue.reporter}
            </Card.Text> 
            <Card.Text>
            Assignee: {}
            </Card.Text> 
        </Card.Body>
    </Card>
</CardDeck>
          
    )
}
 Issue.propTypes = {
    issueId: PropTypes.string
  }; 
export default Issue;

