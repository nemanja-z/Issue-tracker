import React, {useState,useEffect} from 'react';
import './App.css';
import Login from "./components/user/Login";
import Homepage from "./components/Homepage";
import PrivateRoute from "./components/PrivateRoute";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import {useQuery} from "@apollo/client";
import {AUTH} from "./queries/user/queries";

const App = () => {
  const { data } = useQuery(AUTH, {
    pollInterval: 500,
  });
  return (
    <Router>
      <Switch>
          <Route path={"/login"}>
           <Login user={data}/>
        </Route>
          <PrivateRoute path={'/'}>
          <Homepage user={data}/>
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;

