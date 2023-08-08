import React, { useEffect, useState, useRef } from "react";
import { Button, Notification, Loader } from "@mantine/core";
import axiosInstance from "../../Axios";
import { SuccessAlert } from "../app-components/NotificationAlerts";

function InviteCode() {
  const [notify, setNotify] = useState(false);
  const [inviteCode, setInviteCode] = useState("111111");
  const lastRefresh = useRef(Date.now());
  const [disabled, setDisabled] = useState(false);

  const handleInviteCodeClick = () => {
    navigator.clipboard.writeText(inviteCode);
    setNotify(true);
    SuccessAlert("Copied to clipboard");
  };

  const handleRefreshInviteCode = () => {
    axiosInstance.get("/invite/store/new-invite-code").then((res) => {
      setInviteCode(res.data.inviteCode);
      lastRefresh.current = Date.now();
      setDisabled(true);
      setTimeout(() => setDisabled(false), 5000);
    });
  };

  useEffect(() => {
    axiosInstance.get("/invite/store/invite-code").then((res) => {
      setInviteCode(res.data.inviteCode);
    });
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center gap-2">
      <p className="text-xl">
        Your invite code:{" "}
        <b
          className="hover:text-blue-700 hover:bg-blue-100 hover:cursor-pointer"
          onClick={handleInviteCodeClick}
        >
          {inviteCode}
        </b>
      </p>

      <button
        className="bg-slate-300 w-28 h-9 px-3 py-1 rounded shadow-sm hover:bg-slate-400 items-center flex justify-center hover:shadow-md transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed text-center "
        onClick={handleRefreshInviteCode}
        disabled={disabled}
      >
        {" "}
        {disabled ? (
          <div className="flex gap-1">
            <Loader size={"md"} variant="dots" />{" "}
            <Loader size={"md"} variant="dots" />{" "}
            <Loader size={"md"} variant="dots" />
          </div>
        ) : (
          "New Code"
        )}{" "}
      </button>
    </div>
  );
}
export default InviteCode;
