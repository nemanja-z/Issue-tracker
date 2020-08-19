import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import {LOGIN,SIGN_UP} from "../../queries/user/queries";
import {useMutation} from "@apollo/client";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


const Login = ({username,password,email,handleUsername,handlePassword,handleEmail}) =>{
    const [signUp, {signin}] = useMutation(SIGN_UP);
    const handleSignUp = e =>{
        e.preventDefault();
        signUp({variables:{username, password, email}});
      }
    const [login, {data}] = useMutation(LOGIN);
    const [token, setToken] = useState('');
    const [loginStatus, setLoginStatus] = useState(true);
    useEffect(()=>{
        if(data){
            setToken(data.loginUser);
            localStorage.setItem('auth', token)
        }
    },[data])
    const handleLogin = e => {
        e.preventDefault();
        login({variables:{username, password}});
    }
    console.log(data, 'token');
    return(
        <div>
        <Form onSubmit={loginStatus?handleLogin:handleSignUp}>
        <Form.Group>
                <Form.Label>{loginStatus?'Login':'Register'}:</Form.Label>
            </Form.Group>
            <Form.Group>
                <Form.Label>Username:</Form.Label>
                <Form.Control type='text' id='username' value={username} onChange={handleUsername}></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Password:</Form.Label>
                <Form.Control type='text' id='password' value={password} onChange={handlePassword}></Form.Control>
            </Form.Group>
            {!loginStatus&&(
            <Form.Group>
                <Form.Label>Email:</Form.Label>
                <Form.Control type='text' id='email' value={email} onChange={handleEmail}></Form.Control>
            </Form.Group>)}
            <Form.Group>
            <Button as="input" type="submit" value="Login" />{' '}
            </Form.Group>
        </Form>
            <div>
               <button onClick={()=>setLoginStatus(!loginStatus)}>
                {loginStatus  ? 'need to create an account?' : 'already have an account'}
                </button>
            </div>
        </div>
    )
}

Login.propTypes={
    username:PropTypes.string.isRequired,
    password:PropTypes.string.isRequired,
    email:PropTypes.string,
    handleUsername:PropTypes.func.isRequired,
    handlePassword:PropTypes.func.isRequired,
    handleEmail:PropTypes.func
}

export default Login;