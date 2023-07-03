import React, {useState} from "react"
import {NavLink} from "react-router-dom" 



function CreateAccount() {
  const [password, setPassword] = useState("");
  const [confirmPassord, setConfirmPassword] = useState("");


  const handlePwdBlurEvent = event => {
    setPassword(event.target.value);
  }

  const handlePwdConfirmBlurEvent = event => {
    setConfirmPassword(event.target.value);
    if (password !== confirmPassord) {
      event.target.setCustomValidity("Passwords do not match");
    }
}
  
  return (
    <div className="flexcol bordered-element">
      <h1>Store Manager Account Creation</h1>
      <form>
        
        <div className="label-input-combo">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" required/>
        </div>

        <div className="label-input-combo">
          <label htmlFor="pwd">Password</label>
          <input id="password" type="password" name="password" onBlur={handlePwdBlurEvent} required/>
        </div>

        <div className="label-input-combo">
          <label htmlFor="pwd-confirm">Confirm Password</label>
          <input type="password" name="pwd-confirm" onBlur={handlePwdConfirmBlurEvent} required/>
        </div>

        <button type="submit">Confirm</button>
        
      </form>

      <NavLink to="/" className="create-account">Already have an account?</NavLink>
    </div>
  );
}

export default CreateAccount;
