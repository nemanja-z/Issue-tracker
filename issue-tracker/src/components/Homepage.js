import React, {useState, useMemo, useContext} from "react";
import { useApolloClient } from '@apollo/client';
import Sidebar from "./Sidebar";
import {Switch, useHistory, Route} from "react-router-dom";
import Project from "./project/Project";
import {useQuery} from "@apollo/client";
import {ALL_PROJECTS, USER_PROJECTS} from "../queries/project/queries";
import {AUTH, ALL_USERS, UNASSIGNED_USERS} from "../queries/user/queries";
import Container from "react-bootstrap/Container";
import Spinner from 'react-bootstrap/Spinner';
import MyView from './MyView';
import AssignedToMe from "./issue/AssignedToMe";
import ManageUsers from "./ManageUsers";
import EditProfile from "./user/EditProfile";
import {ErrorContext} from "../App";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./navbar.css";


const Homepage = () => {
    const {dispatch} = useContext(ErrorContext);
    const client = useApolloClient();
    let history = useHistory();
    const [projectId, setProjectId] = useState(null);
    const logOut = () => {
        localStorage.clear();
        client.clearStore();
        history.push("/login");
    }
    
    
    const { loading:me_loading, data:data_me } = useQuery(AUTH, {
        onError:(e)=>dispatch({type:'set', payload:e})
    });
    const { loading:user_loading,  data:user_data } = useQuery(USER_PROJECTS, {
        onError:(e)=>dispatch({type:'set', payload:e})
    });
    const { loading, data } = useQuery(ALL_PROJECTS, {
        onError:(e)=>dispatch({type:'set', payload:e})
    });
    const { loading:users_loading,  data:users_data } = useQuery(ALL_USERS, {
        variables:{me:false},
        onError:(e)=>dispatch({type:'set', payload:e})
    });
    const { loading:unassigned_users_loading, data:unnasigned_users } = useQuery(UNASSIGNED_USERS, {
        onError:(e)=>dispatch({type:'set', payload:e})
    });
    const id=useMemo(()=>data_me?.me?.id, [data_me]);
    const profilePic = useMemo(()=>data_me?.me?.profile, [data_me]);
    const projects = useMemo(()=>user_data?.userProjects?.map(project=>project), [user_data]);
    const user = useMemo(()=>({
                    id:data_me?.me?.id,
                    profile:data_me?.me?.profile,
                    role:data_me?.me?.role,
                    username:data_me?.me?.username}), [data_me]);
    
    if (users_loading||me_loading||loading||user_loading||unassigned_users_loading){ 
        return (<Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
              </Spinner>);
    }
    return(
        <Container fluid>
        <Row>
            <Col xs={1} id="sidebar-wrapper" >
            {data_me.me && <Sidebar auth={user} picture={profilePic} logOut={logOut}/>}
            </Col>
            <Col xs={10} id="page-content-wrapper">
            <Switch>
            <Route path="/projects/:id">
               <Project projectId={projectId} setProjectId={setProjectId} />
            </Route>
            <Route path="/home">
            {(data && users_data && id && unnasigned_users) && <MyView  users={unnasigned_users.allUnassignedUsers} username={id} history={history} projects={data.allProjects}/>}
            </Route>
            <Route path="/my_tasks">
                <AssignedToMe />
            </Route>
            <Route path="/manage">
              {(users_data && projects) && <ManageUsers user_projects={projects} users={unnasigned_users.allUnassignedUsers}/>}
            </Route>
            <Route path="/settings">
                {data_me && <EditProfile user={data_me.me}/>}
            </Route>
        </Switch>
        </Col>
        </Row>
        </Container>
    )
}

export default Homepage;