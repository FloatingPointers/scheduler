import React, { useState, useEffect } from "react";
import ManagerNavbar from '../../components/manager-components/ManagerNavbar';
import '../../styles/manager.css';
import { differenceInHours } from 'date-fns'



function ScheduleManager() {
  
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
  let startTime = new Date([shiftInfo.date + "T" + shiftInfo.startTime]);
  let endTime = new Date([shiftInfo.date + "T" + shiftInfo.startTime]);
  
  //NEEDS  MULTIPLE COMPONENT BREAKDOWN
  return (

    <div className="manager-body">
      <ManagerNavbar />
      <p>Schedule Manager Page</p>
      <div className="Hourly">

      </div>
    </div>

  );

}

export default ScheduleManager;