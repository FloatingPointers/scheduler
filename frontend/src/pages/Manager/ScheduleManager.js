import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ManagerNavbar from "../../components/manager-components/ManagerNavbar";
import "../../styles/manager.css";
import HourlyView from "../../components/manager-components/scheduler-components/HourlyView";
import WorkingView from "../../components/manager-components/scheduler-components/WorkingView";
import EmployeeSelector from "../../components/manager-components/scheduler-components/EmployeeSelector";
import EditingView from "../../components/manager-components/scheduler-components/EditingView";

import axiosInstance from "../../Axios";

function ScheduleManager() {
  let params = useParams();

  //Format type
  let [info, setInfo] = useState({
    _id: "ObjectId",
    storeId: "ObjectId", // References the store the schedule belongs to
    weekStartDate: "Date",
    format: [
      {
        date: "2000-01-01",
        dayOfWeek: 0, // 0-6 representing Sunday-Saturday
        startTime: "00:00", //HH:MM
        endTime: "24:00",
        //settings
      },
      // Other shift-related fields
    ],
    day: [
      {
        goalsMet: false,
        markedAsComplete: false,

        shifts: [
          {
            employeeId: 1,
            startTime: "00:00",
            endTime: "05:00",
          },
          {
            employeeId: 3,
            startTime: "05:00",
            endTime: "12:00",
          },
        ],
        totalHours: 13,
        totalCost: 4000,
      },
      {
        goalsMet: false,
        markedAsComplete: false,

        shifts: [
          {
            employeeId: 1,
            startTime: "05:00",
            endTime: "14:00",
          },
        ],
      },
    ],
  });

  let shiftInfo = info.format[0];

  //Setting the start and end time for a shift using any approach
  //Shift currently being edited / created
  const [currentShift, setCurrentShift] = useState({
    employee: "",
    employeeID: -1,
    start: "",
    end: "",
  });

  //Handle page load
  useEffect(() => {
    //let schedule = await axiosInstance.get(`/scheduler/schedule/`);
  }, []);

  //NEEDS MULTIPLE COMPONENT BREAKDOWN
  return (
    <div>
      <ManagerNavbar />

      <div className="flex flex-col justify-start items-center bg-slate-100 w-screen min-h-screen text-lg">
        <HourlyView
          shiftInfo={shiftInfo}
          currentShift={currentShift}
          setCurrentShift={setCurrentShift}
        />

        <div className="flex flex-row w-full justify-start p-6">
          <div className="scheduler-lower-component">
            <EmployeeSelector
              currentShift={currentShift}
              setCurrentShift={setCurrentShift}
            />
          </div>
          <div className="scheduler-lower-component">
            <EditingView
              currentShift={currentShift}
              setCurrentShift={setCurrentShift}
            />
          </div>
          <div className="scheduler-lower-component">
            <WorkingView />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScheduleManager;
