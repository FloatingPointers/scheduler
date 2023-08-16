import React, { useState, useEffect } from "react";
import Navbar from "../../components/employee-components/Navbar";
import "../../styles/employee.css";

import ScheduleDisplayTable from "../../components/employee-components/ScheduleDisplayTable";
import axiosInstance from "../../Axios";
import ShiftView from "../../components/employee-components/ShiftView";

function EmployeeSchedule() {
  const [days, setDays] = useState(null);
  const [day, setDay] = useState(null);
  const getStartDay = async () => {
    try {
      const response = await axiosInstance.get(
        `/employeeSchedule/currentSchedule/startDate`
      );
      if (response.error) {
        console.log("Error geting current Schedule");
      } else {
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
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getStartDay();
  }, []);

  return (
    <div className="w-full min-h-screen bg-slate-50">
      <Navbar />

      <div className="flex flex-col">
        {days ? (
          <div>
            <ScheduleDisplayTable />
            <ShiftView days={days} day={day} />
          </div>
        ) : (
          ""
        )}
        <ScheduleDisplayTable />
      </div>
    </div>
  );
}

export default EmployeeSchedule;
