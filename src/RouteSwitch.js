import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./pages/App";
import CreateAccount from "./pages/CreateAccount";
import ManagerHome from './pages/Manager/ManagerHome';
import EmployeeManager from './pages/Manager/EmployeeManager';
import ScheduleManager from './pages/Manager/ScheduleManager';
import ManagerAccountSettings from './pages/Manager/ManagerAccountSettings';
import EmployeeHome from "./pages/Employee/EmployeeHome";

const RouteSwitch = () => {

  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/CreateAccount/" element={<CreateAccount/>} />
        <Route path="/mgr">
            <Route path="" element={<ManagerHome/>} />
            <Route path="employees" element={<EmployeeManager/>} />
            <Route path="scheduler" element={<ScheduleManager/>} />
            <Route path="settings" element={<ManagerAccountSettings/>} />
        </Route>
        <Route path="/emp">
            <Route path="" element={<EmployeeHome/>} />
            <Route path="schedule" element={<ScheduleManager/>} />
            {/* <Route path="request" element={</>} />
            <Route path="settings" element={</>} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;

