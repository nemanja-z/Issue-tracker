import React, {useState, useEffect} from "react";
import {LOGIN,SIGN_UP} from "../../queries/user/queries";
import {useMutation} from "@apollo/client";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { yupResolver } from '@hookform/resolvers';
import * as yup from "yup";
import Error from '../Error';
import {useHistory} from "react-router-dom";
  
const schema = yup.object().shape({
    username: yup.string().when('loginStatus',{
        is:false,
        then:yup.string().min(5).required()
    }),
    password: yup.string().when('loginStatus',{
        is:false,
        then:yup.string().min(8).max(16).matches( /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character").required()
    }),
    email:yup.string().email().when('loginStatus',{
        is:false,
        then:yup.string().email().required()
    }),
  });

const Login = () =>{
    let history = useHistory();
    const [loginStatus, setLoginStatus] = useState(true);
    const [error, setError] = useState('');
    const { register, handleSubmit, reset, errors } = useForm({
        resolver: yupResolver(schema)
      });
    const [signUp] = useMutation(SIGN_UP, {
        onError: (error) =>  setError(error.graphQLErrors[0].message) });
    const [login, {data}] = useMutation(LOGIN, {
        onError: (error) =>  setError(error.graphQLErrors[0].message),
        onCompleted:(data)=>{
            localStorage.setItem('auth', data.loginUser);
            history.push("/home");
    }});
    const [passwordShown, setPasswordShown] = useState(false);
    const eye = <FontAwesomeIcon icon={faEye} />;

    const toggleVisibility=()=>{
        setPasswordShown(passwordShown ? false : true);
    }
    const handleLogin=handleSubmit(({username,password})=>{
        login({variables:{username, password}});
        reset();
    }); 

    const handleSignUp=handleSubmit(({username,password,email})=>{
        signUp({variables:{username, password, email}});
        reset();
        setLoginStatus(!loginStatus);
    });

    useEffect(()=>{
        if(error){
            setTimeout(()=>{setError(null)}, 5000);
        }
    },[error])
    return(
        <Form style={{width: "40%",
        margin: "0 auto"}} 
        onSubmit={loginStatus ? handleLogin : handleSignUp}>
        <Form.Group>
                <Form.Label>{loginStatus?'Login':'Register'}</Form.Label>
            </Form.Group>
            <Form.Group>
                <Form.Control placeholder="username" name="username" type='text' ref={register} id='username'/>
                <Form.Text>{errors.username?.message}</Form.Text>
            </Form.Group>
            <Form.Group>
                <InputGroup>
                    <Form.Control placeholder="password" name="password" type={passwordShown ? "text" : "password"} ref={register} id='password'/>
                    <InputGroup.Prepend>
                        <InputGroup.Text onClick={toggleVisibility}>{eye}</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Text>{errors.password?.message}</Form.Text>
                </InputGroup>
            </Form.Group>
            {!loginStatus&&(
            <Form.Group>
                <Form.Control placeholder="email" name="email" type='text' ref={register} id='email'/>
                <Form.Text>{errors.email?.message}</Form.Text>
            </Form.Group>)}
            <Form.Group>
            <Button type="submit">{loginStatus ? 'Login' : 'Sign Up'}</Button>
            </Form.Group>
            <Form.Group>
            <Button
            size="sm"
            variant="primary"
            onClick={()=>{
                setLoginStatus(loginStatus ? false : true);
                reset();}}>{loginStatus  ? 'need to create an account?' : 'already have an account?'}
            </Button>
            </Form.Group>
            <Error error={error}/>
            
        </Form>
    )
}
export default Login;