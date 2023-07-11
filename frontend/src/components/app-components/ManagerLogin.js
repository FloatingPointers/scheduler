
import React, {useState} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axiosInstance from "../../Axios.js";

function ManagerLogin() {
  const [loginWithUsername, setLoginWithUsername] = useState(true);

  const navigate = useNavigate();

  

  const login = async (event) => {
    event.preventDefault();

    try {

      //Add required parameters to the request
      let params = {
        type: "store",
        password: event.target.password.value
      }

      //Since passport requires the username field be set, we must set it to something, the value doesn't matter as long as it isn't null or undefined
      //if we're logging in with email instead
      if(event.target.email && event.target.email.value) params = { ...params, email: event.target.email.value }
      if(event.target.username && event.target.username.value) params = { ...params, username: event.target.username.value }
      else params = { ...params, username: "unspecified" }

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
      {
      loginWithUsername ? 
        (
          <div>
            <p onClick={() => {setLoginWithUsername(false)}}>Login with email instead...</p>
            <div className="label-input-combo">
              <label htmlFor="username">Username</label>
              <input name="username" type="text" required />
            </div>
          </div>
        ) : (
          <div>
            <p onClick={() => {setLoginWithUsername(true)}}>Login with username instead...</p>
            <div className="label-input-combo">
              <label htmlFor="email">Email</label>
              <input name="email" type="email" required />
            </div>
          </div>
        )
      }
      
      <div className="label-input-combo">
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" required />
      </div>

      <button type="submit">Submit</button>

      <NavLink to="/CreateStoreAccount/" className="create-account">Don't have an account?</NavLink>
    </form>
  );
}

export default ManagerLogin;