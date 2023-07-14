import React from "react";
import {NavLink} from "react-router-dom";




function Navbar() {

    return (
        <div className="flex w-full justify-evenly items-center text-lg p-2 bg-slate-200 dark:bg-slate-600 dark:text-white">
            <div className="inline-flex w-1/4 justify-start ml-12 items-center">
                <h2 className="font-semibold text-2xl">Employee Name</h2>
            </div>
            <nav className="inline-flex w-3/4 justify-end gap-6 mr-12 items-center">
                <NavLink to="/emp" className="px-4 py-1 text-center rounded hover:shadow-md hover:bg-slate-100 hover:shadow-slate-300 dark:hover:bg-slate-700 dark:hover:shadow-slate-800 transition-all">Home</NavLink>
                <NavLink to="/emp/schedule/" className="px-4 py-1 text-center rounded hover:shadow-md hover:bg-slate-100 hover:shadow-slate-300 dark:hover:bg-slate-700 dark:hover:shadow-slate-800 transition-all">Schedule</NavLink>
                <NavLink to="/emp/request/" className="px-4 py-1 text-center rounded hover:shadow-md hover:bg-slate-100 hover:shadow-slate-300 dark:hover:bg-slate-700 dark:hover:shadow-slate-800 transition-all">Requests</NavLink>
                <NavLink to="/emp/settings/" className="px-4 py-1 text-center rounded hover:shadow-md hover:bg-slate-100 hover:shadow-slate-300 dark:hover:bg-slate-700 dark:hover:shadow-slate-800 transition-all">Settings</NavLink>
            </nav>
        </div>
    );

}

export default Navbar;