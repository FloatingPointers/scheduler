import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import ManagerNavbar from "../../components/manager-components/ManagerNavbar";
import { add, format } from "date-fns";


import '../../styles/manager.css';


//Generates a fake 7-day schedule for testing
function generateDummySchedule() {

  return ({
    _id: "schedule_id_placeholder_" + Math.floor(Math.random() * 100),
    storeId: "store_id_placeholder", // References the store the schedule belongs to
    weekStartDate: "2000-01-" + ((Math.floor(Math.random() * 3) * 7) + 1),
    goalsMet: Math.random() > 0.5,
    markedAsComplete: Math.random() > 0.5,
    format: [
      {
        date: "2000-01-01", //What is this used for????
        dayOfWeek: 0, // 0-6 representing Sunday-Saturday
        startTime: "00:00", //HH:MM
        endTime: "24:00",
        //settings
      },
      // Other shift-related fields
    ],
    day: [
      generateDummyDay(),
      generateDummyDay(),
      generateDummyDay(),
      generateDummyDay(),
      generateDummyDay(),
      generateDummyDay(),
      generateDummyDay(),
    ],
  });

}

//Generates a fake 1-day portion of a schedule for testing
function generateDummyDay() {

  let hrs = Math.floor(Math.random() * 10)
  let emp_latest_start_time = 24 - hrs - 1;
  let emp_start_time = Math.floor(Math.random() * emp_latest_start_time);

  return(      
    {
      goalsMet: Math.random() > 0.5,
      markedAsComplete: Math.random() > 0.5,
      totalHours: hrs,
      totalCost: (hrs * 15),

      shifts: [
        {
          employeeId: Math.floor(Math.random() * 3),
          startTime: emp_start_time + ":00",
          endTime: (emp_start_time+hrs) + ":00",
        },
      ],
    }
  );

}



function SchedulerHome() {

  //GET a list of all schedules from the database
  const [schedules, setSchedules] = useState([
    generateDummySchedule(),
    generateDummySchedule(),
    generateDummySchedule(),
  ]);



  //Find the next few dates that any new schedules should start on (for the schedule creator)
  let nextScheduleDates = [];
  let lastStartDate = new Date(schedules[0].weekStartDate);

  for(let i = 0; i < 3; i++) {
    lastStartDate = add(lastStartDate, { days: 7 });
    nextScheduleDates.push(lastStartDate);
  }



  return(
    <div className="manager-body">
      <ManagerNavbar />
      <p>Scheduler Home</p>
      <ul className="all-schedules-overview">
        <li>
          <label htmlFor="schedule-start-date">Start Date: </label>
          <select name="schedule-start-date" id="schedule-start-date" form="create-schedule-form">
            {
              nextScheduleDates.map((date) => 
                <option value={date}>{format(date, "yyyy-MM-dd")}</option>
              )
            }
          </select>

          <form id="create-schedule-form">
            <button type="submit">Create Schedule</button>
            
          </form>


        </li>
      {
        schedules.map((schedule) => {

          let completionContent; 
          if(schedule.markedAsComplete) completionContent = ( <p>Yes</p> );
          else completionContent = ( <p>No</p> );

          let issuesContent;
          if(!schedule.goalsMet) issuesContent = ( <p>Issues Present</p> );

          return (
            <li>
              <NavLink key={"schedule-id:" + schedule._id} to={"/mgr/scheduler/daily?scheduleId=" + schedule._id}>{schedule.weekStartDate}</NavLink>
              <div className="schedule-status">
                <p>Completed: </p>
                {completionContent}
              </div>
              <div className="schedule-status">
                {issuesContent}
              </div>
            </li>
          );
        })
      }
      </ul>
    </div>
  );

}


export default SchedulerHome;