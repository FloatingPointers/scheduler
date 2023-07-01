import React from "react";
import {NavLink} from "react-router-dom";




function ManagerNavbar() {

    return (
        <nav className="flexrow">
            <NavLink to="/mgr">Home</NavLink>
            <NavLink to="/mgr/employees/">Employees</NavLink>
            <NavLink to="/mgr/scheduler/home">Scheduler</NavLink>
            <NavLink to="/mgr/settings">Settings</NavLink>
        </nav>
    );

}

export default ManagerNavbar;