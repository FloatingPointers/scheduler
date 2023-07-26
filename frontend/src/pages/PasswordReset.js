import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import axiosInstance from "../Axios.js";

function PasswordReset() {
  const [email, setEmail] = useState();


  const handleReset = async() => {
    axiosInstance.put("/forgotPassword")
  }

  return(
    <div className="flex flex-row justify-center items-center h-screen w-screen bg-bgSecondary text-xl">
      <div className="border border-slate-300 bg-bgPrimary rounded-lg shadow-md p-8 flex flex-col gap-4">
        <h1>Forgot Password</h1>
        <p> Enter your email for to change password</p>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="font-light border shadow-inner border-slate-300 rounded focus:border-slate-400 focus:outline-none p-1 w-full" />
        <button onClick={handleReset} className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600   transition-colors">Reset Password</button>
      </div>
    </div>
  );
}

export default PasswordReset;
