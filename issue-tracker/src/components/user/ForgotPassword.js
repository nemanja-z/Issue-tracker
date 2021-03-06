import React, {useContext} from 'react';
import {FORGOT} from "../../queries/user/queries";
import {useMutation} from "@apollo/client";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/Container";
import {ErrorContext} from "../../App";
import { useForm } from "react-hook-form";
import {useHistory, useParams} from "react-router-dom";


const ForgotPassword = () => {
    const {token} = useParams();
    const history = useHistory();
    const {dispatch} = useContext(ErrorContext);
    const { register, handleSubmit, reset, errors } = useForm({});
    const [forgotPassword] = useMutation(FORGOT, {
        onError:(e)=>dispatch({type:'set', payload:e}),
    onCompleted:()=>history.push("/login")});
    const handleForgot=handleSubmit(({newPassword})=>{
        forgotPassword({variables:{token, newPassword}});
        reset();
        }); 



    return(
        <Container>
        <Form onSubmit={handleForgot}>
        <Form.Group>
                <Form.Label>Reset password</Form.Label>
            </Form.Group>
            <Form.Group>
                    <Form.Control placeholder="new password" name="newPassword" type="password" ref={register} id='newPassword'/>
                    <Form.Text>{errors.newPassword?.message}</Form.Text>
            </Form.Group>
            <Button type="submit">
                Update Password
            </Button>
        </Form>
        </Container>
    )
}

export default ForgotPassword;