import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Modal } from "@mantine/core";

import axiosInstance from "../Axios.js";

function ForgotPassword() {
  const [ sentRequest, setSentRequest ] = useState(false)
  const [ email, setEmail ] = useState("none");

  const handleResetRequest = async(event) => {
    event.preventDefault()
    
    axiosInstance
    .post("/resetPassword/request", { 
      email: event.target.emailInput.value 
    })
    .then((res) => {
      setEmail(event.target.emailInput.value)
      setSentRequest(true);
    })
    .catch((err) => {
      console.log("Error requesting a code for password reset");
      console.log(err);
    })
  }





  return(
    <div className="flex flex-row justify-center items-center h-screen w-screen bg-bgSecondary text-xl">
      <div className="border border-slate-300 bg-bgPrimary rounded-lg shadow-md p-8 text-xl">

        {
          sentRequest ? (
            <div className="flex flex-col gap-8 justify-center items-center">
              <h1 className="font-semibold text-3xl w-full">Reset Request Sent to {email}</h1>
              <p>Check your email for a link to reset your password</p>
              <NavLink to="/" className="text-blue-500 hover:text-blue-400 text-right w-full">Back to Sign in</NavLink>
              {/*<div className="inline-flex flex-row items-center space-between w-full">
                <p onClick={() => {setSentRequest(false)}} className="w-full cursor-pointer text-blue-500 hover:text-blue-400">Resend Code</p>
                <NavLink to="/" className="text-blue-500 hover:text-blue-400 whitespace-nowrap">Back to Sign in</NavLink>
              </div>*/}
            </div>
          ) : (
            <form onSubmit={handleResetRequest} className="flex flex-col gap-8">
              <h1 className="font-semibold text-3xl">Forgot Password</h1>
    
              <div className="inline-flex flex-col gap-2 w-full">
                <label htmlFor="emailInput"> Enter your email to change your password</label>
                <input type="email" name="emailInput" required className="font-light border shadow-inner border-slate-300 rounded focus:border-slate-400 focus:outline-none p-1 w-full" />
              </div>
    
              <div className="inline-flex flex-col gap-2 w-full">
                <button type="submit" className="w-full font-semibold text-3xl bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors">Request Password Reset</button>
                <NavLink to="/" className="text-blue-500 hover:text-blue-400 text-right">Back to Sign in</NavLink>
              </div>
            </form>
          )
        }
        
      </div>
    </div>
  );
}

export default ForgotPassword;
