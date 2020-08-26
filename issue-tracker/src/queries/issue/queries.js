import {gql} from '@apollo/client';


export const ISSUES=gql`
query AllIssues($projectId:String!){
        allIssues(projectId:$projectId){
        id
        issue_type
        description
        priority
        resolution
        reporter
        status
        createdAt
        updatedAt}
}`;