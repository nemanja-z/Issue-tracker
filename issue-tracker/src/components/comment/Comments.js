import { useQuery } from "@apollo/client";
import PropTypes from "prop-types";
import React, { useContext } from "react";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import ListGroup from "react-bootstrap/ListGroup";
import Spinner from 'react-bootstrap/Spinner';
import { ErrorContext } from "../../App";
import { COMMENTS } from "../../queries/comment/queries";
const shortid = require('shortid');

const Comments = ({issueId}) => {
    const {dispatch} = useContext(ErrorContext);
    const { loading, data } = useQuery(COMMENTS, {
        onError:(e)=>dispatch({type:'set', payload:e}),
        variables: { issueId },
      });
    if (loading) {
    return (<Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>);}

    return(
    <ListGroup>
        {data.issueComment?.map(c=>
        <Card key={shortid.generate()}>
            <Card.Body>
                <Card.Header><Image src={c.commenter.profile} alt="" width="45px" height="45px" className="mb-2"/> {c.commenter.username} commented:</Card.Header>
                <Card.Text className="pl-5">{c.comment}</Card.Text>
            </Card.Body>
        </Card>)}
    </ListGroup>)
}

Comments.propTypes={
    issueId: PropTypes.string
}

export default Comments;