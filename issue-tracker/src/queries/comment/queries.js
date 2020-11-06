import {gql} from '@apollo/client';


/* const ALL_COMMENTS = gql `
        query allComments{
                comment
                commenter{
                        id
                        username
                        email
                        profile
                } 
        }
` */
export const POST = gql`
mutation postComment($comment:String!, $issueId:String!){
	postComment(comment:$comment, issueId:$issueId){
                comment{
                        comment
                        commenter{
                                id
                                username
                                email
                                profile
                        }   
                }
                refetch{
                        issueComment(issueId:$issueId){
                                comment
                                commenter{
                                        id
                                        username
                                        email
                                        profile
                                }
                }
                }
        }
}`;
export const COMMENTS=gql`
query Comment($issueId:String){
        issueComment(issueId:$issueId){
                comment
                commenter{
                        id
                        username
                        email
                        profile
                }
}}`;