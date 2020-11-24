import React, {useContext} from 'react';
import {RESET} from "../../queries/user/queries";
import {useMutation} from "@apollo/client";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {ErrorContext} from "../../App";
import { useForm } from "react-hook-form";
import {useHistory} from "react-router-dom";


const ResetPasword = () => {
    const history = useHistory();
    const {dispatch} = useContext(ErrorContext);
    const { register, handleSubmit, reset, errors } = useForm({});
    const [ResetPasword] = useMutation(RESET, {
        onError:(e)=>dispatch({type:'set', payload:e}),
    onCompleted:()=>history.push("/login")});
    const handleForget=handleSubmit(({email})=>{
        ResetPasword({variables:{email}});
        reset();
        }); 



    return(
        <Form style={{width: "40%",
        margin: "0 auto"}} onSubmit={handleForget}>
        <Form.Group>
                <Form.Label>Forgot Password</Form.Label>
            </Form.Group>
            <Form.Group>
                <Form.Control placeholder="email" name="email" type='text' ref={register} id='email'/>
                <Form.Text>{errors.email?.message}</Form.Text>
            </Form.Group>
            <Button type="submit">
                Reset password
            </Button>
        </Form>
    )
}

export default ResetPasword;