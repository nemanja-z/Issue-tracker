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
export const ADD_ROLE = gql`
    mutation addRole($project:String!, $username:String!, $role:String!){
        addRole(project:$project, username:$username, role:$role)
    }`;

export const AUTH = gql`
    query {me{ 
        username
        email
        id
    }}`;
export const ALL_USERS = gql`
    query users($me:Boolean){
        allUsers(me:$me){
        username
        email
        id
    }}`;