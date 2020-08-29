import React from "react";
import { useForm } from "react-hook-form";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const ProjectForm = () => {

    const { register, handleSubmit, reset, errors } = useForm();


    return(<Form>
            <Form.Group>
                <Form.Label>Project name</Form.Label>
                <Form.Control name="name" type='text' ref={register} id='name'/>
                <Form.Text>{errors.name?.message}</Form.Text>
            </Form.Group>
            <Form.Group>
                <Form.Label>Url</Form.Label>
                <Form.Control name="url" type='url' ref={register} id='url'/>
                <Form.Text>{errors.url?.message}</Form.Text>
            </Form.Group>
        </Form>)
}

export default ProjectForm;