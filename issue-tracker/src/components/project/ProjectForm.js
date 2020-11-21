import React, {useContext} from "react";
import { useForm } from "react-hook-form";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {CREATE} from "../../queries/project/queries";
import {useMutation} from "@apollo/client";
import PropTypes from 'prop-types';
import { yupResolver } from '@hookform/resolvers';
import * as yup from "yup";
import shortid from 'shortid';
import Error from "../Error";
import {ErrorContext} from "../../App";


const schema = yup.object().shape({
    name: yup.string().min(5).required(),
    url: yup.string().url()
  });


const ProjectForm = ({history, show, setShow, leader}) => {
    const {dispatch} = useContext(ErrorContext);
    const { register, handleSubmit, reset, errors } = useForm({
        resolver: yupResolver(schema)
      });
    const [createProject] = useMutation(CREATE,{
        onError:(e)=>dispatch({type:'set', payload:e}),
        onCompleted:()=>{
            history.push("/home")
            setShow(!show)}});
    const handleNewProject=handleSubmit(({name, url, projectLead})=>{
        createProject({variables:{name, url, projectLead}});
        reset();
    });
    if(leader.length===0){
        return <Error error={"No available users for this project!"}/>;
    }
    return( 
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
            <Form.Group>
            <Form.Label>Project leader</Form.Label>
            <Form.Control placeholder="projectLead" name="projectLead" type='text' ref={register} id='projectLead' as="select" custom>
            {leader && leader.map(user=>
                <option key={shortid.generate()} value={user.username}>{user.username}</option>)}
            </Form.Control>
            <Form.Text>{errors.projectLead?.message}</Form.Text>
        </Form.Group>
            <Button variant="primary" type="submit">
                    Submit
            </Button>
            </Form>)
}
ProjectForm.propTypes={
    history:PropTypes.object.isRequired
}
export default ProjectForm;