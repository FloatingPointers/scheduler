import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./pages/App";
import CreateAccount from "./pages/CreateAccount";

const RouteSwitch = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/CreateAccount" element={<CreateAccount />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;