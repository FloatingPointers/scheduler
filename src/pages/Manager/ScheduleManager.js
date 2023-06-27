import React, { useState, useEffect } from "react";
import ManagerNavbar from '../../components/manager-components/ManagerNavbar';
import '../../styles/manager.css';



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

  //NEEDS  MULTIPLE COMPONENT BREAKDOWN
  return (

    <div className="manager-body">
      <ManagerNavbar />
      <p>Schedule Manager Page</p>
    </div>

  );

}

export default ScheduleManager;