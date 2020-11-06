import {gql} from '@apollo/client';


export const PROJECTS = gql`
query {allProjectManagers{
	leaderId
    project_lead
    project
    url
    projectId
}}`;
export const ALL_PROJECTS = gql`
query {allProjects{
    id
    name
    url
    isActive
    member{
        username
        email
        id
    }
    manager{
        username
        email
        id
    }
}}`;
export const PROJECT = gql`
query project($projectId:String!){
    findProject(projectId:$projectId){
    name
    url
    isActive
    createdAt
    updatedAt
}}`;
export const CREATE = gql`
mutation createProject($name:String!, $url:String, $projectLead:String){
	createProject(name:$name, url:$url, projectLead:$projectLead){
        project{id
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
        allProjects{
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
}}}`;
export const USER_PROJECTS = gql`
query {userProjects{
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
}}`;
