import React, { useEffect, useState } from "react";
import Navbar from "../../components/employee-components/Navbar";
import { Tabs } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, TextInput } from "@mantine/core";
import "../../styles/employee.css";
import axiosInstance from "../../Axios";
import Request from "../../components/app-components/Request";
import RequestTable from "./RequestsTable";

function ManagerRequests() {
  const [pendingReqs, setPendingReqs] = useState([]);
  const [closedReqs, setClosedReqs] = useState([]);
  const [page, setPage] = useState([]);

  const getRequests = async (update = false) => {
    try {
      if (pendingReqs.length !== 0 && !update) {
        return;
      }
      const res = await axiosInstance.get("/managerRequests/request/0/true");
      setPendingReqs(res.data);
    } catch (err) {
      console.log("Error:", err);
    }
  };
  const getArchived = async () => {
    try {
      if (closedReqs.length !== 0) {
        return;
      }
      const res = await axiosInstance.get("/managerRequests/request/0/false");
      setClosedReqs(res.data);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const setRequest = () => {};

  useEffect((activeRequests, archived) => {
    getRequests();
    getArchived();
  }, []);

  return (
    <div className="flex justify-center w-screen bg-slate-100">
      <Tabs defaultValue="pending-requests" className="mt-4 w-10/12">
        <Tabs.List>
          <Tabs.Tab value="pending-requests" color="blue">
            Pending Requests
          </Tabs.Tab>
          <Tabs.Tab value="closed-requests" color="red">
            Closed Requests
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="pending-requests">
          <RequestTable display={pendingReqs} pending={true} />
        </Tabs.Panel>

        <Tabs.Panel value="closed-requests">
          <RequestTable display={closedReqs} pending={false} />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
}

export default ManagerRequests;
