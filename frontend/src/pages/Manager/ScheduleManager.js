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
    setEmployees({
      ...employees,
      available: available,
    });
  }

  function setAllEmployees(all) {
    setEmployees({
      ...employees,
      all: all,
    });
  }

  function setWorkingEmployees(working) {
    setEmployees({
      ...employees,
      working: working,
    });
  }

  const [dayInfo, setDayInfo] = useState({});

  const getAllEmployees = async () => {
    try {
      const res = await axiosInstance.get(
        "scheduler/editor/employee/allEmployees"
      );
      if (res.data.error) {
        console.log("ERROR:", res.data.error);
      } else {
        setAllEmployees(res.data);
      }
    } catch (err) {
      console.error("ERROR: EDITOR CANNOT GET ALL EMPLOYEES, ", err);
    }
  };

  const getWorkingEmployees = async () => {
    try {
      const res = axiosInstance.get(`scheduler/editor/${id}/working`);
      if (res.data.error) {
        console.log("ERROR:", res.data.error);
      } else {
        setWorkingEmployees(res.data);
      }
    } catch (err) {
      console.error("ERROR: EDITOR CANNOT GET WORKING EMPLOYEES, ", err);
    }
  };

  const getDayInfo = async () => {
    try {
      const res = await axiosInstance.get(`scheduler/editor/${id}/info/${day}`); //wowie
      if (res.data.error) {
        console.log("ERROR:", res.data.error);
      } else {
        setDayInfo(res.data);
      }
    } catch (err) {
      console.error("ERROR: EDITOR CANNOT GET WORKING EMPLOYEES, ", err);
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
        console.log(res.data);
        setAvailableEmployees(res.data);
      }
    } catch (err) {
      console.error("ERROR: EDITOR CANNOT GET AVAILABLE EMPLOYEES, ", err);
    }
  };

  //Handle page load
  useEffect(() => {
    getDayInfo();
    //setShiftInfo(axiosInstance.get(`scheduler/editor/${id}/info/${day}`));

    getAllEmployees();
  }, []);

  useEffect(() => {
    if (currentShift.startDate && currentShift.endDate) {
      getAvailableEmployees();
    }

    //get working employees

    //let schedule = await axiosInstance.get(`/scheduler/schedule/`);
  }, [currentShift.endDate]);

  //NEEDS MULTIPLE COMPONENT BREAKDOWN
  return (
    <div>
      <ManagerNavbar />

      <div className="flex flex-col justify-start items-center bg-slate-100 w-screen min-h-screen text-lg">
        <HourlyView
          dayInfo={dayInfo}
          currentShift={currentShift}
          setCurrentShift={setCurrentShift}
        />

        <div className="flex flex-row w-full justify-start p-6">
          <div className="scheduler-lower-component">
            <EmployeeSelector
              employees={
                currentShift.startDate && currentShift.endDate
                  ? employees.available
                  : employees.all
              }
              setCurrentShift={setCurrentShift}
            />
          </div>
          <div className="scheduler-lower-component">
            <EditingView
              currentShift={currentShift}
              setCurrentShift={setCurrentShift}
              params={params}
              employees={employees}
              setWorkingEmployees={setWorkingEmployees}
              setAvailableEmployees={setAvailableEmployees}
            />
          </div>
          <div className="scheduler-lower-component">
            <WorkingView
              currentShift={currentShift}
              workingEmployees={employees.working}
              params={params}
              getWorkingEmployees={getWorkingEmployees}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScheduleManager;
