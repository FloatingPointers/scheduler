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
    <div className="flex flex-row justify-center items-center h-screen w-screen
                  bg-bgPrimary text-2xl">
      
      
      <form onSubmit={login} className="border border-secondary bg-bgSecondary shadow-md drop-shadow p-8 flex flex-col gap-2">
        <label htmlFor="username">Username or email address</label>
        <input name="username" type="text" className="border border-secondary focus:border-accent focus:outline-none" required />

        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" className="border border-secondary focus:border-accent focus:outline-none" required/>
        
        <p>Login As: </p>
        <ul className="bg-bgPrimary grid w-full gap-2 md:grid-cols-2"> 
          <li>
            <input type="radio" id="EMPLOYEE" name="loginType" value="EMPLOYEE" defaultChecked className="hidden peer"/>
            <label htmlFor="EMPLOYEE" className="inline-flex items-center justify-center w-full p-1 cursor-pointer bg-bgSecondary border border-secondary rounded hover:bg-bgPrimary hover:border-primary peer-checked:bg-bgAccent peer-checked:border-accent peer-checked:text-accent">Employee</label>
          </li>
          <li>
            <input type="radio" id="STORE" name="loginType" value="STORE" className="hidden peer"/>
            <label htmlFor="STORE" className="inline-flex items-center justify-center w-full p-1 cursor-pointer bg-bgSecondary border border-secondary rounded hover:bg-bgPrimary hover:border-primary peer-checked:bg-bgAccent peer-checked:border-accent peer-checked:text-accent">Manager</label>
          </li>
        </ul>

        <button type="submit" id="submit" className="text-3xl font-semibold p-2 m-2 bg-bgPrimary">Sign In</button>
      
        <NavLink to="/CreateStoreAccount/" className="create-account">Don't have an account?</NavLink>
      </form>
    </div>
  );
}

export default App;