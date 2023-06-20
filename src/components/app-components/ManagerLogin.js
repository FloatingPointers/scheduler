import {NavLink} from "react-router-dom" 

function ManagerLogin() {

    return (
        <form>
            <div className="label-input-combo">
                <label htmlFor="storeNum">Store Number</label>
                <input id="storeNum" name="storeNum" type="number" placeholder="000000" required/>
            </div>

            <div className="label-input-combo">
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" placeholder="******" required/>
            </div>

            <button type="submit" id="submit">Submit</button>

            <NavLink to="/CreateAccount/" className="create-account">Don't have an account?</NavLink>
        </form>
    );
  }
  
  export default ManagerLogin;