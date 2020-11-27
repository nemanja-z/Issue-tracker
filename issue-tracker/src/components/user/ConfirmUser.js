import React, {useContext, useEffect} from 'react';
import {CONFIRM} from "../../queries/user/queries";
import {useMutation} from "@apollo/client";
import {ErrorContext} from "../../App";
import Alert from "react-bootstrap/Alert";
import {useParams, useHistory} from "react-router-dom";
const ConfirmUser = () => {
    const {token} = useParams();
    const history = useHistory();
    const {dispatch} = useContext(ErrorContext);
    const [confirmUser] = useMutation(CONFIRM, {
        variables:{token},
        onError:(e)=>dispatch({type:'set', payload:e}),
    onCompleted:()=>setTimeout(()=>{history.push("/login")},5000)});
    useEffect(()=>{confirmUser()}) 
        return(
            <Alert variant='info'>
                You've successfully verified your email!
            </Alert>
        )
}

export default ConfirmUser;