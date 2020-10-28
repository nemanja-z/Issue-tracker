import React, {useState, useContext} from 'react';
import {LOGIN, SIGN_UP} from "../../queries/user/queries";
import {useMutation} from "@apollo/client";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { yupResolver } from '@hookform/resolvers';
import * as yup from "yup";
import {useHistory} from "react-router-dom";
import {ErrorContext} from "../../App";


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
    passwordConfirmation: yup.string().when('loginStatus',{
        is:false,
        then:yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')}),
    email:yup.string().email().when('loginStatus',{
        is:false,
        then:yup.string().email().required()
    }),
  });

const Login = () =>{
    const {dispatch} = useContext(ErrorContext);
    let history = useHistory();
    const CLOUDINARY = "https://res.cloudinary.com/de2kz7yfl/image/upload/v1603532952/i3ekit0th28di6puvgyb.png";

    const [loginStatus, setLoginStatus] = useState(true);
    const [error, setError] = useState('');
    const { register, handleSubmit, reset, errors } = useForm({
        resolver: yupResolver(schema)
      });
    const [profile, setProfile] = useState(null);
    
    const [signUp] = useMutation(SIGN_UP, {
        onError:(e)=>dispatch({type:'set', payload:e}),
        onCompleted:()=>setLoginStatus(!loginStatus)});
    const [login] = useMutation(LOGIN, {
        onError:(e)=>dispatch({type:'set', payload:e}),
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

    const handleSignUp=handleSubmit(({username, password, email})=>{
        signUp({variables:{username, password, email, profile}});
        reset();
    });
    
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
                <>
            <Form.Group>
                <InputGroup>
                    <Form.Control placeholder="confirm password" name="passwordConfirmation" type={passwordShown ? "text" : "password"} ref={register} id='passwordConfirmation'/>
                    <InputGroup.Prepend>
                        <InputGroup.Text onClick={toggleVisibility}>{eye}</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Text>{errors.passwordConfirmation?.message}</Form.Text>
                </InputGroup>
            </Form.Group>
            <Form.Group>
                <Form.Control placeholder="email" name="email" type='text' ref={register} id='email'/>
                <Form.Text>{errors.email?.message}</Form.Text>
            </Form.Group>
            <div className="form-group files">
                <label>Change user picture </label>
                <img src={CLOUDINARY} alt="default-picture" width="90px" height="90px"/>
                <input type="file" name="profile"  onChange={({ target: { validity, files: [file] } })=>
                validity.valid && setProfile(file)}/>
              </div>
            </>)}
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
            
        </Form>
    )
}
export default Login;