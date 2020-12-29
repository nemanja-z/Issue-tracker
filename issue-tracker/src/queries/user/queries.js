import { gql } from '@apollo/client';

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

export const FORGOT = gql`
    mutation forgotPassword($token:String!, $newPassword:String!){
        forgotPassword(token:$token, newPassword:$newPassword)
    }`;

export const EDIT_USER = gql`
mutation editUser($password:String, $email:String, $profile:Upload){
    editUser(password:$password, email:$email, profile:$profile){
        id
        username
        email
        role
        profile
    }
}`;
export const RESET = gql`
mutation sendForgotPasswordEmail($email:String!){
    sendForgotPasswordEmail(email:$email)
}`;
export const CONFIRM = gql`
mutation confirmUser($token:String!){
    confirmUser(token:$token)
}`