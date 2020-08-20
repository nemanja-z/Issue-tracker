import React, {useState, useEffect} from "react";
import {LOGIN,SIGN_UP} from "../../queries/user/queries";
import {useMutation} from "@apollo/client";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";


const Login = () =>{
    const { register, handleSubmit, reset, errors } = useForm();
    const [signUp] = useMutation(SIGN_UP);
    const [login, {data}] = useMutation(LOGIN);
    const [token, setToken] = useState('');
    const [loginStatus, setLoginStatus] = useState(true);
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
    });
    useEffect(()=>{
        if(data){
            setToken(data.loginUser);
            localStorage.setItem('auth', token)
        }
    },[data, token])
    return(
        <Form style={{width: "40%",
        margin: "0 auto"}} 
        onSubmit={loginStatus?handleLogin:handleSignUp}>
        <Form.Group>
                <Form.Label>{loginStatus?'Login':'Register'}</Form.Label>
            </Form.Group>
            <Form.Group>
                <Form.Control placeholder="username" name="username" type='text' ref={register({ required: true, minLength:5, maxLength: 20 })} id='username'/>
                <Form.Text>{errors.username && <span>This field is required</span>}</Form.Text>
            </Form.Group>
            <Form.Group>
                <InputGroup>
                    <Form.Control placeholder="password" name="password" type={passwordShown ? "text" : "password"} ref={register({ required: true, minLength:5, maxLength: 20  })} id='password'/>
                    <InputGroup.Prepend>
                        <InputGroup.Text onClick={toggleVisibility}>{eye}</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Text>{errors.password && <span>This field is required</span>}</Form.Text>
                </InputGroup>
            </Form.Group>
            {!loginStatus&&(
            <Form.Group>
                <Form.Control placeholder="email" name="email" type='text' ref={register({ required: true, pattern:/\S+@\S+\.\S+/ })} id='email'/>
                <Form.Text>{errors.email && <span>This field is required</span>}</Form.Text>
            </Form.Group>)}
            <Form.Group>
            <Button type="submit">{loginStatus ? 'Login' : 'Sign Up'}</Button>
            </Form.Group>
            <Form.Group>
            <Button
            size="sm"
            variant="primary"
            onClick={()=>{
                setLoginStatus(!loginStatus);
                reset();}}>{loginStatus  ? 'need to create an account?' : 'already have an account?'}
            </Button>
            </Form.Group>
        </Form>
    )
}

export default Login;