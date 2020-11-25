import React, {useContext, useState, useEffect} from 'react';
import {RESET} from "../../queries/user/queries";
import {useMutation} from "@apollo/client";
import Form from 'react-bootstrap/Form';
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";

import Button from 'react-bootstrap/Button';
import {ErrorContext} from "../../App";
import { useForm } from "react-hook-form";
import {useHistory} from "react-router-dom";


const ResetPasword = () => {
    const history = useHistory();
    let [resetDone, setResetDone] = useState(false);
    const {dispatch} = useContext(ErrorContext);
    const { register, handleSubmit, reset, errors } = useForm({});
    const [resetPasword] = useMutation(RESET, {
        onError:(e)=>{
            dispatch({type:'set', payload:e});
            setTimeout(()=>{
                return history.push("/login");
        }, 5000)},
        onCompleted:()=>{
            setResetDone(true);
            setTimeout(()=>{
                setResetDone(false);
                history.push("/login");
        }, 5000)}})
    const handleForget=handleSubmit(({email})=>{
        resetPasword({variables:{email}});
        reset();
        });
    return(<>
        {!resetDone&&(<Form style={{width: "40%",
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
        </Form>)}
        {resetDone && (<Alert variant='info'>
            An email with the password reset link has been sent to your personal email address. It may take up to a few minutes before you see it in your inbox. Follow the instructions within that email to reset your password.
        </Alert>)}
        </>
    )
}

export default ResetPasword;