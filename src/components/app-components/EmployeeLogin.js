<<<<<<< HEAD
<<<<<<< HEAD
import React from "react";

=======
import React from 'react';
>>>>>>> 326d21be14c8602fe5ffa8df1e386f9160e33683
=======
import React from 'react';

>>>>>>> 882abefc9e654dfd1a8bd915f877b2b6f49bf5d8

function EmployeeLogin() {

    return (
        <form>
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