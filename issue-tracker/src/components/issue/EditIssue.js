import React, {useContext} from "react";
import { useForm } from "react-hook-form";
import {EDIT} from "../../queries/issue/queries";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useMutation} from "@apollo/client";
import {ErrorContext} from "../../App";
import PropTypes from 'prop-types';


const EditIssue = ({issue, show, setShow}) => {
    const {dispatch} = useContext(ErrorContext);
    const { register, handleSubmit, reset, errors } = useForm({
        defaultValues: {
            summary: issue.summary,
            issue_type: issue.issue_type,
            description: issue.description,
            priority: issue.priority,
            resolution: issue.resolution,
            status: issue.status
          }
      });
    const [modifyIssue] = useMutation(EDIT, {
        onCompleted:()=>setShow(!show),
        onError:(e)=>dispatch({type:'set', payload:e})
    });
    const editIssue=handleSubmit(({summary, description, priority, resolution, status, issue_type})=>{
        modifyIssue({variables:{issueId:issue.id, input:{summary, description, priority, resolution, status, issue_type}}});
        reset();
    });
    return(
        <Form onSubmit={editIssue}>
        <Form.Row>
        <Form.Group>
          <Form.Label>Summary</Form.Label>
          <Form.Control name="summary" type='text' ref={register} id='summary' as='textarea'/>
          <Form.Text>{errors.summary?.message}</Form.Text>
        </Form.Group>
        <Form.Group>
            <Form.Label>Type</Form.Label>
            <Form.Control placeholder="issue_type" name="issue_type" type='text' ref={register} id='issue_type' as="select" custom>
                <option value="Bug">Bug</option>
                <option value="Epic">Epic</option>
                <option value="Task">Task</option>
                <option value="Story">Story</option>
            </Form.Control>
            <Form.Text>{errors.type?.message}</Form.Text>
        </Form.Group>
        <Form.Group>
            <Form.Label>Priority</Form.Label>
            <Form.Control placeholder="priority" name="priority" type='text' ref={register} id='priority' as="select" custom>
                <option value="Lowest">Lowest</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Highest">Highest</option>
            </Form.Control>
            <Form.Text>{errors.priority?.message}</Form.Text>
        </Form.Group>
        </Form.Row>
        <Form.Row>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control size='lg' name="description" type='text' ref={register} id='description' as='textarea'/>
          <Form.Text>{errors.description?.message}</Form.Text>
        </Form.Group>
        
        <Form.Group>
            <Form.Label>Resolution</Form.Label>
            <Form.Control placeholder="resolution" name="resolution" type='text' ref={register} id='resolution' as="select" custom>
                <option value="Unresolved">Unresolved</option>
                <option value="Won't do">Won't do</option>
                <option value="Duplicate">Duplicate</option>
                <option value="Fixed">Fixed</option>
            </Form.Control>
            <Form.Text>{errors.resolution?.message}</Form.Text>
        </Form.Group>
        <Form.Group>
            <Form.Label>Status</Form.Label>
            <Form.Control placeholder="status" name="status" type='text' ref={register} id='status' as="select" custom>
                <option value="Open">Open</option>
                <option value="Reopened">Reopened</option>
                <option value="Resolved">Resolved</option>
                <option value="Closed">Closed</option>
                <option value="Active">Active</option>
            </Form.Control>
            <Form.Text>{errors.status?.message}</Form.Text>
        </Form.Group>
        </Form.Row>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    )
}
EditIssue.propTypes = {
    show:PropTypes.bool.isRequired,
    setShow:PropTypes.func.isRequired,
    issue:PropTypes.object.isRequired
}
export default EditIssue;