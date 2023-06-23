import React from "react";
import {NavLink} from "react-router-dom";




function Navbar() {

    return (
        <nav className="flexrow">
            <NavLink to="/emp">Home</NavLink>
            <NavLink to="/emp/schedule/">Schedule</NavLink>
            <NavLink to="/emp/request/">Requests</NavLink>
            <NavLink to="/emp/settings/">Settings</NavLink>
        </nav>
    );

}

export default Navbar;