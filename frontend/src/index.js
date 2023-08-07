import React from "react";
import ReactDOM from "react-dom/client";
import RouteSwitch from "./RouteSwitch";
import "./styles/index.css";
import { Notifications } from "@mantine/notifications";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Notifications />
    <RouteSwitch />
  </React.StrictMode>
);
