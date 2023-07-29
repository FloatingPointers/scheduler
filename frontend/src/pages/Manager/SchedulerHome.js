import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import ManagerNavbar from "../../components/manager-components/ManagerNavbar";
import { add, format } from "date-fns";
import { IoMdCheckmark, IoMdAlarm } from "react-icons/io";

import { generateDummySchedule } from "../../test/TestingFunctions.js";




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
    <div>
    <ManagerNavbar />
    <div className="flex flex-col justify-start items-center bg-slate-100 w-screen h-screen text-lg">
      
      <h1 className="text-3xl font-semibold pt-8">Your Schedules</h1>


      <ul className="px-16 py-8 w-full flex flex-row justify-start gap-12">

        <li className="bg-slate-50 border border-slate-300 rounded-md shadow-md">
          <div className="w-full h-1/4 flex flex-row gap-4 p-4 bg-blue-100 justify-center items-center">
            <p className="font-semibold">Schedule Creation</p>
          </div>

          <form name="create-schedule-form" className="p-4 flex flex-col gap-6 w-full h-full">
            <div className="inline-flex flex-col">
              <label htmlFor="schedule-start-date" className="px-1">Start Date </label>
              <select name="schedule-start-date" id="schedule-start-date" form="create-schedule-form" className="p-1 bg-slate-200 rounded font-light">
                {
                  nextScheduleDates.map((date) => 
                    <option value={date}>{format(date, "yyyy-MM-dd")}</option>
                  )
                }
              </select>
            </div>

            <button type="submit" className="bg-blue-200 shadow-sm rounded p-1 hover:bg-blue-100 transition-colors">Create Schedule</button>

          </form>
        </li>
      {
        schedules.map((schedule) => {

          let issuesContent;
          if(!schedule.goalsMet) issuesContent = ( <p>Issues Present</p> );

          return (
            <NavLink key={"schedule-id:" + schedule._id} to={"/mgr/scheduler/daily?scheduleId=" + schedule._id} className="bg-slate-50 border border-slate-300 rounded-md shadow-md hover:-translate-y-2 transition-all">
              <li className="">
                <div className="w-full h-1/4 inline-flex flex-row gap-4 p-4 bg-blue-100 justify-center items-center">
                  
                  <p className="font-semibold">{schedule.weekStartDate}</p>
                  
                  {
                    schedule.markedAsComplete ? (
                      <IoMdCheckmark className="text-2xl" />
                    ) : (<div />)
                  }
                  {
                    schedule.goalsMet ? (
                      <IoMdAlarm className="text-2xl" />
                    ) : (<div />)
                  }
                </div>

                <div className="p-4 w-full">
                  {
                    schedule.markedAsComplete ? (
                      <p>Completed</p>
                    ) : (
                      <p>Not Completed</p>
                    )
                  }
                  {
                    schedule.goalsMet ? (
                      <div>
                        Schedule Issues Here
                      </div>
                    ) : (<div />)
                  }
                </div>
              </li>
            </NavLink>
          );
        })
      }
      </ul>
    </div>
    </div>
  );

}


export default SchedulerHome;