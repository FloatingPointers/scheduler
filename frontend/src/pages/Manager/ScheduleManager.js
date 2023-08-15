import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ManagerNavbar from "../../components/manager-components/ManagerNavbar";
import "../../styles/manager.css";
import HourlyView from "../../components/manager-components/scheduler-components/HourlyView";
import WorkingView from "../../components/manager-components/scheduler-components/WorkingView";
import EmployeeSelector from "../../components/manager-components/scheduler-components/EmployeeSelector";
import EditingView from "../../components/manager-components/scheduler-components/EditingView";
import { ErrorAlert } from "../../components/app-components/NotificationAlerts";

import axiosInstance from "../../Axios";

function ScheduleManager() {
  let params = useParams();
  const { id, day } = params;

  //Setting the start and end time for a shift using any approach
  //Shift currently being edited / created
  const [currentShift, setCurrentShift] = useState({
    employee: "",
    employeeId: -1,
    start: "",
    end: "",
    startDate: null,
    endDate: null,
  });

  const [employees, setEmployees] = useState({
    available: [],
    working: [],
    all: [],
  });

  function setAvailableEmployees(available) {
    setEmployees((prevEmployees) => ({
      ...prevEmployees,
      available,
    }));
  }

  function setAllEmployees(all) {
    setEmployees((prevEmployees) => ({
      ...prevEmployees,
      all,
    }));
  }

  function setWorkingEmployees(working) {
    setEmployees((prevEmployees) => ({
      ...prevEmployees,
      working,
    }));
  }

  const [dayInfo, setDayInfo] = useState({});

  const getAllEmployees = async () => {
    try {
      const res = await axiosInstance.get(
        "scheduler/editor/employee/allEmployees"
      );
      const { error, result } = res.data;

      if (error) {
        console.log("ERROR:", error);
      } else {
        setAllEmployees(result);
      }
    } catch (err) {
      console.error("ERROR: EDITOR CANNOT GET ALL EMPLOYEES, ", err);
    }
  };

  const getWorkingEmployees = async () => {
    try {
      const res = await axiosInstance.get(
        `scheduler/editor/schedule/${id}/working`
      );
      if (res.data.error) {
        console.log("ERROR:", res.data.error);
      } else {
        setWorkingEmployees(res.data.result);
      }
    } catch (err) {
      console.error("ERROR: EDITOR CANNOT GET WORKING EMPLOYEES, ", err);
    }
  };

  const getDayInfo = async () => {
    try {
      const res = await axiosInstance.get(
        `scheduler/editor/schedule/${id}/info/${day}`
      ); //wowie
      if (res.data.error) {
        console.log("ERROR:", res.data.error);
      } else {
        setDayInfo(res.data);
      }
    } catch (err) {
      console.error("ERROR: EDITOR CANNOT GET SCHEDULE DAY INFO, ", err);
    }
  };

  const getAvailableEmployees = async () => {
    try {
      const res = await axiosInstance.get(
        `scheduler/editor/employee/available/${day}/${currentShift.startDate.toISOString()}/${currentShift.endDate.toISOString()}`
      );
      if (res.data.error) {
        console.log("ERROR:", res.data.error);
      } else {
        setAvailableEmployees(res.data);
      }
    } catch (err) {
      console.error("ERROR: EDITOR CANNOT GET AVAILABLE EMPLOYEES, ", err);
    }
  };

  //Handle page load
  useEffect(() => {
    getDayInfo();
    getAllEmployees();
  }, []);

  useEffect(() => {
    if (currentShift.startDate && currentShift.endDate) {
      getAvailableEmployees();
    }

    //get working employees
    getWorkingEmployees();
  }, [currentShift.endDate]);

  return (
    <div className="bg-slate-100 w-full min-h-screen">
      <ManagerNavbar />

      <div className="flex flex-col justify-start items-center w-full h-full text-lg">
        <HourlyView
          dayInfo={dayInfo}
          currentShift={currentShift}
          setCurrentShift={setCurrentShift}
        />

        <div className="flex flex-row justify-center items-start p-10 w-full h-full gap-4">
          <EmployeeSelector
            employees={
              currentShift.startDate && currentShift.endDate
                ? employees.available
                : employees.all
            }
            dayIndex={day}
            setCurrentShift={setCurrentShift}
          />
          <EditingView
            currentShift={currentShift}
            setCurrentShift={setCurrentShift}
            params={params}
            employees={employees}
            setWorkingEmployees={setWorkingEmployees}
            setAvailableEmployees={setAvailableEmployees}
            getWorkingEmployees={getWorkingEmployees}
            getAvailableEmployees={getAvailableEmployees}
          />
          <WorkingView
            currentShift={currentShift}
            workingEmployees={employees.working}
            params={params}
            getWorkingEmployees={getWorkingEmployees}
          />
        </div>
      </div>
    </div>
  );
}

export default ScheduleManager;
