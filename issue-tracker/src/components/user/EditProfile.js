import React, {useState, useContext} from "react";
import { useForm } from "react-hook-form";
import {EDIT_USER} from "../../queries/user/queries";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
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
        <>
        <Card className="text-center">
            <Card.Header>Edit profile</Card.Header>
            <Card.Body>
                <Image className="text-center" src={user.profile} width="100px" heigth="100px"/>
            </Card.Body>
        </Card>
        <Form style={{width: "40%",
        margin: "0 auto"}} 
        onSubmit={handleUserEdit}>
        <Form.Group>
                <Form.Control type="text" placeholder={user.username} readOnly />
            </Form.Group>
            <Form.Group>
                <InputGroup>
                    <Form.Control placeholder="enter new password" name="password" type={passwordShown ? "text" : "password"} ref={register} id='password'/>
                    <InputGroup.Prepend>
                        <InputGroup.Text onClick={toggleVisibility}>{eye}</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Text>{errors.password?.message}</Form.Text>
                </InputGroup>
            </Form.Group>
            <Form.Group>
                <Form.Control placeholder="email" name="email" type='text' ref={register} id='email'/>
                <Form.Text>{errors.email?.message}</Form.Text>
            </Form.Group>
            <Form.File>
                <Form.File.Label>Change user picture </Form.File.Label>
                <FormFile.Input onChange={({ target: { validity, files: [file] } })=>
                validity.valid && setProfile(file)}  type="file" name="profile"/>
            </Form.File>
            <hr/>
            <Button type="submit" variant="primary">Save</Button>
        </Form>
        </>
        )
}
EditProfile.propTypes = {
    user:PropTypes.object.isRequired
}
export default EditProfile;