import React, {useContext} from "react";
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form";
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import {PROJECT_USERS} from "../../queries/user/queries";
import {useQuery} from "@apollo/client";
import Spinner from 'react-bootstrap/Spinner';
import shortid from 'shortid';
import { yupResolver } from '@hookform/resolvers';
import * as yup from "yup";
import Error from '../Error';
import {ISSUE_LIST, ASSIGN} from "../../queries/issue/queries";
import {useMutation} from "@apollo/client";
import {ErrorContext} from "../../App";


const schema = yup.object().shape({
    user: yup.string().required()
  });


const AssignUser = ({project, issue, show, setShow}) => {
    const {dispatch} = useContext(ErrorContext);
    const [assignUser] = useMutation(ASSIGN,{
        onError:(e)=>dispatch({type:'set', payload:e}),
        onCompleted:()=>setShow(!show)});
    const { loading:issue_loading, error:issue_error, data:issue_data } = useQuery(ISSUE_LIST,{
        onError:(e)=>dispatch({type:'set', payload:e})
    });
    const { register, handleSubmit, reset, errors } = useForm({
        resolver: yupResolver(schema)
      });
    const { loading, data } = useQuery(PROJECT_USERS,{
        variables:{name:project},
        onError:(e)=>dispatch({type:'set', payload:e})
    });
    if(loading||issue_loading) { 
        return (<Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                  </Spinner>);}

    const addAssignment=handleSubmit(({user})=>{
        assignUser({variables:{project, user, issue}});
        reset();
    });
    if(issue_data.issuesAll.length===0){
        return <Error error={'You cannot assign because you aren\'t member of any project!'}/>
    }
    return(
    <Form inline='true' onSubmit={addAssignment}>
        <Form.Group>
            <Form.Label>User</Form.Label>
            <Form.Control placeholder="user" name="user" type='text' ref={register} id='user' as="select" custom>
                {data.projectUsers.map(d=>
                <option key={shortid.generate()} value={d.username}>{d.username}</option>)}
            </Form.Control>
            <Form.Text>{errors.user?.message}</Form.Text>
        </Form.Group>
    <Button variant="primary" type="submit">
            Submit
    </Button>
    </Form>
    )
}
AssignUser.propTypes={
    projects:PropTypes.array
}
export default AssignUser;