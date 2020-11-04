import {gql} from '@apollo/client';

export const SIGN_UP = gql`
    mutation createUser($username:String!, $password:String!, $email:String!, $profile:Upload){
        createUser(username:$username, password:$password, email:$email, profile:$profile){
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
    query {
        me{ 
        username
        email
        profile
        id
    }}`;
export const ALL_USERS = gql`
    query users($me:Boolean){
        allUsers(me:$me){
        username
        email
        profile
        id
    }}`;
export const UNASSIGNED_USERS = gql`
   query{ allUnassignedUsers{
    username
    email
    profile
    id
    }}`;
export const PROJECT_USERS = gql`
    query users($name:String!){
        projectUsers(name:$name){
            username
            email
            profile
            id
        
    }}`;