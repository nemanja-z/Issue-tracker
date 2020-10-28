import React, {useContext} from "react";
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form";
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import {ALL_USERS} from "../../queries/user/queries";
import {useQuery} from "@apollo/client";
import Spinner from 'react-bootstrap/Spinner';
import shortid from 'shortid';
import { yupResolver } from '@hookform/resolvers';
import * as yup from "yup";
import Error from '../Error';
import {ADD_ROLE} from "../../queries/user/queries";
import {useMutation} from "@apollo/client";
import {MessageContext} from "../../App";


const schema = yup.object().shape({
    username: yup.string().required(),
    role:yup.string().required()
  });


const AddRole = ({project, users, show, setShow}) => {
    const {dispatch} = useContext(MessageContext);
    const [addRole, {error}] = useMutation(ADD_ROLE,{
        onCompleted:()=>setShow(!show),
        onError:(e)=>dispatch({type:'set', payload:e})});
    const { register, handleSubmit, reset, errors } = useForm({
        resolver: yupResolver(schema)
      });
    const assignRole=handleSubmit(({username, role})=>{
        addRole({variables:{project, username, role}});
        console.log({project, username, role})
        reset();
    });/* 
    if(error){
        return <Error error={error.message}/>;
    } */
    return(<Form inline='true' onSubmit={assignRole}>
        <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control placeholder="username" name="username" type='text' ref={register} id='username' as="select" custom>
            {users.map(user=>
                <option key={shortid.generate()} value={user.username}>{user.username}</option>)}
            </Form.Control>
            <Form.Text>{errors.username?.message}</Form.Text>
        </Form.Group>
        <Form.Group>
            <Form.Label>Role</Form.Label>
            <Form.Control placeholder="role" name="role" type='text' ref={register} id='role' as="select" custom>
                <option value="Developer">Developer</option>
                <option value="Contractor">Contractor</option>
                <option value="Support">Support</option>
            </Form.Control>
            <Form.Text>{errors.role?.message}</Form.Text>
        </Form.Group>
    <Button variant="primary" type="submit">
            Submit
    </Button>
    </Form>)
}
AddRole.propTypes={
    project:PropTypes.string.isRequired
}
export default AddRole;