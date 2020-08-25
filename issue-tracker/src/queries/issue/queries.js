import {gql} from '@apollo/client';


export const ISSUES=gql`
query{
    allIssues(projectId:"c3ca8d1d-4f33-40f5-8d8d-b7fd05cbbfe3"){
        id
        issue_type
        description
        priority
        resolution
        reporter}
}`;