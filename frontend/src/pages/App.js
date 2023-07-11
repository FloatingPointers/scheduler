import React, {useState} from "react"
//import "../styles/App.css"
import { useNavigate, NavLink } from "react-router-dom";
import axiosInstance from "../Axios.js";



function App() {
  const navigate = useNavigate();

  /*
  Fields submitted for login
  {
    username AND/OR email
    password
    type
  }
  */
  const login = async (event) => {
    event.preventDefault();

    console.log("Login as: " + event.target.loginType.value);

    try {

      //Add required parameters to the request
      let params = {
        type: event.target.loginType.value,
        username: event.target.username.value,
        password: event.target.password.value,
      }

      //Send the request and await the response
      const response = await axiosInstance.post('/login', params);

      //Save the auth token in browser storage
      const { token } = response.data;
      localStorage.setItem('token', token);

      //Navigate to home page
      if(event.target.loginType.value === "EMPLOYEE") navigate("/emp");
      else navigate("/mgr")

      console.log("Login status: " + response.status);

    } 
    catch(err) {
      console.log(err);
    }

  }

  
  
  return (
    <div className="flex flex-row justify-center border-black border-0">
      <h1>Log In</h1>
      
      <form onSubmit={login}>
        <div>
          <div className="label-input-combo">
            <label htmlFor="username" className="text-blue-600">Username or email address</label>
            <input name="username" type="text" required />
          </div>
        </div>

        <div className="label-input-combo">
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" required/>
        </div>

        <div>
          <p>Login As: </p>
          <input type="radio" id="EMPLOYEE" name="loginType" value="EMPLOYEE" defaultChecked/>
          <label htmlFor="EMPLOYEE">Employee</label>
          <input type="radio" id="STORE" name="loginType" value="STORE" />
          <label htmlFor="STORE">Manager</label>
        </div>

        <button type="submit" id="submit">Submit</button>
      
        <NavLink to="/CreateStoreAccount/" className="create-account">Don't have an account?</NavLink>
      </form>
    </div>
  );
}

export default App;