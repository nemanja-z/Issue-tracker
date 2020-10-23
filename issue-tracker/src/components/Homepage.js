import React, {useState, useMemo} from "react";
import { useApolloClient } from '@apollo/client';
import {useHistory} from "react-router-dom";
import Header from "./Header";
import {Switch, Route} from "react-router-dom";
import Project from "./project/Project";
import {useQuery} from "@apollo/client";
import {PROJECTS,ALL_PROJECTS, USER_PROJECTS} from "../queries/project/queries";
import {AUTH, ALL_USERS, UNASSIGNED_USERS} from "../queries/user/queries";
import Error from "./Error";
import Container from "react-bootstrap/Container";
import Spinner from 'react-bootstrap/Spinner';
import MyView from './MyView';
import AssignedToMe from "./issue/AssignedToMe";
import ManageUsers from "./ManageUsers";
import PrivateRoute from "./PrivateRoute";

const Homepage = () => {
    const history = useHistory();
    const client = useApolloClient();
    const [projectId, setProjectId] = useState(null);
    const logOut = () => {
        localStorage.clear();
        client.clearStore();
        history.push("/login");
    }
    
    
    const { loading:me_loading, error:me_error, data:data_me } = useQuery(AUTH, {
        onError: (error) =>  console.log(error.graphQLErrors[0].message)
    });
    const { loading:user_loading, error:user_error, data:user_data } = useQuery(USER_PROJECTS, {
        onError: (error) =>  console.log(error.graphQLErrors[0].message)
    });
    const { loading, error, data } = useQuery(ALL_PROJECTS, {
        onError: (error) =>  console.log(error.graphQLErrors[0].message)
    });
    const { loading:users_loading, error:users_error, data:users_data } = useQuery(ALL_USERS, {
        variables:{me:false},
        onError: (error) =>  console.log(error.graphQLErrors[0].message)
    });
    const { loading:unassigned_users_loading, error:unassigned_users_error, data:unnasigned_users } = useQuery(UNASSIGNED_USERS, {
        onError: (error) =>  console.log(error.graphQLErrors[0].message)
    });
    const username=useMemo(()=>data_me?.me?.username, [data_me]);
    const id=useMemo(()=>data_me?.me?.id, [data_me]);
    const profilePic = useMemo(()=>data_me?.me?.profile, [data_me]);
    const projects = useMemo(()=>user_data?.userProjects?.map(project=>project), [user_data]);
    if (users_loading||me_loading||loading||user_loading||unassigned_users_loading){ 
        return (<Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
              </Spinner>);}
    if(error||user_error||users_error||me_error||unassigned_users_error){
        return error?<Error error={error.message}/>: user_error ? <Error error={user_error.message}/>:users_error?<Error error={users_error.message}/>:me_error?<Error error={me_error.message}/>:<Error error={unassigned_users_error.message}/>;
    }
    const updateCacheWith = project => {
        const includedIn = (set, object) =>
        set.map(b => b.id).includes(object.id);
        const dataInStore = client.readQuery({ query: ALL_PROJECTS });
        if (!includedIn(dataInStore.allProjects, project)) {
          client.writeQuery({
            query: ALL_PROJECTS,
            data: { allProjects: dataInStore.allProjects.concat(project) }
          });
        }
      }
      
    console.log(users_data.allUsers)
      /*<Route path="/home">
            {(data && users_data && id) && <MyView users={users_data.allUsers} username={id} history={history} projects={data.allProjects}/>}
            </Route>*/
    return(
        <Container>
        {data_me.me && <Header picture={profilePic} logOut={logOut} username={username}/>}
        <Switch>
            <PrivateRoute path="/projects/:id">
                <Project projects={projects} client={client} projectId={projectId} setProjectId={setProjectId} />
            </PrivateRoute>
            <PrivateRoute path="/home">
            {(data && users_data && id && unnasigned_users) && <MyView leader={unnasigned_users.allUnassignedUsers} users={users_data.allUsers} username={id} history={history} projects={data.allProjects}/>}
            </PrivateRoute>
            <PrivateRoute path="/my_tasks">
                <AssignedToMe projectList={projects}/>
            </PrivateRoute>
            <PrivateRoute path="/manage">
              {(users_data && projects) && <ManageUsers user_projects={projects} users={users_data.allUsers}/>}
            </PrivateRoute>
        </Switch>
        </Container>
    )
}

export default Homepage;