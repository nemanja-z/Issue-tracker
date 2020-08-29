import {gql} from '@apollo/client';


export const PROJECTS = gql`
query {allProjectManagers{
	leaderId
    project_lead
    project
    url
    projectId
}}`;
export const CREATE = gql`
mutation createProject($name:String!, $url:String){
	createProject(name:$name, url:$url)
}`;