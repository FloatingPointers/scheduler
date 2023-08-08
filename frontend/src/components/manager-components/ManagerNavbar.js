import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axiosInstance from "../../Axios";

function ManagerNavbar() {
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("Store Name");

  //Initialize component (load display name)
  useEffect(() => {
    if (localStorage.getItem("displayName")) {
      setDisplayName(localStorage.getItem("displayName"));
    } else {
      axiosInstance
        .get("/settings/displayName")
        .then((res) => {
          localStorage.setItem("displayName", res.data.name);
          setDisplayName(res.data.name);
        })
        .catch((err) => {
          console.error("Error getting display name");
          console.error(err);
        });
    }
  }, []);

  const handleLogOut = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("displayName");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="flex w-full justify-evenly items-center text-lg p-2 bg-slate-200 dark:bg-slate-600 dark:text-white">
      <div className="inline-flex w-1/4 justify-start ml-12 items-center gap-3">
        <h2 className="font-semibold text-2xl">{displayName}</h2>
        <h2
          className="font-light text-md cursor-pointer hover:scale-110"
          onClick={handleLogOut}
        >
          Log Out
        </h2>
      </div>
      <nav className="inline-flex w-3/4 justify-end gap-6 mr-12 items-center">
        <NavLink
          to="/mgr"
          className="px-4 py-1 text-center rounded hover:shadow-md hover:bg-slate-100 hover:shadow-slate-300 dark:hover:bg-slate-700 dark:hover:shadow-slate-800 transition-all"
        >
          Home
        </NavLink>
        <NavLink
          to="/mgr/employees/"
          className="px-4 py-1 text-center rounded hover:shadow-md hover:bg-slate-100 hover:shadow-slate-300 dark:hover:bg-slate-700 dark:hover:shadow-slate-800 transition-all"
        >
          Employees
        </NavLink>
        <NavLink
          to="/mgr/scheduler/"
          className="px-4 py-1 text-center rounded hover:shadow-md hover:bg-slate-100 hover:shadow-slate-300 dark:hover:bg-slate-700 dark:hover:shadow-slate-800 transition-all"
        >
          Scheduler
        </NavLink>
        <NavLink
          to="/mgr/settings"
          className="px-4 py-1 text-center rounded hover:shadow-md hover:bg-slate-100 hover:shadow-slate-300 dark:hover:bg-slate-700 dark:hover:shadow-slate-800 transition-all"
        >
          Settings
        </NavLink>
      </nav>
    </div>
  );
}

export default ManagerNavbar;
