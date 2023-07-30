import React, {useEffect, useState} from "react";
import { NavLink } from "react-router-dom";
import ManagerNavbar from "../../components/manager-components/ManagerNavbar";
import { add, format } from "date-fns";
import { IoMdCheckmark, IoMdAlarm, IoMdClipboard, IoMdDownload, IoIosArchive } from "react-icons/io";
import { Modal } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import axiosInstance from "../../Axios";

import { generateDummySchedule } from "../../test/TestingFunctions.js";




function SchedulerHome() {

  //GET a list of all schedules from the database
  const [schedules, setSchedules] = useState([
    generateDummySchedule(),
    generateDummySchedule(),
    generateDummySchedule(),
  ]);

  //The next few schedule start dates (get from db)
  const [nextScheduleStartDates, setNextScheduleStartDates] = useState([]);

  useEffect(() => {

    //Get list of recent schedules
    
    //Get list of next few dates to create a schedule
    
    /*nextScheduleStartDay = new Date();
    let dayOfWeek = nextScheduleStartDay.getDate() % 7;
    nextScheduleStartDay.setDate((new Date().getDate() / 7) * 7 + dayOfWeek)
    
    let lastStartDate = nextScheduleStartDay;
    for(let i = 0; i < 3; i++) {
      lastStartDate = add(lastStartDate, { days: 7 });
      nextScheduleDates.push(lastStartDate);
    }*/
  }, []);

  const [opened, {open, close}] = useDisclosure(false);


  const handleCreateSchedule = (event) => {
    event.preventDefault();
    close();
  }

  const handleDownloadSchedule = (event) => {

  }

  const handleArchiveSchedule = (event) => {

  }







  return(
    <div>

      <Modal opened={opened} onClose={close} title="New Schedule" classNames={{ header: "h-1/4 gap-4 p-4 bg-blue-100", title: "text-xl font-semibold"}}> 
        <form name="create-schedule-form" onSubmit={handleCreateSchedule} className="p-4 flex flex-col gap-6">
          <div className="flex flex-col shrink">
            <label htmlFor="schedule-start-date" className="">Start Date </label>
            <select required name="schedule-start-date" id="schedule-start-date" form="create-schedule-form" className="p-1 bg-slate-200 rounded font-light">
              {
                nextScheduleStartDates.map((date) => 
                  <option value={date}>{format(date, "MMMM dd")}</option>
                )
              }
            </select>
          </div>

          <button type="submit" className="bg-blue-200 shadow-sm rounded p-1 hover:bg-blue-100 transition-colors">Create Schedule</button>

        </form>
      </Modal>

      <ManagerNavbar />
      <div className="flex flex-col justify-start items-center bg-slate-100 w-screen h-screen text-lg">
        
        <h1 className="text-3xl font-semibold pt-8">Recent Schedules</h1>


        <ul className="px-16 py-8 w-full flex flex-row justify-center items-stretch gap-12">
          {
            schedules.map((schedule) => {

              return (
                <NavLink key={"schedule-id:" + schedule._id} to={"/mgr/scheduler/daily?scheduleId=" + schedule._id} className="bg-slate-50 border border-slate-300 rounded-md shadow-md hover:-translate-y-2 transition-all">
                  <li className="">
                    <div className="w-full h-1/4 inline-flex flex-row gap-4 p-4 bg-blue-100 justify-center items-center">
                      
                      <p className="font-semibold">{format(new Date(schedule.weekStartDate), "MMMM dd")}</p>
                      
                      {
                        schedule.markedAsComplete ? (
                          <IoMdCheckmark className="text-2xl" />
                        ) : (<div />)
                      }
                      {
                        schedule.goalsMet ? (
                          <div />
                        ) : (<IoMdAlarm className="text-2xl" />)
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
                        schedule.goalsMet ? ( <div/> ) : (
                          <div>Schedule Issues Here</div>
                        )
                      }
                    </div>
                  </li>
                </NavLink>
              );
            })
          }


          <li className="">
            <div onClick={open} className="flex flex-col border border-slate-300 shadow-md rounded w-full h-full px-20 justify-center items-center hover:-translate-y-2 transition-all cursor-pointer">
              <p className="text-4xl">+</p>
            </div>
          </li>
        </ul>


        <div className="w-full px-16 pt-8">
          <div className="w-full bg-slate-50 border border-slate-200 rounded shadow-md">
            
            <h2 className="font-semibold text-2xl pt-6 pl-6">All Schedules</h2>
            <hr class="h-px bg-slate-200 border-0 m-6"></hr>

            <table className="px-6 pb-6 block w-full">
              <thead className=''> 
                <tr className='text-xl'>
                  <th className="w-1/5 text-left font-semibold pl-4">Start Date</th>
                  <th className='w-[1%] text-left font-semibold'>Status</th>
                  <th className="w-1/2 text-left font-semibold"></th>
                  <th className='w-[1%] text-left font-semibold'>Options</th>
                </tr>
              </thead>
              <tbody className='w-full text-md'>
                { schedules.map((schedule, index) => (
                  <tr key={schedule._id} className={ index % 2 === 0 ? ("bg-slate-100") : ("")}>
                    <td className="pl-4 py-1">{format(new Date(schedule.weekStartDate), "MMMM dd")}</td>
                    <td className='w-[1%]'>
                      { schedule.markedAsComplete ? (<IoMdCheckmark className="inline text-2xl mr-4" />) : (<div />) }
                      { schedule.goalsMet ? (<div />) : (<IoMdAlarm className="inline text-2xl mr-4" />) }
                    </td>
                    <td>{ schedule.goalsMet ? (<div />) : (<p>Issues here</p>) }</td>
                    <td className='w-full flex flex-row justify-evenly items-center '>
                      <NavLink key={"schedule-id:" + schedule._id} to={"/mgr/scheduler/daily?scheduleId=" + schedule._id} className="inline">
                        <IoMdClipboard className="text-2xl inline cursor-pointer" />
                      </NavLink>

                      <IoMdDownload onClick={handleDownloadSchedule} className="inline text-2xl cursor-pointer"/>
                      <IoIosArchive onClick={handleArchiveSchedule} className="inline text-2xl cursor-pointer"/>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );

}


export default SchedulerHome;