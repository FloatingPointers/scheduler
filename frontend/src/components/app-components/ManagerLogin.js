import axios from 'axios';
import React from "react";
import { NavLink, Navigate } from "react-router-dom";

function ManagerLogin() {


  /*
    Credentials {
      storeNum
      username
      password
    }
  */
  const login = async (event) => {
    try {
      const response = await axios.post('/login', {
        storeNum: event.target.storeNum.value,
        username: event.target.storeNum.value,
        password: event.target.password.value,
        type: "store"
      });
      console.log("Manager login status: " + response.status);
      const { token } = response.data;
      localStorage.setItem('token', token);
      <Navigate to="/emp/home"/>
    } 
    catch(err) {
      console.log(err);
    }
    
  }

  return (
    <form onSubmit={login}>
      <div className="label-input-combo">
        <label htmlFor="storeNum">Store Number</label>
        <input id="storeNum" name="storeNum" type="number" placeholder="000000" required />
      </div>

      <div className="label-input-combo">
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" placeholder="******" required />
      </div>

      <button type="submit" id="submit">Submit</button>

      <NavLink to="/CreateAccount/" className="create-account">Don't have an account?</NavLink>
    </form>
  );
}

export default ManagerLogin;