import React, { useEffect, useState } from "react";
import Navbar from "../../components/employee-components/Navbar";
import { Tabs } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, TextInput } from "@mantine/core";
import "../../styles/employee.css";
import axiosInstance from "../../Axios";
import Request from "../../components/app-components/Request";
import RequestTable from "./RequestsTable";
import { IoMdCheckmark, IoMdClose } from "react-icons/io";

function ManagerRequests() {
  const [pending, setPending] = useState({
    requests: [],
    page: 0,
    maxRequests: 999,
  });

  const [closed, setClosed] = useState({
    requests: [],
    page: 0,
    maxRequests: 999,
  });

  //how to use:
  //updateState(setPending, "requests", res.data);
  const updateState = (stateSetter, property, value) => {
    stateSetter((prev) => ({ ...prev, [property]: value }));
  };

  const [showPending, setShowPending] = useState(true);

  const getPending = async (update = false) => {
    try {
      if (pending.requests.length !== 0 && !update) {
        return;
      }
      const res = await axiosInstance.get(
        `/managerRequests/request/get/${pending.page}/true`
      );
      updateState(setPending, "requests", res.data);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const getClosed = async (update = false) => {
    try {
      if (closed.requests.length !== 0 && !update) {
        return;
      }
      const res = await axiosInstance.get(
        `/managerRequests/request/get/${closed.page}/false`
      );
      updateState(setClosed, "requests", res.data);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const setStatus = async (id, word) => {
    try {
      let status;
      if (word === "approve") {
        status = "APPROVED";
      } else if (word === "deny") {
        status = "DENIED";
      } else {
        console.log("ERROR: INVALID WORD FOR SET REQUEST STATUS " + word);
      }
      const res = await axiosInstance.put(
        `/managerRequests/request/update/${id}`,
        { status }
      );
      getPending(true);
      getClosed(true);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const getMaxReqs = async (isPending) => {
    try {
      const res = await axiosInstance.get(
        `/managerRequests/request/maxReqs/${isPending}`
      );
      console.log("pages " + isPending + " requests: " + res.data.maxRequests);
      updateState(
        isPending ? setPending : setClosed,
        "maxRequests",
        res.data.maxRequests
      );
    } catch (err) {
      console.log("Error:", err);
    }
  };

  useEffect(() => {
    getClosed(true);
  }, [closed.page]);

  useEffect(() => {
    getPending(true);
  }, [pending.page]);

  useEffect(() => {
    getPending();
    getClosed();
    getMaxReqs(true);
    getMaxReqs(false);
  }, []);

  return (
    <div className="w-full px-16 pt-8 pb-16">
      <div className="w-full bg-slate-50 border border-slate-200 rounded shadow-md p-6">
        <div className="flex flex-row w-full items-center justify-between space-between">
          <div className="flex flex-row gap-6">
            <h2
              className={
                "text-2xl cursor-pointer " +
                (showPending ? "font-semibold" : "")
              }
              onClick={() => {
                console.log("showing pending");
                setShowPending(true);
              }}
            >
              Pending
            </h2>
            <h2
              className={
                "text-2xl cursor-pointer " +
                (showPending ? "" : "font-semibold")
              }
              onClick={() => {
                console.log("showing not pending");
                setShowPending(false);
              }}
            >
              Closed
            </h2>
          </div>
          <p>Page {showPending ? pending.page + 1 : closed.page + 1}</p>
        </div>

        <hr className="h-px bg-slate-200 border-0 mt-6 mb-6"></hr>

        <RequestTable
          display={showPending ? pending.requests : closed.requests}
          pending={showPending}
          setStatus={setStatus}
        />

        <div className="flex w-full flex-row justify-center items-center gap-4 pt-6">
          {(showPending && pending.page > 0) ||
          (!showPending && closed.page > 0) ? (
            <button
              className="bg-blue-200 shadow-sm rounded px-2 py-1 hover:bg-blue-100 transition-colors m-2"
              onClick={() => {
                if (showPending) {
                  updateState(setPending, "page", pending.page - 1);
                } else {
                  updateState(setClosed, "page", closed.page - 1);
                }
              }}
            >
              Prev Page
            </button>
          ) : (
            ""
          )}
          {(showPending &&
            pending.page < Math.ceil(pending.maxRequests / 10) - 1) ||
          (!showPending &&
            closed.page < Math.ceil(closed.maxRequests / 10) - 1) ? (
            <button
              className="bg-blue-200 shadow-sm rounded px-2 py-1 hover:bg-blue-100 transition-colors m-2"
              onClick={() => {
                if (showPending) {
                  updateState(setPending, "page", pending.page + 1);
                } else {
                  updateState(setClosed, "page", closed.page + 1);
                }
              }}
            >
              Next Page
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default ManagerRequests;
