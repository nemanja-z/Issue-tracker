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
                updatedAt}
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
                updatedAt}
}`;