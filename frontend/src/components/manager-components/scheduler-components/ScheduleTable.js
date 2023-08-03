import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  IoMdCheckmark,
  IoMdAlarm,
  IoMdDownload,
  IoIosArchive,
  IoMdCreate,
} from "react-icons/io";
import { format } from "date-fns";

function ScheduleTable(props) {
  const navigate = useNavigate();
  const { display, handleArchiveSchedule, handleDownloadSchedule } = props;

  console.log(display);

  return (
    <table className="block w-full">
      <thead className="">
        <tr className="text-xl">
          <th className="w-1/5 text-left font-semibold pl-4">Start Date</th>
          <th className="w-[1%] text-left font-semibold">Status</th>
          <th className="w-1/2 text-left font-semibold"></th>
          <th className="w-[1%] text-left font-semibold">Options</th>
        </tr>
      </thead>
      <tbody className="w-full text-md">
        {display.map((schedule, index) => (
          <tr
            key={schedule._id}
            className={index % 2 === 0 ? "bg-slate-100" : ""}
          >
            <td
              className="pl-4 py-1 cursor-pointer"
              onClick={() => {
                navigate(`/mgr/scheduler/daily?scheduleId=${schedule._id}`);
              }}
            >
              {format(new Date(schedule.startDate), "MMMM dd")}
            </td>
            <td className="w-[1%]">
              {schedule.markedAsComplete ? (
                <IoMdCheckmark className="inline text-2xl mr-4" />
              ) : (
                <div />
              )}
              {schedule.goalsMet ? (
                <div />
              ) : (
                <IoMdAlarm className="inline text-2xl mr-4" />
              )}
            </td>
            <td>{schedule.goalsMet ? <div /> : <p>Issues here</p>}</td>
            <td className="w-2/3 flex flex-row justify-between items-center ">
              <NavLink
                key={"schedule-id:" + schedule._id}
                to={`/mgr/scheduler/daily?scheduleId=${schedule._id}`}
                className="inline"
              >
                <IoMdCreate className="text-2xl inline cursor-pointer" />
              </NavLink>

              <IoMdDownload
                onClick={handleDownloadSchedule}
                className="inline text-2xl cursor-pointer"
              />
              <IoIosArchive
                onClick={() => {
                  handleArchiveSchedule(schedule._id, !schedule.archived);
                }}
                id={`${schedule._id}.archive`}
                className={
                  "inline text-2xl cursor-pointer " +
                  (schedule.archived ? "text-red-500" : "")
                }
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ScheduleTable;
