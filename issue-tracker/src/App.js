import { createContext, default as React, useEffect, useReducer } from 'react';
import {
  BrowserRouter as Router,

  Route, Switch
} from "react-router-dom";
import Error from "./components/Error";
import Homepage from "./components/Homepage";
import PrivateRoute from "./components/PrivateRoute";
import ConfirmUser from "./components/user/ConfirmUser";
import ForgotPassword from "./components/user/ForgotPassword";
import Login from './components/user/Login';
import ResetPassword from "./components/user/ResetPassword";

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

