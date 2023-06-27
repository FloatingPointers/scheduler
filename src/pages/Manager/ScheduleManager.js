import React, { useState, useEffect } from "react";
import ManagerNavbar from '../../components/manager-components/ManagerNavbar';
import '../../styles/manager.css';
import HourlyView from "../../components/manager-components/scheduler-components/HourlyView";



function ScheduleManager() {


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
    schedule: [
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
            employeeId: 2,
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
  
  let shiftInfo = info.shiftTimes[0];

  //Setting the start and end time for a shift using any approach
  //Shift currently being edited / created
  const [currentShift, setCurrentShift] = useState({
    employee: "",
    start: "",
    end: ""
  }); 






  //NEEDS  MULTIPLE COMPONENT BREAKDOWN
  return (

    <div className="manager-body">
      <ManagerNavbar />
      <p>Schedule Manager Page</p>
      <HourlyView shiftInfo={shiftInfo} currentShift={currentShift} setCurrentShift={setCurrentShift}/>
    </div>

  );

}

export default ScheduleManager;