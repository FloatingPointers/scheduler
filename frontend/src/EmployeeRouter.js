import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmployeeHome from "./pages/Employee/EmployeeHome";
import EmployeeRequests from "./pages/Employee/EmployeeRequests";
import EmployeeSchedule from "./pages/Employee/EmployeeSchedule";
import EmployeeSettings from "./pages/Employee/EmployeeSettings";
import Navbar from "./components/employee-components/Navbar";
import { Container } from "react-bootstrap";

import "./styles/employee.css";

const EmployeeRouter = () => {
  return (
    <Container style={{ margin: "0px" }}>
      <Routes>
        <Route path="/" element={<EmployeeHome />} />
        <Route path="/request" element={<EmployeeRequests />} />
        <Route path="/schedule" element={<EmployeeSchedule />} />
        <Route path="/settings" element={<EmployeeSettings />} />
      </Routes>
    </Container>
  );
};

export default EmployeeRouter;
