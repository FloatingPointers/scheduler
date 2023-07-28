import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Modal } from "@mantine/core";

import axiosInstance from "../Axios.js";
import { useDisclosure } from "@mantine/hooks";

function ChangePassword() {
  const navigate = useNavigate();
  const [tokenVerified, setTokenVerified] = useState(true); //PURELY FOR DISPLAY PURPOSES ONLY

  //Obtain token from url
  const queryParameters = new URLSearchParams(window.location.search)
  const token = queryParameters.get("token")

  console.log(token);

  const verifyToken = async() => {
    try {
      //Verify token hasn't expired yet
      const res = await axiosInstance.post('/resetPassword/verifyToken', {
        token: token
      });
      if(!res.data.success) {
        //Token expired / not valid
        setTokenVerified(false);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    verifyToken();
  }, []);



  const handleReset = async(event) => {
    event.preventDefault()
    
    axiosInstance
    .put("/resetPassword/reset", { 
      token: token,
      password: event.target.newPassword.value 
    })
    .then((res) => {
      if(res.data.success) navigate("/")
      else {
        //Error message (invalid token)
        setTokenVerified(false);
      }
    })
    .catch((err) => {
      console.log("Error resetting password");
      console.log(err);
    });
  }



  return (
    <div className="flex flex-row justify-center items-center h-screen w-screen bg-bgSecondary text-xl">
      <div className="border border-slate-300 bg-bgPrimary rounded-lg shadow-md p-12 text-xl">
        
        {
          tokenVerified ? (
            <form onSubmit={handleReset} className="flex flex-col gap-8">
              <h1 className="font-semibold text-3xl">Change Password</h1>
              
              <div className="inline-flex flex-col gap-2 w-full">
                <label htmlFor="newPassword">New Password</label>
                <input type="password" name="newPassword" required className="font-light border shadow-inner border-slate-300 rounded focus:border-slate-400 focus:outline-none p-1 w-full" />
              </div>
        
              <div className="inline-flex flex-col gap-2 w-full">
                <label htmlFor="newPasswordConfirm">Confirm New Password</label>
                <input type="password" name="newPasswordConfirm" required className="font-light border shadow-inner border-slate-300 rounded focus:border-slate-400 focus:outline-none p-1 w-full" />
              </div>
        
              <div className="inline-flex flex-col gap-2 w-full">
                <button type="submit" className="w-full text-3xl bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 font-semibold transition-colors">Reset Password</button>
                <NavLink to="/" className="text-blue-500 hover:text-blue-400 whitespace-nowrap">Back to Sign in</NavLink>
              </div>
            </form>
          ) : (
            <div className="flex flex-col gap-4 text-xl">
              <p>The link you used to reset your password is invalid or has expired, please return to the forgot password page to generate a new link</p>
              <div className="inline-flex flex-row items-center space-between w-full">
                <p onClick={() => {navigate('/forgotPassword/')}} className="w-full cursor-pointer text-blue-500 hover:text-blue-400">Forgot Password</p>
                <NavLink to="/" className="text-blue-500 hover:text-blue-400 whitespace-nowrap">Back to Sign in</NavLink>
              </div>
            </div>
          )
        }
        
      </div>
    </div>

  )


}

export default ChangePassword;