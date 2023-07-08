import axios from 'axios';
import React from 'react';
import { Navigate } from 'react-router-dom';


/*
  Fields submitted from EVENT PARAM
    Credentials {
      storeNum
      name
      password
    }
    OR
    Credentials { <= NOT IMPLEMENTED ON BACKEND YET
      email
      password
    }
*/
const login = async (event) => {
  try {
    const response = await axios.post('/login', {
      storeNum: event.target.storeNum.value,
      username: event.target.name.value,
      password: event.target.password.value,
      type: "employee"
    });
    console.log("Employee login status: " + response.status);
    const { token } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('username', response.data.username);
    <Navigate to="/mgr/home"/>
  } 
  catch(err) {
    console.log(err);
  }
  
}
                             



function EmployeeLogin() {

    return (
        <form onSubmit={login}>
            <div className="label-input-combo">
                <label htmlFor="storeNum">Store Number</label>
                <input id="storeNum" name="storeNum" type="number" placeholder="000000" required/>
            </div>

            <div className="label-input-combo">
                <label htmlFor="name">Name</label>
                <input id="name" name="name" type="text" placeholder="John" required/>
            </div>

            <div className="label-input-combo">
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" placeholder="******" required/>
            </div>

            <button type="submit" id="submit">Submit</button>
            <p>Contact your manager for account creation</p>
        </form>
    );
  }
  
  export default EmployeeLogin;