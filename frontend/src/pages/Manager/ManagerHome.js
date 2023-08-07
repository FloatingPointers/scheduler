import React from "react";
import ManagerNavbar from "../../components/manager-components/ManagerNavbar";
import { Button } from "@mantine/core";
import ErrorAlert from "../../components/app-components/NotificationAlerts.js";

import "../../styles/manager.css";

function ManagerHome() {
  return (
    <div className="manager-body">
      <ManagerNavbar />
      <Button
        variant="outline"
        onClick={() => {
          ErrorAlert("The grapes are everywhere! Watch out!.");
        }}
      >
        Show notification
      </Button>
    </div>
  );
}

export default ManagerHome;
