import {gql} from '@apollo/client';

export const SIGN_UP = gql`
    mutation createUser($username:String!, $password:String!, $email:String!){
        createUser(username:$username, password:$password, email:$email)
    }`;
