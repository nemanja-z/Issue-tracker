const { ApolloServer, gql } = require('apollo-server');
import { createTestClient } from 'apollo-server-testing';
import dotenv from 'dotenv';
import path from 'path';
import { db as models } from '../models';
const { mergeTypeDefs } = require('@graphql-tools/merge');
const { mergeResolvers } = require('@graphql-tools/merge');
const { loadFilesSync } = require('@graphql-tools/load-files');
const bcrypt = require('bcrypt');

dotenv.config();

export const typeDefs = mergeTypeDefs(loadFilesSync(path.join(__dirname, '../schema')));
export const resolvers = mergeResolvers(loadFilesSync(path.join(__dirname, '../resolvers')));


  let user;
  let leader;
  let developer;
  let contractor;
  let testProject;

  
  /* const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => {
      return {models,
      user}}
  });
  const {query, mutate} = createTestClient(server); */
  

beforeAll(async()=>{
  await Promise.all(
    Object.keys(models).map(key => {
      if (['sequelize', 'Sequelize'].includes(key)) return null;      
      return models[key].destroy({ where: {}, force: true });
    })
  );
  user = await models.User.create({
    username: "Ljubivoje",
    email: "lginmwyffgkkpvgplk@niwghx.com",
    role: "Manager",
    profile:process.env.CLOUDINARY,
    passwordHash: await bcrypt.hash('Popajce', 10),
    isVerified:true
  });
  leader =await models.User.create({
    username: "Krstivoje",
    email: "lginmwyffgkkdsadapvgplk@niwghx.com",
    role: "Leader",
    profile:process.env.CLOUDINARY,
    passwordHash: await bcrypt.hash('Popara', 10),
    isVerified:true
  });
  developer =await models.User.create({
    username: "Program",
    email: "lginmwyffdsagkkdsadapvgplk@niwghx.com",
    role: "Developer",
    profile:process.env.CLOUDINARY,
    passwordHash: await bcrypt.hash('Prazno', 10),
    isVerified:true
  });
  contractor = await models.User.create({
    username: "Business",
    email: "lginmwyffdgkkdsadapvgplk@niwghx.com",
    role: "Contractor",
    profile:process.env.CLOUDINARY,
    passwordHash: await bcrypt.hash('Ficfiric', 10),
    isVerified:true
  });
});
  describe('User', () => {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: () => {
        return {models,
        user}}
    });
    const {query, mutate} = createTestClient(server);
      test('Login', async () => {
        const LOGIN = gql`
              mutation loginUser($username:String!, $password:String!){
              loginUser(username:$username, password:$password)
              }`;
        const loginUser = await mutate({
          mutation: LOGIN,
          variables: {
              username: 'Ljubivoje',
              password:'Popajce'
            
          }
        });
        expect(loginUser.data.loginUser).toBeDefined();
      });
    });
describe('Project', ()=>{
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => {
      return {models,
      user}}
  });
  const {query, mutate} = createTestClient(server);
  test('Create Project', async () => {
    const CREATE = gql`
        mutation createProject($name:String!, $url:String, $projectLead:String){
          createProject(name:$name, url:$url, projectLead:$projectLead){
                project{id
                name
                url
                isActive
                manager{
                    username
                    email
                    id
                }
                member{
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
                    isActive
                    manager{
                        username
                        email
                        id
                    }
                    member{
                        username
                        email
                        id
                    }
                    }
        }}}`;
        testProject = await mutate({
            mutation: CREATE,
            variables: {
              name:"Testiramo",
              projectLead:leader.username
            }
          }); 
      expect(testProject.data.createProject).toBeDefined();
      });
      test('Add Project Member', async () => {
        const ADD_MEMBER = gql`
      mutation addMember($project:String!, $username:String!){
          addMember(project:$project, username:$username){
              project{
                  id
                  name
                  url
                  isActive
                  manager{
                      username
                      email
                      id
                  }
                  member{
                      username
                      email
                      id
                  }
                  }
                  refetch{
                      allUnassignedUsers{
                          username
                          email
                          profile
                          id
                          }
          }}
    }`;
        const addMember = await mutate({
          mutation: ADD_MEMBER,
          variables: {
            username:contractor.username,
            project:testProject.data.createProject.project.name
          }
        });
      expect(addMember.data.addMember.project.member).toHaveLength(2);
      });
});
describe('Issue',()=>{
  let report;
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => {
      return {models,
      user:leader}}
  });
  const {query, mutate} = createTestClient(server);
  test('Report Issue', async () => {
    const REPORT=gql`
        mutation createIssue($input:Fields){
                createIssue(input:$input){
                issue{
                        id
                        issueNumber
                        summary
                        issue_type
                        description
                        priority
                        resolution
                        attachment
                        reporter{
                                username
                                email
                                profile
                                id
                        }
                        assignees{
                                id
                                username
                                email
                                profile
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
                                issueNumber
                                summary
                                issue_type
                                description
                                priority
                                resolution
                                attachment
                                assignees{
                                        id
                                        username
                                        email
                                        profile
                                }
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
     report = await mutate({
      mutation:REPORT,
      variables:{input:{
        summary:"ABC", 
        description:"Kako da ne", 
        priority:"Low", 
        resolution:"Fixed", 
        status:"Closed", 
        issue_type:"Epic", 
        project:testProject.data.createProject.project.name}}
    });
    expect(report.data.createIssue.issue.description).toContain('Kako da ne');
  });
  test("Assign User", async()=>{
    const ASSIGN=gql`
          mutation assigne($user:String!, $issue:String!, $project:String!){
                  assignUser(user:$user, issue:$issue, project:$project)
                  {
                          issue{
                                  id
                                  issueNumber
                                  summary
                                  issue_type
                                  description
                                  priority
                                  resolution
                                  attachment
                                  reporter{
                                          username
                                          email
                                          profile
                                          id
                                  }
                                  assignees{
                                          id
                                          username
                                          email
                                          profile
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
                                          targetIssue(issueId:$issue){
                                                  id
                                                  issueNumber
                                                  summary
                                                  issue_type
                                                  description
                                                  priority
                                                  resolution
                                                  attachment
                                                  reporter{
                                                          username
                                                          email
                                                          profile
                                                          id
                                                  }
                                                  status
                                                  assignees{
                                                          id
                                                          username
                                                          email
                                                          profile
                                                  }
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
                  }}
          }`;
          const assign = await mutate({
            mutation:ASSIGN,
            variables:{
              user:leader.username, 
              issue:report.data.createIssue.issue.id, 
              project:testProject.data.createProject.project.name}
          });
          expect(assign.data.assignUser.issue.assignees[0].username).toBe('Krstivoje');
  });
  test('Edit', async()=>{
    const EDIT=gql`
        mutation editIssue($issueId:String, $input:Edit){
                editIssue(issueId:$issueId, input:$input){
                        issue{
                                id
                                issueNumber
                                summary
                                issue_type
                                description
                                priority
                                resolution
                                attachment
                                reporter{
                                        username
                                        email
                                        profile
                                        id
                                }
                                assignees{
                                        id
                                        username
                                        email
                                        profile
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
                                targetIssue(issueId:$issueId){
                                        id
                                        issueNumber
                                        summary
                                        issue_type
                                        description
                                        priority
                                        resolution
                                        attachment
                                        reporter{
                                                username
                                                email
                                                profile
                                                id
                                        }
                                        status
                                        assignees{
                                                id
                                                username
                                                email
                                                profile
                                        }
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
                                        }  
                                        }
                }}
        }`;
        const edit = await mutate({
          mutation:EDIT,
          variables:{
            issueId:report.data.createIssue.issue.id,
            input:{
              description:"Ovo radi"
            }
          }
        });
        expect(edit.data.editIssue.issue.description).toBe('Ovo radi');
  })

})

afterAll(async()=>
  await models.sequelize.close())