import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateAccount from './pages/CreateAccount';
import ManagerPage from './pages/ManagerPage';
import EmployeeManagerPage from './pages/EmployeeManagerPage';
import ScheduleManagerPage from './pages/ScheduleManagerPage';
import ManagerAccountSettingsPage from './pages/ManagerAccountSettingsPage';
import App from './pages/App';

import "./styles/index.css"



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/CreateAccount/" element={<CreateAccount/>} />
      <Route path="/mgr/" element={<ManagerPage/>}/>
      <Route path="/mgr/employees/" element={<EmployeeManagerPage/>} />
      <Route path="/mgr/scheduler/" element={<ScheduleManagerPage/>} />
      <Route path="/mgr/settings/" element={<ManagerAccountSettingsPage/>} />
    </Routes>
  </BrowserRouter>
);

