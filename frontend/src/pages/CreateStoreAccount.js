import React, {useState} from "react"
import {NavLink} from "react-router-dom"
import { useNavigate } from 'react-router-dom';

import axiosInstance from "../Axios.js";

function CreateStoreAccount() {
  const navigate = useNavigate();

  const signupStore = async (event) => {
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
        type: "STORE",
        password: event.target.password.value,
        email: event.target.email.value,
        username: event.target.username.value,
        storeName: event.target.storeName.value
      }

      //Send the request and await the response
      const response = await axiosInstance.post('/sign-up', params);

      //Navigate to the log in page
      //TODO: Display a "signup successful" message if the sign up was successful
      navigate('/');

      console.log("Store signup status: " + response.status);

    } 
    catch(err) {
      console.log(err);
    }
      
  }
    
    //TODO: make email required when its required in the backend as well
    //yum
  return (
    <div className="flex flex-row justify-center items-center h-screen w-screen bg-bgSecondary text-xl">
      
      <form onSubmit={signupStore} className="border border-slate-300 bg-bgPrimary rounded-lg shadow-md p-8 flex flex-col gap-4">
        <h1 className="text-3xl font-semibold pb-2">Store Account Creation</h1>
        <hr class="h-px bg-slate-200 border-0"></hr>
        <div className="inline-flex flex-row gap-20 justify-evenly">
          <div className="inline-flex flex-col gap-2 w-full">
            <label htmlFor="username">Username</label>
            <input type="text" name="username" required className="font-light border shadow-inner border-slate-300 rounded focus:border-slate-400 focus:outline-none p-1 w-full"/> 
          </div>

          <div className="inline-flex flex-col gap-2 w-full">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" required className="font-light border shadow-inner border-slate-300 rounded focus:border-slate-400 focus:outline-none p-1 w-full"/> 
          </div>
        </div>

        <div className="inline-flex flex-row gap-20 justify-evenly">
          <div className="inline-flex flex-col gap-2 w-full">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" required className="font-light border shadow-inner border-slate-300 rounded focus:border-slate-400 focus:outline-none p-1 w-full"/>
          </div>

          <div className="inline-flex flex-col gap-2 w-full">
            <label htmlFor="pwdConfirm">Confirm Password</label>
            <input type="password" name="pwdConfirm" required className="font-light border shadow-inner border-slate-300 rounded focus:border-slate-400 focus:outline-none p-1 w-full"/>
          </div>
        </div>

        <div className="inline-flex flex-col gap-2 w-full">
          <label htmlFor="storeName">Store Name</label>
          <input type="text" name="storeName" required className="font-light border shadow-inner border-slate-300 rounded focus:border-slate-400 focus:outline-none p-1 w-full"/>
        </div>

        <div className="inline-flex flex-col gap-1 w-full items-center">
          <button type="submit" className="w-full text-3xl font-semibold p-2 mt-2 bg-slate-600 border border-slate-300 text-white rounded hover:bg-slate-700">Confirm</button>
          <p>or</p>
          <NavLink to="/" className="text-blue-500 hover:text-blue-400">Already have an account?</NavLink>
        </div>
      </form>

    </div>
  );
}

export default CreateStoreAccount;
