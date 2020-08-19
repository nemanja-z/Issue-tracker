import React, {useState, useEffect} from "react";
import {LOGIN,SIGN_UP} from "../../queries/user/queries";
import {useMutation} from "@apollo/client";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


const Login = () =>{
    const [signUp, {signin}] = useMutation(SIGN_UP);
    const [login, {data}] = useMutation(LOGIN);
    const [token, setToken] = useState('');
    const [loginStatus, setLoginStatus] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');


    const handleUsername = e =>{
        e.preventDefault();
        setUsername(e.target.value);
    }
    const handlePassword = e =>{
        e.preventDefault();
        setPassword(e.target.value);
    }
    const handleEmail = e =>{
        e.preventDefault();
        setEmail(e.target.value);
    }
    const handleLogin = e => {
        e.preventDefault();
        login({variables:{username, password}});
        setUsername('');
        setPassword('');
        setEmail('');
    }
    const handleSignUp = e =>{
        e.preventDefault();
        signUp({variables:{username, password, email}});
        setLoginStatus(!loginStatus);
        setUsername('');
        setPassword('');
        setEmail('');
      }
    useEffect(()=>{
        if(data){
            setToken(data.loginUser);
            localStorage.setItem('auth', token)
        }
    },[data, token])
    
    return(
        <Form style={{width: "30%",
        margin: "0 auto"}} 
        onSubmit={loginStatus ?handleLogin : handleSignUp }>
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
            <Button type="submit">{loginStatus ? 'Login' : 'Sign Up'}</Button>
            </Form.Group>
            <Form.Group>
            <Button
            size="sm"
            variant="primary"
            onClick={()=>setLoginStatus(!loginStatus)}>{loginStatus  ? 'need to create an account?' : 'already have an account?'}
            </Button>
            </Form.Group>
        </Form>
    )
}

export default Login;