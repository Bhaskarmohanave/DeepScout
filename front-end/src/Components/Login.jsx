// import React from "react";
import { useState } from "react";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [emptyUN, setUNError] = useState("");
  const [emptyPass, setPassError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    // if (!userName.trim() || !password.trim()) {
    // //   alert("Enter details");
    //   setUNError("Input fields cannot be empty");
    //   setPassword("");
    //   setUserName("");
    //   return;
    // }

    if (!userName.trim()){
        setUNError("UserName cannot be empty")
    }

    if (!emptyPass){
        setPassError("Password cannot be empty")
        
    }
    console.log(userName)
    console.log(password)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label htmlFor="userName">User Name:</label>
        <input
          id="userName"
          type="text"
          placeholder="Enter User Name"
          value={userName}
          onChange={(e) => {setUserName(e.target.value);
            setUNError("")
          }}
        />
        <p style={{color:'red'}}>{!emptyUN ? "" : emptyUN}</p>

        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setPassError("");
          }}
          
        />
        <p style={{color:'red'}}>{!emptyPass ? "" : emptyPass}</p>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Login;
