import React, {useState} from 'react';
import './App.css';
import SignUp from "./components/user/SignUp";
import {SIGN_UP} from "./queries/user/queries";
import {useMutation} from "@apollo/client";

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [signUp, {data}] = useMutation(SIGN_UP);


  const handleUsername = e =>{
    e.preventDefault();
    setUsername(e.target.value);
  }
  const handlePassword = e =>{
    e.preventDefault();
    setPassword(e.target.value);
  }
  const handleEmail = e =>{
    e.preventDefault();
    setEmail(e.target.value);
  }
  const handleSignUp = e =>{
    e.preventDefault();
    signUp({variables:{username, password, email}});
  }

  return (
    <div className="App">
      <header className="App-header">
        
      </header>
      <SignUp 
      username={username}
      password={password}
      email={email}
      handleUsername={handleUsername}
      handlePassword={handlePassword}
      handleEmail={handleEmail}
      handleSignUp={handleSignUp}
      />

    </div>
  );
}

export default App;
