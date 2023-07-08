import React, {useState} from "react"
import {NavLink} from "react-router-dom"
import { useNavigate } from 'react-router-dom';

import axiosInstance from "../Axios.js";

function CreateAccount() {
  const navigate = useNavigate();
    /*
      Credentials {
        storeNum
        username
        password
      }
    */
    const signup = async (event) => {
      try {

        //Ensure passwords match first
        if(event.target.password.value !== event.target.pwdConfirm.value){
          event.target.pwdConfirm.setCustomValidity("Passwords do not match");
          return;
        }
        const response = await axiosInstance.post('/sign-up', {
          storeId: event.target.storeNum.value,
          //email: event.target.email.value,
          password: event.target.password.value,
          type: "store"
        }).then(
          navigate('/')
        );
        console.log("Store signup status: " + response.status);
      } 
      catch(err) {
        console.log(err);
      }
      
    }
    
    //TODO: make email required when its required in the backend as well
    //yum
  return (
    <div className="flexcol bordered-element">
      <h1>Store Manager Account Creation</h1>
      <form onSubmit={signup}>
        
        
        <div className="label-input-combo">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" /> 
        </div>
        
        <div className="label-input-combo">
          <label htmlFor="storeNum">Store Number (6 digits)</label>
          <input type="number" name="storeNum" maxLength={6} minLength={6} defaultValue={123456} required/>
        </div>

        <div className="label-input-combo">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" defaultValue={"hi"} required/>
        </div>

        <div className="label-input-combo">
          <label htmlFor="pwdConfirm">Confirm Password</label>
          <input type="password" name="pwdConfirm" defaultValue={"hi"} required/>
        </div>

        <button type="submit">Confirm</button>
        
      </form>

      <NavLink to="/" className="create-account">Already have an account?</NavLink>
    </div>
  );
}

export default CreateAccount;
