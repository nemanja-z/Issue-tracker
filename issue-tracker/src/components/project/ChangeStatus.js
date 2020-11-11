import React, {useContext} from "react";
import { useForm } from "react-hook-form";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {STATUS} from "../../queries/project/queries";
import {ErrorContext} from "../../App";
import {useMutation} from "@apollo/client";



const ChangeStatus = ({show, setShow, projectId}) => {
    const {dispatch} = useContext(ErrorContext);
    const { register, handleSubmit, reset, errors } = useForm({});
    const [editStatus] = useMutation(STATUS,{
        onError:(e)=>dispatch({type:'set', payload:e}),
        onCompleted:()=>setShow(!show)});
    const handleStatus=handleSubmit(({status})=>{
        editStatus({variables:{projectId, isActive:status==='true'}});
        reset();
    }); 


    return (
        <Form onSubmit={handleStatus}>
            <Form.Group>
            <Form.Label>Project status</Form.Label>
            <Form.Control placeholder="status" name="status" type='text' ref={register} id='status' as="select" custom>
                <option value="true">Active</option>
                <option value="false">Inactive</option>
            </Form.Control>
            <Form.Text>{errors.status?.message}</Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
                    Submit
            </Button>
        </Form>
    )
}

export default ChangeStatus;