import React from "react";
import { useForm } from "react-hook-form";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {CREATE} from "../../queries/project/queries";
import {useMutation} from "@apollo/client";

const ProjectForm = () => {
    const { register, handleSubmit, reset, errors } = useForm();
    const [createProject] = useMutation(CREATE);
    const handleNewProject=handleSubmit(({name,url})=>{
        createProject({variables:{name,url}});
        reset();
    }); 



    return( 
            <Form inline='true' onSubmit={handleNewProject}>
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
            <Button variant="primary" type="submit">
                    Submit
            </Button>
            </Form>)
}

export default ProjectForm;