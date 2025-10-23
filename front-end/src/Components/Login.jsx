// import React from "react";
import { useState } from "react";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [emptyUN, setUNError] = useState("");
  const [emptyPass, setPassError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    let hasError = false;

    // if (!userName.trim() || !password.trim()) {
    // //   alert("Enter details");
    //   setUNError("Input fields cannot be empty");
    //   setPassword("");
    //   setUserName("");
    //   return;
    // }
    if (!userName.trim() && !password.trim()) {
      setPassError("Password cannot be empty");
      setUNError("UserName cannot be empty");
      return;
    }
    if (!userName.trim()) {
      setUNError("UserName cannot be empty");
      hasError = true;
    } 
    if (!password.trim()) {
      setPassError("Password cannot be empty");
      hasError = true;
    }

    if (hasError) {
      return;
    }

    try{
      const res = await fetch("https://automatic-eureka-j69j57jwqjwfp6xj-3000.app.github.dev/login",{
        method: "POST",
        headers: {}
      })
      
    }catch(err){}

    console.log(userName);
    console.log(password);
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
          onChange={(e) => {
            setUserName(e.target.value);
            setUNError("");
          }}
        />
        <p style={{ color: "red" }}>{emptyUN}</p>

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
        <p style={{ color: "red" }}>{emptyPass}</p>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Login;
