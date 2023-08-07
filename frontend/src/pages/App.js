import React, { useState, useEffect } from "react";
//import "../styles/App.css"
import { useNavigate, NavLink } from "react-router-dom";
import axiosInstance from "../Axios.js";
import { IoMdCalendar } from "react-icons/io";
import { MantineProvider, Button } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";
import ErrorAlert from "../components/app-components/NotificationAlerts.js";

function App() {
  const navigate = useNavigate();
  const [signInAsEmployee, setSignInAsEmployee] = useState(true);

  /*
  Fields submitted for login
  {
    username AND/OR email
    password
    type
  }
  */
  const login = async (event) => {
    event.preventDefault();

    console.log("Login as: " + event.target.loginType.value);

    try {
      //Add required parameters to the request
      let params = {
        type: event.target.loginType.value,
        username: event.target.username.value,
        password: event.target.password.value,
      };

      //Send the request and await the response
      const response = await axiosInstance.post("/login", params);

      //Save the auth token in browser storage
      const { token } = response.data;
      localStorage.setItem("token", token);

      //Used ONLY for checking if this role can access the page  :  important!
      localStorage.setItem("role", response.data.type);

      // Navigate to home page
      if (event.target.loginType.value === "EMPLOYEE") navigate("/emp");
      else navigate("/mgr");

      console.log("Login status: " + response.status);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-row justify-center items-center h-screen w-screen bg-slate-100 text-xl">
      <form
        onSubmit={login}
        className="border border-slate-300 bg-slate-50 rounded-lg shadow-md p-8 flex flex-col gap-8 w-96"
      >
        <div className="inline-flex flex-col items-center">
          <IoMdCalendar className="text-8xl" />
          <h1 className="text-2xl">Sign in to Scheduler App</h1>
        </div>

        <hr class="h-px bg-slate-200 border-0"></hr>

        <div className="inline-flex flex-col gap-2 w-full">
          <label htmlFor="username">Username or email address</label>
          <input
            name="username"
            type="text"
            className="font-light border shadow-inner border-slate-300 rounded focus:border-slate-400 focus:outline-none p-1 w-full transition-colors"
            required
          />
        </div>

        <div className="inline-flex flex-col gap-2 w-full">
          <div className="inline-flex flex-row w-full space-between items-center">
            <label htmlFor="password" className="w-full">
              Password
            </label>
            <NavLink
              to={"/forgotPassword/"}
              className="text-sm text-blue-500 hover:text-blue-400 transition-colors whitespace-nowrap"
            >
              Forgot password?
            </NavLink>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            className="font-light border shadow-inner border-slate-300 rounded focus:border-slate-400 focus:outline-none p-1 w-full transition-colors"
            required
          />
        </div>

        <div className="inline-flex flex-col gap-2 w-full">
          <p>I'm a{signInAsEmployee ? "n" : ""}</p>
          <ul className="grid w-full gap-2 md:grid-cols-2">
            <li>
              <input
                type="radio"
                id="EMPLOYEE"
                name="loginType"
                value="EMPLOYEE"
                defaultChecked={signInAsEmployee}
                onClick={() => {
                  setSignInAsEmployee(true);
                }}
                className="hidden peer"
              />
              <label
                htmlFor="EMPLOYEE"
                className="font-light inline-flex items-center justify-center w-full p-1 cursor-pointer bg-slate-100 border border-slate-200 rounded hover:bg-slate-200 hover:border-slate-300 peer-checked:bg-slate-300 peer-checked:border-slate-300 transition-colors"
              >
                Employee
              </label>
            </li>
            <li>
              <input
                type="radio"
                id="STORE"
                name="loginType"
                value="STORE"
                defaultChecked={!signInAsEmployee}
                onClick={() => {
                  setSignInAsEmployee(false);
                }}
                className="hidden peer"
              />
              <label
                htmlFor="STORE"
                className="font-light inline-flex items-center justify-center w-full p-1 cursor-pointer bg-slate-100 border border-slate-200 rounded hover:bg-slate-200 hover:border-slate-300 peer-checked:bg-slate-300 peer-checked:border-slate-300 transition-colors"
              >
                Manager
              </label>
            </li>
          </ul>
        </div>

        <div className="inline-flex flex-col gap-1 w-full items-center">
          <button
            type="submit"
            id="submit"
            className="w-full text-4xl font-semibold p-2 bg-slate-600 border border-slate-300 text-white rounded hover:bg-slate-700 transition-colors"
          >
            Sign In
          </button>
          {signInAsEmployee ? (
            <div className="text-center">
              <p>or</p>
              <NavLink
                to={"/CreateEmployeeAccount/"}
                className="text-blue-500 hover:text-blue-400 transition-colors"
              >
                Create an account
              </NavLink>
            </div>
          ) : (
            <div className="text-center">
              <p>or</p>
              <NavLink
                to={"/CreateStoreAccount/"}
                className="text-blue-500 hover:text-blue-400 transition-colors"
              >
                Create a new store
              </NavLink>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default App;
