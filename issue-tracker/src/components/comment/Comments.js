import React from "react";
import PropTypes from "prop-types";
import {COMMENTS} from "../../queries/comment/queries";
import Spinner from 'react-bootstrap/Spinner';
import Error from "../Error";
import ListGroup from "react-bootstrap/ListGroup";
import {useQuery} from "@apollo/client";
import Card from "react-bootstrap/esm/Card";
const shortid = require('shortid');

const Comments = ({issueId}) => {
    const { loading, error, data } = useQuery(COMMENTS, {
        variables: { issueId },
      });
    if (loading) {
    return (<Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>);}
    if (error) return <Error error={error.message}/>;
    console.log(data, 'comm')
    return(
    <ListGroup>
        {data.issueComment?.map(c=>
        <Card key={shortid.generate()}>
            <Card.Body>
                <Card.Header>{c.commenter.username} commented:</Card.Header>
                <Card.Text>{c.comment}</Card.Text>
            </Card.Body>
        </Card>)}
    </ListGroup>)
}

Comments.propTypes={
    issueId: PropTypes.string
}

export default Comments;