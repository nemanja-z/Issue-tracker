import {gql} from '@apollo/client';

export const SIGN_UP = gql`
    mutation createUser($username:String!, $password:String!, $email:String!){
        createUser(username:$username, password:$password, email:$email){
            username
            email
        }
    }`;

export const LOGIN = gql`
    mutation loginUser($username:String!, $password:String!){
        loginUser(username:$username, password:$password)
    }`;
