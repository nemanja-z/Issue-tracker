import {gql} from '@apollo/client';


export const ISSUES=gql`
query Issue($projectId:String){
        allIssues(projectId:$projectId){
                id
                summary
                issue_type
                description
                priority
                resolution
                reporter
                status
                createdAt
                updatedAt
                Project{
                        name
                        url
                }}
}`;
export const ISSUE=gql`
query Issue($issueId:String){
        targetIssue(issueId:$issueId){
                id
                summary
                issue_type
                description
                priority
                resolution
                reporter
                status
                createdAt
                updatedAt
                Project{
                        name
                        url
                }}
}`;
export const REPORT=gql`
mutation createIssue($input:Fields){
        createIssue(input:$input)}`;

export const ASSIGN=gql`
mutation assignIssue($user:String!, $issue:String!, $project:String!){
        assignIssue(user:$user, issue:$issue, project:$project)}`;

export const ISSUE_LIST=gql`
query {issuesAll{
        id
        summary
        issue_type
        description
        priority
        resolution
        reporter
        status
        createdAt
        updatedAt
        Project{
                name
                url
        }
}}`;