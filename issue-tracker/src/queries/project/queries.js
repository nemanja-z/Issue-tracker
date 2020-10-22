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
    projectLead{
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
    createdAt
    updatedAt
}}`;
export const CREATE = gql`
mutation createProject($name:String!, $url:String, $projectLead:String){
	createProject(name:$name, url:$urlm, projectLead:$projectLead){
        project{id
        name
        url
        projectLead{
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
            projectLead{
                username
                email
                id
            }}
}}}`;
export const USER_PROJECTS = gql`
query {userProjects{
	id
    name
    url
    projectLead{
        username
        email
        id
    }
}}`;