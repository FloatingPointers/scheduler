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
    <div className="flex flex-row justify-center items-center h-screen w-screen bg-bgSecondary text-xl font-normal">
      
      <form onSubmit={login} className="border border-secondary bg-bgPrimary rounded-lg shadow-md p-8 flex flex-col gap-8 w-96">
        
        <div className="inline-flex flex-col gap-2 w-full">
          <label htmlFor="username">Username or email address</label>
          <input name="username" type="text" className="font-light border shadow-inner border-secondary rounded focus:border-accent focus:outline-none p-1 w-full" required />
        </div>

        <div className="inline-flex flex-col gap-2 w-full">
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" className="font-light border shadow-inner border-secondary rounded focus:border-accent focus:outline-none p-1 w-full" required/>
        </div>

        <div className="inline-flex flex-col gap-2 w-full">
          <p>I'm an</p>
          <ul className="bg-bgPrimary grid w-full gap-2 md:grid-cols-2"> 
            <li>
              <input type="radio" id="EMPLOYEE" name="loginType" value="EMPLOYEE" defaultChecked className="hidden peer"/>
              <label htmlFor="EMPLOYEE" className="font-light inline-flex items-center justify-center w-full p-1 cursor-pointer bg-slate-100 border border-slate-200 rounded hover:bg-slate-200 hover:border-slate-300 peer-checked:bg-slate-300 peer-checked:border-slate-300">Employee</label>
            </li>
            <li>
              <input type="radio" id="STORE" name="loginType" value="STORE" className="hidden peer"/>
              <label htmlFor="STORE" className="font-light inline-flex items-center justify-center w-full p-1 cursor-pointer bg-slate-100 border border-slate-200 rounded hover:bg-slate-200 hover:border-slate-300 peer-checked:bg-slate-300 peer-checked:border-slate-300">Manager</label>
            </li>
          </ul>
        </div>

        <div className="inline-flex flex-col gap-1 w-full items-center">
          <button type="submit" id="submit" className="w-full text-4xl font-semibold p-2 mt-4 bg-slate-600 border border-slate-300 text-white rounded hover:bg-slate-700">Sign In</button>
          <p>or</p>
          <NavLink to="/CreateStoreAccount/" className="text-blue-500 hover:text-blue-400">Create an Account</NavLink>
        </div>
      
      </form>

    </div>
  );
}

export default App;