import React from "react";
import { useForm } from "react-hook-form";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {POST} from "../../queries/comment/queries";
import {useMutation} from "@apollo/client";
import PropTypes from 'prop-types';
import { yupResolver } from '@hookform/resolvers';
import * as yup from "yup";

const schema = yup.object().shape({
    comment: yup.string().min(5).required(),
  });


const CommentForm = ({issueId}) => {
    const { register, handleSubmit, reset, errors } = useForm({
        resolver: yupResolver(schema)
      });
    const [postComment] = useMutation(POST,{
        onComplete:()=>console.log('It\'s working'),
        onError:(e)=>console.log(e)});
    const handleComment=handleSubmit(({comment})=>{
        postComment({variables:{comment,issueId}});
        reset();
    }); 
    console.log(postComment)



    return( 
            <Form inline='true' onSubmit={handleComment}>
            <Form.Group>
                <Form.Label>Comment</Form.Label>
                <Form.Control name="comment" type='text' ref={register} id='comment'/>
                <Form.Text>{errors.comment?.message}</Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
                    Submit
            </Button>
            </Form>)
}
CommentForm.propTypes={
    issueId:PropTypes.string.isRequired
}
export default CommentForm;