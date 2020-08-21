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
  const token = localStorage.getItem('auth');
  console.log(token)
  return (
    <Router>
      <Switch>
          <Route path="/login">
             <Login/>
          </Route>
          <PrivateRoute token={token} path="/">
              <Homepage token={token}/>
          </PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;

