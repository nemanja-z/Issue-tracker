import React, {useState, useContext} from 'react';
import {LOGIN, SIGN_UP} from "../../queries/user/queries";
import {useMutation} from "@apollo/client";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import Image from "react-bootstrap/Image";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { yupResolver } from '@hookform/resolvers';
import * as yup from "yup";
import {ErrorContext} from "../../App";
import {useHistory} from "react-router-dom";
import Alert from "react-bootstrap/Alert";


const schema = yup.object().shape({
    username: yup.string().when('loginStatus',{
        is:false,
        then:yup.string().min(5).required(),
        otherwise: yup.string().required()
    }),
    password: yup.string().when('loginStatus',{
        is:false,
        then:yup.string().min(8).max(16).matches( /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character").required(),
        otherwise: yup.string().required()
    }),
    passwordConfirmation: yup.string().when('loginStatus',{
        is:false,
        then:yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')}),
    email:yup.string().email().when('loginStatus',{
        is:false,
        then:yup.string().email().required()
    }),
    role:yup.mixed().oneOf(['Manager', 'Leader', 'Developer', 'Contractor', 'Support']).when('loginStatus',{
        is:false,
        then:yup.mixed().oneOf(['Manager', 'Leader', 'Developer', 'Contractor', 'Support']).required()
    })
  });

const Login = () =>{
    const {dispatch} = useContext(ErrorContext);
    const CLOUDINARY = "https://res.cloudinary.com/de2kz7yfl/image/upload/v1603532952/i3ekit0th28di6puvgyb.png";
    const history = useHistory();
    let [created, setCreated] = useState(false);
    const [loginStatus, setLoginStatus] = useState(true);
    const { register, handleSubmit, reset, errors } = useForm({
        resolver: yupResolver(schema)
      });
    const [profile, setProfile] = useState(null);
    
    const [signUp] = useMutation(SIGN_UP, {
        onError:(e)=>dispatch({type:'set', payload:e}),
        onCompleted:()=>{
                setCreated(true);
                setTimeout(()=>{
                    setCreated(false);
                   return setLoginStatus(!loginStatus);
            }, 5000)}});
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

    const handleSignUp=handleSubmit(({username, password, email, role})=>{
        signUp({variables:{username, password, email, profile, role}});
        reset();
    });
    
    return(
        <Container className="w-50 mt-5" fluid >
        {!created && <Form onSubmit={loginStatus ? handleLogin : handleSignUp}>
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
                    {!loginStatus && <Form.Text muted>
                        Your password must contain 8 characters, one uppercase, one lowercase, one number and one special case character.
                    </Form.Text>}
                    <Form.Text>{errors.password?.message}</Form.Text>
                </InputGroup>
            </Form.Group>
            {!loginStatus&&(
                <>
            <Form.Group>
                    <Form.Control placeholder="confirm password" name="passwordConfirmation" type="password" ref={register} id='passwordConfirmation'/>
                    <Form.Text>{errors.passwordConfirmation?.message}</Form.Text>
            </Form.Group>
            <Form.Group>
                <Form.Control placeholder="email" name="email" type='text' ref={register} id='email'/>
                <Form.Text>{errors.email?.message}</Form.Text>
            </Form.Group>
            <Form.Group>
            <Form.Label>Role</Form.Label>
            <Form.Control placeholder="role" name="role" type='text' ref={register} id='role' as="select" custom>
                <option value="Manager">Manager</option>
                <option value="Developer">Developer</option>
                <option value="Leader">Leader</option>
                <option value="Contractor">Contractor</option>
                <option value="Support">Support</option>
            </Form.Control>
            <Form.Text>{errors.role?.message}</Form.Text>
        </Form.Group>
            <Form.Group className="d-flex flex-column">
                <Form.Label className="mb-2">Change user picture </Form.Label>
                <Image src={CLOUDINARY} alt="" width="90px" height="90px" className="mb-2"/>
                <input type="file" name="profile"  onChange={({ target: { validity, files: [file] } })=>
                validity.valid && setProfile(file)}/>
              </Form.Group>
            </>)}
            <Form.Group>
            <Button type="submit">{loginStatus ? 'Login' : 'Sign Up'}</Button>
            </Form.Group>
            <Form.Group>
            <Button
            size="sm"
            variant="link"
            onClick={()=>{
                setLoginStatus(loginStatus ? false : true);
                reset();}}>{loginStatus  ? 'Need to create an account?' : 'Already have an account?'}
            </Button>
            <Button size="sm"
            variant="link"
            onClick={()=>history.push("/forgot")}>Forgot password?</Button>
            </Form.Group>
        </Form>}
        {created && (<Alert variant='info'>
            An email with the confirmation link has been sent to your personal email address. It may take up to a few minutes before you see it in your inbox. Follow the instructions within that email to confirm your password.
        </Alert>)}
        </Container>
    )
}
export default Login;