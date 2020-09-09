import React from "react";
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form";
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import {ALL_USERS} from "../../queries/user/queries";
import {useQuery} from "@apollo/client";
import Spinner from 'react-bootstrap/Spinner';
import shortid from 'shortid';
import { yupResolver } from '@hookform/resolvers';
import * as yup from "yup";
import Error from '../Error';
import {ADD_ROLE} from "../../queries/user/queries";
import {useMutation} from "@apollo/client";

const schema = yup.object().shape({
    project: yup.string().required(),
    username: yup.string().required(),
    role:yup.string().required()
  });


const AddRole = ({project}) => {
    const [addRole] = useMutation(ADD_ROLE);
    const { register, handleSubmit, reset, errors } = useForm({
        resolver: yupResolver(schema)
      });
    const { loading, error, data } = useQuery(ALL_USERS, {
        onError: (error) =>  console.log(error.graphQLErrors[0].message)
    });
    if(loading)  {
        return (<Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                  </Spinner>);
                  }
    if(error) return <Error error={error.message}/>
    const assignRole=handleSubmit(({project, username, role})=>{
        addRole({project, username, role});
        reset();
    }); 


    return(<Form inline='true' onSubmit={assignRole}>
            <Form.Group>
            <Form.Label>Project</Form.Label>
            
            <Form.Control placeholder="project" name="project" type='text' ref={register} id='project' as="select" custom>
                <option value={project}>{project}</option>
            </Form.Control>
            <Form.Text>{errors.project?.message}</Form.Text>
        </Form.Group>
        <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control placeholder="username" name="username" type='text' ref={register} id='username' as="select" custom>
            {data.allUsers.map(d=>
                <option key={shortid.generate()} value={d.username}>{d.username}</option>)}
            </Form.Control>
            <Form.Text>{errors.username?.message}</Form.Text>
        </Form.Group>
        <Form.Group>
            <Form.Label>Role</Form.Label>
            <Form.Control placeholder="role" name="role" type='text' ref={register} id='role' as="select" custom>
                <option value="Manager">Manager</option>
                <option value="Developer">Developer</option>
                <option value="Contractor">Contractor</option>
                <option value="Support">Support</option>
            </Form.Control>
            <Form.Text>{errors.role?.message}</Form.Text>
        </Form.Group>
    <Button variant="primary" type="submit">
            Submit
    </Button>
    </Form>)
}
AddRole.propTypes={
    projects:PropTypes.array
}
export default AddRole;