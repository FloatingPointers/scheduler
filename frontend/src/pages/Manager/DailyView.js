import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../../styles/manager.css";
import ManagerNavbar from "../../components/manager-components/ManagerNavbar";
import { generateDummySchedule } from "../../test/TestingFunctions.js";
import { format, add } from "date-fns";

function DailyView() {
  //GET: Schedule from the scheduleId field in ? url
  const [schedule, setSchedule] = useState(generateDummySchedule());

  const handleMarkCompletion = () => {
    document.getElementById(
      "scheduler-daily-mark-for-completion-button"
    ).hidden = true;
    document.getElementById(
      "scheduler-daily-reopen-for-editing-button"
    ).hidden = false;

    setSchedule({
      ...schedule,
      markedAsComplete: true,
    });
  };

  const handleReopenForEditing = () => {
    document.getElementById(
      "scheduler-daily-mark-for-completion-button"
    ).hidden = false;
    document.getElementById(
      "scheduler-daily-reopen-for-editing-button"
    ).hidden = true;

    setSchedule({
      ...schedule,
      markedAsComplete: false,
    });
  };

  let markCompleteButton;
  let reopenForEditingButton;
  if (schedule.markedAsComplete) {
    markCompleteButton = (
      <button
        id="scheduler-daily-mark-for-completion-button"
        onClick={handleMarkCompletion}
        hidden
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Mark Completed
      </button>
    );
    reopenForEditingButton = (
      <button
        id="scheduler-daily-reopen-for-editing-button"
        onClick={handleReopenForEditing}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Reopen For Editing
      </button>
    );
  } else {
    markCompleteButton = (
      <button
        id="scheduler-daily-mark-for-completion-button"
        onClick={handleMarkCompletion}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Mark Completed
      </button>
    );
    reopenForEditingButton = (
      <button
        id="scheduler-daily-reopen-for-editing-button"
        onClick={handleReopenForEditing}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        hidden
      >
        Reopen For Editing
      </button>
    );
  }
  return (
    <div>
      <ManagerNavbar />
      <div className="bg-slate-100 w-screen min-h-screen p-12 ">
        <div className="flex flex-col items-center justify-top border border-slate-200 p-12 bg-white shadow-lg rounded-lg gap-8 w-full">
          <h1 className="text-4xl font-bold mb-4">
            Week of {schedule.weekStartDate}
          </h1>

          <ul className="flex flex-row w-full h-auto gap-4 justify-between items-stretch">
            {schedule.day.map((day, index) => {
              let name_of_day = format(
                add(new Date(schedule.weekStartDate), { days: index }),
                "eeee"
              );

              let completionContent;
              if (day.markedAsComplete) completionContent = <p>Yes</p>;
              else completionContent = <p>No</p>;

              let issuesContent;
              if (!day.goalsMet) issuesContent = <p>Issues Present</p>;

              return (
                <li className="w-[14.286%] bg-white border border-slate-100 rounded-lg shadow-xl drop-shadow-sm text-xl p-4 hover:-translate-y-4 transition-all cursor-pointer ">
                  <NavLink
                    key={"schedule-id:" + schedule._id + "_day:" + index}
                    to={
                      "/mgr/scheduler?scheduleId=" +
                      schedule._id +
                      "&day=" +
                      index
                    }
                  >
                    <p className="text-blue-500 hover:text-blue-700 text-2xl font-semibold ">
                      {name_of_day}
                    </p>

                    <div className="mt-2">
                      <p className="font-bold text-lg">Completed: </p>
                      {completionContent}
                    </div>
                    <div className="mt-2">{issuesContent}</div>
                  </NavLink>
                </li>
              );
            })}
          </ul>

          <div className="bg-white rounded-lg shadow-xl border border-slate-100 p-4 mt-8 w-full max-w-lg flex flex-col ">
            <h2 className="text-2xl font-bold mb-2">
              Schedule Information and Options
            </h2>
            <p className="mb-4 text-xl ">
              Schedule Status:{" "}
              {schedule.markedAsComplete ? "Completed!" : "Not Completed"}
            </p>
            {markCompleteButton}
            {reopenForEditingButton}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DailyView;
