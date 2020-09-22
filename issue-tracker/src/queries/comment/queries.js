import {gql} from '@apollo/client';

export const POST = gql`
mutation postComment($comment:String!, $issueId:String!){
	postComment(comment:$comment, issueId:$issueId)
}`;
export const COMMENTS=gql`
query Comment($issueId:String){
        issueComment(issueId:$issueId){
                comment
}}`;