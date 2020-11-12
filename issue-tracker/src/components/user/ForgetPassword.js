import React, {useContext} from 'react';
import {FORGET} from "../../queries/user/queries";
import {useMutation} from "@apollo/client";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {ErrorContext} from "../../App";
import { useForm } from "react-hook-form";
import {useHistory} from "react-router-dom";


const ForgetPassword = () => {
    const history = useHistory();
    const {dispatch} = useContext(ErrorContext);
    const { register, handleSubmit, reset, errors } = useForm({});
    const [forgetPassword] = useMutation(FORGET, {
        onError:(e)=>dispatch({type:'set', payload:e}),
    onCompleted:()=>history.push("/login")});
    const handleForget=handleSubmit(({email, newPassword})=>{
        forgetPassword({variables:{email, newPassword}});
        reset();
        }); 



    return(
        <Form style={{width: "40%",
        margin: "0 auto"}} onSubmit={handleForget}>
            <Form.Group>
                <Form.Control placeholder="email" name="email" type='text' ref={register} id='email'/>
                <Form.Text>{errors.email?.message}</Form.Text>
            </Form.Group>
            <Form.Group>
                    <Form.Control placeholder="new password" name="newPassword" type="password" ref={register} id='newPassword'/>
                    <Form.Text>{errors.newPassword?.message}</Form.Text>
            </Form.Group>
            <Button type="submit">
                Reset password
            </Button>
            <Button onClick={()=>history.push("/login")}>
                Go back to the login page
            </Button>
        </Form>
    )
}

export default ForgetPassword;