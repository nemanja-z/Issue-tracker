"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvers = exports.typeDefs = void 0;

var _apolloServerTesting = require("apollo-server-testing");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _path = _interopRequireDefault(require("path"));

var _models = require("../models");

const {
  ApolloServer,
  gql
} = require('apollo-server');

const {
  mergeTypeDefs
} = require('@graphql-tools/merge');

const {
  mergeResolvers
} = require('@graphql-tools/merge');

const {
  loadFilesSync
} = require('@graphql-tools/load-files');

const bcrypt = require('bcrypt');

_dotenv.default.config();

const typeDefs = mergeTypeDefs(loadFilesSync(_path.default.join(__dirname, '../schema')));
exports.typeDefs = typeDefs;
const resolvers = mergeResolvers(loadFilesSync(_path.default.join(__dirname, '../resolvers')));
exports.resolvers = resolvers;
let user;
let leader;
let developer;
let contractor;
let testProject;
beforeAll(async () => {
  await Promise.allSettled(Object.keys(_models.db).map(key => {
    if (!['sequelize', 'Sequelize'].includes(key)) return _models.db[key].destroy({
      where: {},
      force: true
    });
  }));
  user = await _models.db.User.create({
    username: 'Ljubivoje',
    email: 'lginmwyffgkkpvgplk@niwghx.com',
    role: 'Manager',
    profile: process.env.CLOUDINARY,
    passwordHash: await bcrypt.hash('Popajce', 10),
    isVerified: true
  });
  leader = await _models.db.User.create({
    username: 'Krstivoje',
    email: 'lginmwyffgkkdsadapvgplk@niwghx.com',
    role: 'Leader',
    profile: process.env.CLOUDINARY,
    passwordHash: await bcrypt.hash('Popara', 10),
    isVerified: true
  });
  developer = await _models.db.User.create({
    username: 'Program',
    email: 'lginmwyffdsagkkdsadapvgplk@niwghx.com',
    role: 'Developer',
    profile: process.env.CLOUDINARY,
    passwordHash: await bcrypt.hash('Prazno', 10),
    isVerified: true
  });
  contractor = await _models.db.User.create({
    username: 'Business',
    email: 'lginmwyffdgkkdsadapvgplk@niwghx.com',
    role: 'Contractor',
    profile: process.env.CLOUDINARY,
    passwordHash: await bcrypt.hash('Ficfiric', 10),
    isVerified: true
  });
});
describe('User', () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({
      models: _models.db,
      user
    })
  });
  const {
    mutate
  } = (0, _apolloServerTesting.createTestClient)(server);
  test('Login', async () => {
    const LOGIN = gql`
      mutation loginUser($username: String!, $password: String!) {
        loginUser(username: $username, password: $password) {
          token
        }
      }
    `;
    const loginUser = await mutate({
      mutation: LOGIN,
      variables: {
        username: 'Ljubivoje',
        password: 'Popajce'
      }
    });
    expect(loginUser.data.loginUser.token).toBeDefined();
  });
  test('Edit User Settings', async () => {
    const EDIT_USER = gql`
      mutation editUser($password: String, $email: String, $profile: Upload) {
        editUser(password: $password, email: $email, profile: $profile) {
          id
          username
          email
          role
          profile
        }
      }
    `;
    const edit = await mutate({
      mutation: EDIT_USER,
      variables: {
        email: user.email,
        password: 'Radi100'
      }
    });
    expect(edit.data.editUser).toBeDefined();
  });
});
describe('Project', () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async () => ({
      models: _models.db,
      user
    })
  });
  const {
    mutate
  } = (0, _apolloServerTesting.createTestClient)(server);
  test('Create Project', async () => {
    const CREATE = gql`
      mutation createProject(
        $name: String!
        $url: String
        $projectLead: String
      ) {
        createProject(name: $name, url: $url, projectLead: $projectLead) {
          project {
            id
            name
            url
            isActive
            manager {
              username
              email
              id
            }
            member {
              username
              email
              id
            }
          }
          refetch {
            allProjects {
              id
              name
              url
              isActive
              manager {
                username
                email
                id
              }
              member {
                username
                email
                id
              }
            }
          }
        }
      }
    `;
    testProject = await mutate({
      mutation: CREATE,
      variables: {
        name: 'Testiramo',
        projectLead: leader.username
      }
    });
    expect(testProject.data.createProject).toBeDefined();
  });
  test('Add Project Member', async () => {
    const ADD_MEMBER = gql`
      mutation addMember($project: String!, $username: String!) {
        addMember(project: $project, username: $username) {
          project {
            id
            name
            url
            isActive
            manager {
              username
              email
              id
            }
            member {
              username
              email
              id
            }
          }
          refetch {
            allUnassignedUsers {
              username
              email
              profile
              id
            }
          }
        }
      }
    `;
    const addMember = await mutate({
      mutation: ADD_MEMBER,
      variables: {
        username: contractor.username,
        project: testProject.data.createProject.project.name
      }
    });
    expect(addMember.data.addMember.project.member).toHaveLength(2);
  });
});
describe('Issue', () => {
  let report;
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({
      models: _models.db,
      user: leader
    })
  });
  const {
    mutate
  } = (0, _apolloServerTesting.createTestClient)(server);
  test('Report Issue', async () => {
    const REPORT = gql`
      mutation createIssue($input: Fields) {
        createIssue(input: $input) {
          issue {
            id
            issueNumber
            summary
            issue_type
            description
            priority
            resolution
            attachment
            reporter {
              username
              email
              profile
              id
            }
            assignees {
              id
              username
              email
              profile
            }
            status
            createdAt
            updatedAt
            Project {
              name
              url
            }
            Users {
              username
              email
            }
          }
          refetch {
            issuesAll {
              id
              issueNumber
              summary
              issue_type
              description
              priority
              resolution
              attachment
              assignees {
                id
                username
                email
                profile
              }
              reporter {
                username
                email
                profile
                id
              }
              status
              createdAt
              updatedAt
              Project {
                name
                url
              }
            }
          }
        }
      }
    `;
    report = await mutate({
      mutation: REPORT,
      variables: {
        input: {
          summary: 'ABC',
          description: 'Kako da ne',
          priority: 'Low',
          resolution: 'Fixed',
          status: 'Closed',
          issue_type: 'Epic',
          project: testProject.data.createProject.project.name
        }
      }
    });
    expect(report.data.createIssue.issue.description).toContain('Kako da ne');
  });
  test('Assign User', async () => {
    const ASSIGN = gql`
      mutation assigne($user: String!, $issue: String!, $project: String!) {
        assignUser(user: $user, issue: $issue, project: $project) {
          issue {
            id
            issueNumber
            summary
            issue_type
            description
            priority
            resolution
            attachment
            reporter {
              username
              email
              profile
              id
            }
            assignees {
              id
              username
              email
              profile
            }
            status
            createdAt
            updatedAt
            Project {
              name
              url
            }
            Users {
              username
              email
            }
          }
          refetch {
            targetIssue(issueId: $issue) {
              id
              issueNumber
              summary
              issue_type
              description
              priority
              resolution
              attachment
              reporter {
                username
                email
                profile
                id
              }
              status
              assignees {
                id
                username
                email
                profile
              }
              createdAt
              updatedAt
              Project {
                name
                url
                id
              }
              Users {
                username
                email
              }
            }
          }
        }
      }
    `;
    const assign = await mutate({
      mutation: ASSIGN,
      variables: {
        user: leader.username,
        issue: report.data.createIssue.issue.id,
        project: testProject.data.createProject.project.name
      }
    });
    expect(assign.data.assignUser.issue.assignees[0].username).toBe('Krstivoje');
  });
  test('Edit', async () => {
    const EDIT = gql`
      mutation editIssue($issueId: String, $input: Edit) {
        editIssue(issueId: $issueId, input: $input) {
          issue {
            id
            issueNumber
            summary
            issue_type
            description
            priority
            resolution
            attachment
            reporter {
              username
              email
              profile
              id
            }
            assignees {
              id
              username
              email
              profile
            }
            status
            createdAt
            updatedAt
            Project {
              name
              url
            }
            Users {
              username
              email
            }
          }
          refetch {
            targetIssue(issueId: $issueId) {
              id
              issueNumber
              summary
              issue_type
              description
              priority
              resolution
              attachment
              reporter {
                username
                email
                profile
                id
              }
              status
              assignees {
                id
                username
                email
                profile
              }
              createdAt
              updatedAt
              Project {
                name
                url
                id
              }
              Users {
                username
                email
              }
            }
          }
        }
      }
    `;
    const edit = await mutate({
      mutation: EDIT,
      variables: {
        issueId: report.data.createIssue.issue.id,
        input: {
          description: 'Ovo radi'
        }
      }
    });
    expect(edit.data.editIssue.issue.description).toBe('Ovo radi');
  });
  test('Comment', async () => {
    const POST = gql`
      mutation postComment($comment: String!, $issueId: String!) {
        postComment(comment: $comment, issueId: $issueId) {
          comment {
            comment
            commenter {
              id
              username
              email
              profile
            }
          }
          refetch {
            issueComment(issueId: $issueId) {
              comment
              commenter {
                id
                username
                email
                profile
              }
            }
          }
        }
      }
    `;
    const post = await mutate({
      mutation: POST,
      variables: {
        issueId: report.data.createIssue.issue.id,
        comment: 'Proba 123'
      }
    });
    expect(post.data.postComment.comment.comment).toBe('Proba 123');
  });
});