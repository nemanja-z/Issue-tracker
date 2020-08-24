import {gql} from '@apollo/client';


export const PROJECTS = gql`
query{allProjects{
    name
    url
    id
    Users{
        username
    }
  }}`;