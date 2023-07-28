import React from "react";
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import App from "./pages/App";
import CreateStoreAccount from "./pages/CreateStoreAccount";
import CreateEmployeeAccount from "./pages/CreateEmployeeAccount";
import ManagerHome from './pages/Manager/ManagerHome';
import EmployeeManager from './pages/Manager/EmployeeManager';
import ScheduleManager from './pages/Manager/ScheduleManager';
import ManagerAccountSettings from './pages/Manager/ManagerAccountSettings';

import SchedulerHome from "./pages/Manager/SchedulerHome";
import DailyView from "./pages/Manager/DailyView";
import EmployeeHome from "./pages/Employee/EmployeeHome";
import EmployeeRequests from "./pages/Employee/EmployeeRequests";
import EmployeeSchedule from "./pages/Employee/EmployeeSchedule";
import EmployeeSettings from "./pages/Employee/EmployeeSettings";
import ForgotPassword from "./pages/ForgotPassword";
import ChangePassword from "./pages/ChangePassword";


//Checks the type of account that the user is currently signed in to,
// and reroutes them if they tried to access a page they shouldn't have
function RoleAccess( props ) {
  const { role } = props;
  const localrole = localStorage.getItem("role");

  if(localrole === 'DEV') return <Outlet />;

  //If the user is trying to access the log in page, but is already logged in
  //  reroute them to the proper home page
  if(!role) {
    if(localrole === "EMPLOYEE") return <Navigate to="/emp" replace />;
    else if (localrole === "STORE") return <Navigate to="/mgr" replace />
    else return <Outlet />
  } 

  //Otherwise check if they have access to this page, and reroute them if they dont

  if(role && role !== localrole) {
    window.alert("Unauthorized Page Access");
    return <Navigate to="/" replace />;
  } else {
    return <Outlet />;
  }
};

const RouteSwitch = () => {

  localStorage.setItem('role', 'DEV');

  
  return (
    <BrowserRouter>
      <Routes>
        
        {/* //Accessible only if not signed in */}
        <Route path="/" element={<RoleAccess role="" />} >
          <Route path="" element={<App />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/changePassword" element={<ChangePassword />} />
          <Route path="/CreateStoreAccount" element={<CreateStoreAccount/>} />
          <Route path="/CreateEmployeeAccount" element={<CreateEmployeeAccount />} />
        </Route>

        {/* //Accessible only if signed in as manager */}
        <Route path="/mgr" element={<RoleAccess role="STORE"/>}>
          <Route path="" element={<ManagerHome/>} />
          <Route path="employees" element={<EmployeeManager/>} />
          <Route path="scheduler">
            <Route path="" element={<ScheduleManager />} />
            <Route path="home" element={<SchedulerHome />} />
            <Route path="daily" element={<DailyView />} />
          </Route>
          <Route path="settings" element={<ManagerAccountSettings/>} />
        </Route>


        {/* //Accessible only if signed in as employee */}
        <Route path="/emp" element={<RoleAccess role="EMPLOYEE"/>} >
          <Route path="" element={<EmployeeHome />}/>
          <Route path="request" element={<EmployeeRequests />} />
          <Route path="schedule" element={<EmployeeSchedule />} />
          <Route path="settings" element={<EmployeeSettings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;

