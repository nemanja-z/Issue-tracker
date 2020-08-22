import React from 'react';
import './App.css';
import Login from "./components/user/Login";
import Homepage from "./components/Homepage";
import PrivateRoute from "./components/PrivateRoute";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
//import {useQuery} from "@apollo/client";
//import {AUTH} from "./queries/user/queries";

const App = () => {
  return (
    <Router>
      <Switch>
          <Route path="/login">
             <Login/>
          </Route>
          <PrivateRoute path="/">
              <Homepage/>
          </PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;

