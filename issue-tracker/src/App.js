import React, { useReducer, createContext, useEffect } from 'react';
import './App.css';
import Login from "./components/user/Login";
import ForgotPassword from "./components/user/ForgotPassword";
import ResetPassword from "./components/user/ResetPassword";
import ConfirmUser from "./components/user/ConfirmUser";
import Error from "./components/Error";
import Homepage from "./components/Homepage";
import PrivateRoute from "./components/PrivateRoute";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const initialError = '';
const reducer = (state, action) =>{
  switch(action.type){
    case 'set':
      return action.payload.message;
    case 'reset':
      return '';
    default:
      return state;
    }
}
export const ErrorContext = createContext();

const App = () => {
  const [error, dispatch] = useReducer(reducer, initialError);
  useEffect(()=>{
    if(error){
      setTimeout(()=>{return dispatch({type:'reset'})}, 5000)
    }
  })
  if(error){
    return <Error error={error}/>
  }

  return (
    <Router>
      <ErrorContext.Provider value={{error, dispatch}}>
      <Switch>
          <Route path="/login">
             <Login/>
          </Route>
          <Route path="/forgot">
             <ResetPassword/>
          </Route>
          <Route path="/reset/:token">
            <ForgotPassword/>
          </Route>
          <Route path="/confirm/:token">
            <ConfirmUser/>
          </Route>
          <PrivateRoute path="/">
              <Homepage/>
          </PrivateRoute>
      </Switch>
      </ErrorContext.Provider>
    </Router>
  );
}

export default App;

