import React, {useState, useContext} from "react";
import { useForm } from "react-hook-form";
import {EDIT_USER} from "../../queries/user/queries";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import {useMutation} from "@apollo/client";
import {ErrorContext} from "../../App";
import PropTypes from 'prop-types';
import InputGroup from 'react-bootstrap/InputGroup';
import FormFile from 'react-bootstrap/FormFile';
import Image from "react-bootstrap/Image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";


const EditProfile = ({user}) => {
    const {dispatch} = useContext(ErrorContext);
    const [profile, setProfile] = useState(null);
    const { register, handleSubmit, reset, errors } = useForm({
        defaultValues: {
            email: user.email,
            profile: user.profile
          }
      });
    const [editUser] = useMutation(EDIT_USER, {
        onError:(e)=>dispatch({type:'set', payload:e})});
    const [passwordShown, setPasswordShown] = useState(true);
    const eye = <FontAwesomeIcon icon={faEye} />;

    const toggleVisibility=()=>{
        setPasswordShown(passwordShown ? false : true);
    }
    const handleUserEdit=handleSubmit(({email, password})=>{
        editUser({variables:{email, profile,  password}});
        reset();
    }); 
    return(
        <Container className="d-flex flex-column justify-content-center align-items-center" fluid>
                <Card className="text-center w-50" >
                    <Card.Header>Edit profile</Card.Header>
                    <Card.Body>
                        <Image className="text-center" src={user.profile} width="100px" heigth="100px"/>
                    </Card.Body>
                </Card>
                <Form onSubmit={handleUserEdit} className="pt-3 w-50">
                    <Form.Group className="w-100">
                        <Form.Control type="text" placeholder={user.username} readOnly />
                    </Form.Group>
                    <InputGroup className="pb-3">
                        <Form.Control placeholder="enter new password" name="password" type={passwordShown ? "text" : "password"} ref={register} id='password'/>
                        <InputGroup.Prepend>
                            <InputGroup.Text onClick={toggleVisibility}>{eye}</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Text>{errors.password?.message}</Form.Text>
                    </InputGroup>
                    <Form.Group className="w-100">
                        <Form.Control placeholder="email" name="email" type='text' ref={register} id='email'/>
                        <Form.Text>{errors.email?.message}</Form.Text>
                    </Form.Group>
                    <Form.File className="pb-3">
                        <Form.File.Label>Change user picture </Form.File.Label>
                        <FormFile.Input onChange={({ target: { validity, files: [file] } })=>
                        validity.valid && setProfile(file)}  type="file" name="profile"/>
                    </Form.File>
                    
                    <Button type="submit" variant="primary">Save</Button>
                </Form>
        </Container>
        )
}
EditProfile.propTypes = {
    user:PropTypes.object.isRequired
}
export default EditProfile;