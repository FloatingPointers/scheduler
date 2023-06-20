import React from "react";
import {NavLink} from "react-router-dom";



function ManagerNavbar() {

    return (
        <div>
            <navbar>
                <NavLink to="/mgr/">Home</NavLink>
                <NavLink to="/mgr/employees/">Employees</NavLink>
                <NavLink to="/mgr/scheduler/">Scheduler</NavLink>
                <NavLink to="/mgr/settings">Account</NavLink>
            </navbar>
        </div>
    );

}

export default ManagerNavbar;