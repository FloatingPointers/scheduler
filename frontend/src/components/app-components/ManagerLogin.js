
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axiosInstance from "../../Axios.js";

function ManagerLogin() {
  const navigate = useNavigate();

  

  const login = async (event) => {
    event.preventDefault();

    //TODO: Ensure EITHER the username OR email has been filled out


    try {

      //Add required parameters to the request
      //TODO: make it so users can optionally sign in using username
      let params = {
        type: "store",
        username: "placeholder",
        email: event.target.email.value,
        password: event.target.password.value
      }

      //Send the request and await the response
      const response = await axiosInstance.post('/login', params);

      //Save the auth token in browser storage
      const { token } = response.data;
      localStorage.setItem('token', token);

      //Navigate to manager home page
      navigate("/mgr");

      console.log("Manager login status: " + response.status);

    } 
    catch(err) {
      console.log(err);
    }
    
  }

  return (
    <form onSubmit={login}>
      <div className="label-input-combo">
        <label htmlFor="email">Email</label>
        <input name="email" type="email" required />
      </div>

      <div className="label-input-combo">
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" required />
      </div>

      <button type="submit">Submit</button>

      <NavLink to="/CreateAccount/" className="create-account">Don't have an account?</NavLink>
    </form>
  );
}

export default ManagerLogin;