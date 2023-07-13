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
      <div className="flex flex-row justify-center items-center h-screen w-screen bg-bgSecondary text-xl">
        <form onSubmit={signupEmployee} className="border border-secondary bg-bgPrimary rounded-lg shadow-md p-8 flex flex-col gap-4">
          <h1 className="text-3xl font-semibold pb-2">Employee Account Creation</h1>
          <div className="inline-flex flex-row gap-20 justify-evenly">
            <div className="inline-flex flex-col gap-2 w-full">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" required/> 
            </div>

            <div className="inline-flex flex-col gap-2 w-full">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" required/> 
            </div>
          </div>

          <div className="inline-flex flex-row gap-20 justify-evenly">
            <div className="inline-flex flex-col gap-2 w-full">
              <label htmlFor="firstName">First Name</label>
              <input type="text" name="firstName" required/> 
            </div>

            <div className="inline-flex flex-col gap-2 w-full">
              <label htmlFor="lastName">Last Name</label>
              <input type="text" name="lastName" required/> 
            </div>
          </div>
  
          <div className="inline-flex flex-row gap-20 justify-evenly">
            <div className="inline-flex flex-col gap-2 w-full">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" required/>
            </div>
    
            <div className="inline-flex flex-col gap-2 w-full">
              <label htmlFor="pwdConfirm">Confirm Password</label>
              <input type="password" name="pwdConfirm" required/>
            </div>
          </div>
  
          <div className="inline-flex flex-col gap-1 w-full items-center">
            <button type="submit" className="w-full text-3xl font-semibold p-2 bg-slate-600 border border-slate-300 text-white rounded hover:bg-slate-700">Confirm</button>
            <p>or</p>
            <NavLink to="/" className="text-blue-500 hover:text-blue-400">Already have an account?</NavLink>
          </div>

        </form>
  
      </div>
    );


}


export default CreateEmployeeAccount;