import React, {useContext} from "react";
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form";
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { yupResolver } from '@hookform/resolvers';
import * as yup from "yup";
import {ADD_ROLE} from "../../queries/user/queries";
import {useMutation} from "@apollo/client";
import {ErrorContext} from "../../App";


const schema = yup.object().shape({
    username: yup.string().required()
  });


const AddRole = ({project, users, show, setShow}) => {
    const {dispatch} = useContext(ErrorContext);
    const [addRole] = useMutation(ADD_ROLE,{
        onCompleted:()=>setShow(!show),
        onError:(e)=>dispatch({type:'set', payload:e})});
    const { register, handleSubmit, reset, errors } = useForm({
        resolver: yupResolver(schema)
      });
    const assignRole=handleSubmit(({username})=>{
        addRole({variables:{project, username}});
        reset();
    });
    
    return(
    <Form inline='true' onSubmit={assignRole}>
        <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control placeholder="username" name="username" type='text' ref={register} id='username' as="select" custom>
            {users.map(user=><option key={shortid.generate()} value={user.username}>{user.username}</option>)}
            </Form.Control>
            <Form.Text>{errors.username?.message}</Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
                Submit
        </Button>
    </Form>)
}
AddRole.propTypes={
    show:PropTypes.bool.isRequired,
    setShow:PropTypes.func.isRequired,
    users:PropTypes.array,
    project:PropTypes.string.isRequired
}
export default AddRole;