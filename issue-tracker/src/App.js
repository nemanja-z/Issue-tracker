import React from 'react';
import './App.css';
import Login from "./components/user/Login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";

const App = () => {
  
  return (
    <Router>
      <Switch>
        <Route path={["/", "/login"]}>
          <Login/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

