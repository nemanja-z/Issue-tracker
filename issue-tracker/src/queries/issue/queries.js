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
                reporter{
                        username
                        email
                        profile
                        id
                }
                status
                createdAt
                updatedAt
                Project{
                        name
                        url
                }
        }
}`;
export const ASSIGNED=gql`
query {assignedToMe{
                id
                summary
                issue_type
                description
                priority
                resolution
                reporter{
                        username
                        email
                        profile
                        id
                }
                status
                createdAt
                updatedAt
                Project{
                        name
                        url
                }
}}`;
export const ISSUE=gql`
query Issue($issueId:String){
        targetIssue(issueId:$issueId){
                id
                summary
                issue_type
                description
                priority
                resolution
                reporter{
                        username
                        email
                        profile
                        id
                }
                status
                createdAt
                updatedAt
                Project{
                        name
                        url
                        id
                }
                Users{
                        username
                        email
                }}
}`;
export const REPORT=gql`
mutation createIssue($input:Fields){
        createIssue(input:$input){
        issue{
                id
                summary
                issue_type
                description
                priority
                resolution
                reporter{
                        username
                        email
                        profile
                        id
                }
                status
                createdAt
                updatedAt
                Project{
                        name
                        url
                }
                Users{
                        username
                        email
                }      
                }
                refetch{
                issuesAll{
                        id
                        summary
                        issue_type
                        description
                        priority
                        resolution
                        reporter{
                                username
                                email
                                profile
                                id
                        }
                        status
                        createdAt
                        updatedAt
                        Project{
                                name
                                url
                        }    
                }
}}}`;

export const ASSIGN=gql`
mutation assigne($user:String!, $issue:String!, $project:String!){
        assignUser(user:$user, issue:$issue, project:$project)
}`;

export const ISSUE_LIST=gql`
query {issuesAll{
        id
        summary
        issue_type
        description
        priority
        resolution
        reporter{
                username
                email
                profile
                id
        }
        status
        createdAt
        updatedAt
        Project{
                name
                url
        }
}}`;
export const EDIT=gql`
mutation editIssue($issueId:String, $input:Edit){
        editIssue(issueId:$issueId, input:$input)
}`;