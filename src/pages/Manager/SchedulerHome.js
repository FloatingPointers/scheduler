import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import ManagerNavbar from "../../components/manager-components/ManagerNavbar";
import { add, format } from "date-fns";

import { generateDummySchedule } from "../../test/TestingFunctions.js";

import '../../styles/manager.css';



function SchedulerHome() {

  //GET a list of all schedules from the database
  const [schedules, setSchedules] = useState([
    generateDummySchedule(),
    generateDummySchedule(),
    generateDummySchedule(),
  ]);

  //POST: When form is submitted



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