import {gql} from '@apollo/client';

export const POST = gql`
mutation post($comment:String!, $issueId:String!){
	postComment(comment:$comment, issueId:$issueId)
}`;