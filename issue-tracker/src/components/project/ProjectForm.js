import React from "react";
import { useForm } from "react-hook-form";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {CREATE} from "../../queries/project/queries";
import {useMutation} from "@apollo/client";
import PropTypes from 'prop-types';
import { yupResolver } from '@hookform/resolvers';
import * as yup from "yup";

const schema = yup.object().shape({
    name: yup.string().min(5).required(),
    url: yup.string().url()
  });


const ProjectForm = ({history}) => {
    const { register, handleSubmit, reset, errors } = useForm({
        resolver: yupResolver(schema)
      });
      console.log(errors, 'ceras')
    const [createProject] = useMutation(CREATE,{
        onCompleted:()=>history.push("/")});
    const handleNewProject=handleSubmit(({name,url})=>{
        createProject({variables:{name,url}});
        reset();
    }); 



    return( <>
            <Form inline='true' onSubmit={handleNewProject}>
            <Form.Group>
                <Form.Label>Project name</Form.Label>
                <Form.Control name="name" type='text' ref={register} id='name'/>
                <Form.Text>{errors.name?.message}</Form.Text>
            </Form.Group>
            <Form.Group>
                <Form.Label>Url</Form.Label>
                <Form.Control name="url" type='text' ref={register} id='url'/>
                <Form.Text>{errors.url?.message}</Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
                    Submit
            </Button>
            </Form>
            </>)
}
ProjectForm.propTypes={
    history:PropTypes.object.isRequired
}
export default ProjectForm;