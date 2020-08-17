import React from "react";
import PropTypes from "prop-types";


const SignUp = ({username,password,email,handleUsername,handlePassword,handleEmail,handleSignUp}) => 
(
        <form onSubmit={handleSignUp}>
            <div>
                <label htmlFor='username'>Username:</label>
                <input type='text' id='username' value={username} onChange={handleUsername}></input>
            </div>
            <div>
                <label htmlFor='password'>Password:</label>
                <input type='text' id='password' value={password} onChange={handlePassword}></input>
            </div>
            <div>
                <label htmlFor='username'>Email:</label>
                <input type='text' id='email' value={email} onChange={handleEmail}></input>
            </div>
            <div>
                <button type="submit">Sign Up</button>
            </div>
        </form>
)

SignUp.propTypes ={
    username:PropTypes.string.isRequired,
    password:PropTypes.string.isRequired,
    email:PropTypes.string.isRequired,
    handleUsername:PropTypes.func.isRequired,
    handlePassword:PropTypes.func.isRequired,
    handleEmail:PropTypes.func.isRequired,
    handleSignUp:PropTypes.func.isRequired
}

export default SignUp;