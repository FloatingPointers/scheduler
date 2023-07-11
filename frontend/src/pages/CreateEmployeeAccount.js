import React, {useState} from "react"
import {NavLink} from "react-router-dom"
import { useNavigate } from 'react-router-dom';

import axiosInstance from "../Axios.js";

function CreateEmployeeAccount() {
    const navigate = useNavigate();

    const signupEmployee = async (event) => {
      event.preventDefault();
  
      //Ensure passwords match first
      if(event.target.password.value !== event.target.pwdConfirm.value){
        event.target.pwdConfirm.setCustomValidity("Passwords do not match");
        return;
      }
  
      //Send the signup request
      try {
  
        //Add required parameters to the request
        let params = {
          type: "EMPLOYEE",
          password: event.target.password.value,
          email: event.target.email.value,
          username: event.target.username.value,
          firstName: event.target.firstName.value,
          lastName: event.target.lastName.value
        }
  
        //Send the request and await the response
        const response = await axiosInstance.post('/sign-up', params);
  
        //Navigate to the log in page
        //TODO: Display a "signup successful" message if the sign up was successful
        navigate('/');
  
        console.log("Employee signup status: " + response.status);
  
      } 
      catch(err) {
        console.log(err);
      }
        
    }
      
      //TODO: make email required when its required in the backend as well
      //yum
    return (
      <div className="flexcol bordered-element">
        <h1>Employee Account Creation</h1>
        <form onSubmit={signupEmployee}>

          <div className="label-input-combo">
            <label htmlFor="username">Username</label>
            <input type="text" name="username" required/> 
          </div>

          <div className="label-input-combo">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" required/> 
          </div>

          <div>
            <div className="label-input-combo">
              <label htmlFor="firstName">First Name</label>
              <input type="text" name="firstName" required/> 
            </div>

            <div className="label-input-combo">
              <label htmlFor="lastName">Last Name</label>
              <input type="text" name="lastName" required/> 
            </div>
          </div>
  
          <div className="label-input-combo">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" required/>
          </div>
  
          <div className="label-input-combo">
            <label htmlFor="pwdConfirm">Confirm Password</label>
            <input type="password" name="pwdConfirm" required/>
          </div>
  
          <button type="submit">Confirm</button>
          
        </form>
  
        <NavLink to="/" className="create-account">Already have an account?</NavLink>
      </div>
    );


}


export default CreateEmployeeAccount;