import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./pages/App";
import CreateAccount from "./pages/CreateAccount";
import ManagerHome from './pages/Manager/ManagerHome';
import EmployeeManager from './pages/Manager/EmployeeManager';
import ScheduleManager from './pages/Manager/ScheduleManager';
import ManagerAccountSettings from './pages/Manager/ManagerAccountSettings';
import EmployeeRouter from "./EmployeeRouter";

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
        <Route path="/emp/*" element={<EmployeeRouter/>}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;

