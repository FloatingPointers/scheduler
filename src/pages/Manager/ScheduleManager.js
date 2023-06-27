import React, { useState, useEffect } from "react";
import ManagerNavbar from '../../components/manager-components/ManagerNavbar';
import '../../styles/manager.css';
import HourlyView from "../../components/manager-components/scheduler-components/HourlyView";



function ScheduleManager() {


  //Format type
  let [info, setInfo] = useState({
      _id: "ObjectId",
      storeId: "ObjectId", // References the store the schedule belongs to
      employeeId: "ObjectId", // References the employee the schedule belongs to (optional)
      weekStartDate: "Date",
      shifts: [
        {
          date:"YYYY-MM-DD",
          dayOfWeek: 0, // 0-6 representing Sunday-Saturday
          startTime: "HH:MM",
          endTime: "Date"
        },
        // Other shift-related fields
      ]
  });
  
  let shiftInfo = info.shifts[0];

  //Setting the start and end time for a shift using any approach
  const [currentShift, setCurrentShift] = useState({
    employee: "",
    start: "",
    end: ""
  }); 

  const setShiftTimes = () => {
    setCurrentShift({
      ...currentShift,
      start: new Date()
    });
  }

  //NEEDS  MULTIPLE COMPONENT BREAKDOWN
  return (

    <div className="manager-body">
      <ManagerNavbar />
      <p>Schedule Manager Page</p>
      <HourlyView shiftInfo={shiftInfo} />
    </div>

  );

}

export default ScheduleManager;