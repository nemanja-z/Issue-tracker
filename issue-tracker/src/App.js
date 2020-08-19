import React, {useState} from 'react';
import './App.css';
import Login from "./components/user/Login";


const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');


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
  return (
    <div className="App">
      <div >
          <Login 
          username={username}
          password={password}
          email={email}
          handleUsername={handleUsername}
          handlePassword={handlePassword}
          handleEmail={handleEmail}
          />
          </div> 
          
    </div>
  );
}

export default App;

{/* <div>
          <Login
          username={username}
          password={password}
          handleUsername={handleUsername}
          handlePassword={handlePassword} />
          </div> 
        
        <div className="Signup">
          <SignUp 
          username={username}
          password={password}
          email={email}
          handleUsername={handleUsername}
          handlePassword={handlePassword}
          handleEmail={handleEmail}
          />
          </div>*/}
