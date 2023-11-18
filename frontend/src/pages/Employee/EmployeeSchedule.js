import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/employee-components/Navbar";
import "../../styles/employee.css";

import ScheduleDisplayTable from "../../components/employee-components/ScheduleDisplayTable";
import axiosInstance from "../../Axios";
import ShiftView from "../../components/employee-components/ShiftView";

function EmployeeSchedule() {
  const params = useParams();

  const [days, setDays] = useState(null);
  const [day, setDay] = useState(null);
  const [shifts, setShifts] = useState([
    {
      employee: "John Doe",
      times: [
        { startTime: new Date(), endTime: new Date() },
        {},
        {},
        {},
        {},
        {},
        {},
      ],
    },
  ]);

  const [id, setId] = useState(
    new URLSearchParams(window.location.search).get("id")
  );

  const getCurrentSchedule = async () => {
    try {
      const response = await axiosInstance.get(
        `/employeeSchedule/schedule/currentSchedule`
      );
      if (response.error) {
        console.error("Error getting current Schedule");
        return;
      }

      console.log("Current schedule id: ", response.data.result);
      setId(response.data.result);
    } catch (error) {
      console.error("error", error);
    }
  };

  //Get shifts from backend
  const getShifts = async () => {
    if (!params.id) {
      console.error(
        "Failed to get shifts for current schedule: the current schedule was not found / doesn't exist"
      );
      return;
    }

    try {
      let response = await axiosInstance.get(
        `/employeeSchedule/schedule/${params.id}/employeeDisplay`
      );

      if (response.data.error) {
        console.log(
          "Received error when requesting schedule info",
          response.data.error
        );
        return;
      }

      setShifts(response.data.result.shifts);
    } catch (err) {
      console.error("Error getting shifts", err);
    }
  };

  const getStartDay = async () => {
    try {
      const response = await axiosInstance.get(
        `/employeeSchedule/schedule/${id}/startDate/0`
      );
      if (response.error) {
        console.log("Error geting current Schedule: ", response.error);
      }

      const startDate = new Date(response.data.result);
      const dayOfWeek = startDate.getDay();
      const allDays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      setDays([...allDays.slice(dayOfWeek), ...allDays.slice(0, dayOfWeek)]);
      setDay(dayOfWeek);
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    async function getSchedule() {
      if (!id) {
        await getCurrentSchedule();
        console.log("Current schedule id: ", id);
      }
      getStartDay();
      getShifts();
    }
    getSchedule();
  }, []);

  return (
    <div className="w-full min-h-screen bg-slate-50">
      <Navbar />

      <div className="flex flex-col">
        {days ? (
          <div>
            <ScheduleDisplayTable shifts={shifts} />
            <ShiftView id={id} startDay={day} />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default EmployeeSchedule;
