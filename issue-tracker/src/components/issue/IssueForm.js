import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { useForm } from "react-hook-form";


const IssueForm = () => {
    const { register, handleSubmit, reset, errors } = useForm();
    return(
        <Form>
        <Form.Row>
        <Form.Group as={Col}>
            <Form.Label>Issue type</Form.Label>
            <Form.Control placeholder="type" name="type" type='text' ref={register} id='type' as="select" custom>
                <option value="Bug">Bug</option>
                <option value="Epic">Epic</option>
                <option value="Task">Task</option>
                <option value="Story">Story</option>
            </Form.Control>
            <Form.Text>{errors.type?.message}</Form.Text>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Summary</Form.Label>
          <Form.Control name="summary" type='text' ref={register} id='summary'/>
          <Form.Text>{errors.summary?.message}</Form.Text>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Description</Form.Label>
          <Form.Control name="description" type='text' ref={register} id='description'/>
          <Form.Text>{errors.description?.message}</Form.Text>
        </Form.Group>
        </Form.Row>
        <Form.Row>
        <Form.Group as={Col}>
            <Form.Label>Priority</Form.Label>
            <Form.Control placeholder="priority" name="priority" type='text' ref={register} id='type' as="select" custom>
                <option value="Lowest">Lowest</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Highest">Highest</option>
            </Form.Control>
            <Form.Text>{errors.priority?.message}</Form.Text>
        </Form.Group>
        <Form.Group as={Col}>
            <Form.Label>Resolution</Form.Label>
            <Form.Control placeholder="resolution" name="resolution" type='text' ref={register} id='type' as="select" custom>
                <option value="Unresolved">Unresolved</option>
                <option value="Won't do">Won't do</option>
                <option value="Duplicate">Duplicate</option>
                <option value="Fixed">Fixed</option>
            </Form.Control>
            <Form.Text>{errors.resolution?.message}</Form.Text>
        </Form.Group>
        <Form.Group as={Col}>
            <Form.Label>Status</Form.Label>
            <Form.Control placeholder="status" name="status" type='text' ref={register} id='type' as="select" custom>
                <option value="Open">Open</option>
                <option value="Reopened">Reopened</option>
                <option value="Resolved">Resolved</option>
                <option value="Closed">Closed</option>
                <option value="Active">Active</option>
            </Form.Control>
            <Form.Text>{errors.resolution?.message}</Form.Text>
        </Form.Group>
        </Form.Row>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>)
}


export default IssueForm;