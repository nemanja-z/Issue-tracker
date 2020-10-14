import React from "react";
import PropTypes from "prop-types";
import {COMMENTS} from "../../queries/comment/queries";
import Spinner from 'react-bootstrap/Spinner';
import Error from "../Error";
import ListGroup from "react-bootstrap/ListGroup";
import {useQuery} from "@apollo/client";
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
        <ListGroup.Item key={shortid.generate()}>{c.comment}</ListGroup.Item>)}
    </ListGroup>)
}

Comments.propTypes={
    issueId: PropTypes.string
}

export default Comments;