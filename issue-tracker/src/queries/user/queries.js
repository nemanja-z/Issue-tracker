import {gql} from '@apollo/client';

export const SIGN_UP = gql`
    mutation createUser($username:String!, $password:String!, $email:String!, $role:String!, $profile:Upload){
        createUser(username:$username, password:$password, email:$email, role:$role, profile:$profile){
            username
            email
            role
        }
    }`;

export const LOGIN = gql`
    mutation loginUser($username:String!, $password:String!){
        loginUser(username:$username, password:$password)
    }`;
export const ADD_ROLE = gql`
    mutation addMember($project:String!, $username:String!){
        addMember(project:$project, username:$username){
            project{
                id
            name
            url
            isActive
            manager{
                username
                email
                id
            }
            member{
                username
                email
                id
            }
            }
        refetch{
            allUnassignedUsers{
                username
                email
                profile
                id
                }
    }}
    }`;

export const AUTH = gql`
    query {
        me{ 
        username
        email
        role
        profile
        id
    }}`;
export const ALL_USERS = gql`
    query users($me:Boolean){
        allUsers(me:$me){
        username
        email
        role
        profile
        id
    }}`;
export const UNASSIGNED_USERS = gql`
   query{ allUnassignedUsers{
    username
    email
    profile
    role
    id
    }}`;
export const PROJECT_USERS = gql`
    query users($name:String!){
        projectUsers(name:$name){
            username
            email
            role
            profile
            id
        
    }}`;

export const FORGET = gql`
    mutation forgetPassword($email:String!, $newPassword:String!){
        forgetPassword(email:$email, newPassword:$newPassword)
    }`;