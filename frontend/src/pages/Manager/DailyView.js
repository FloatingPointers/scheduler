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
      >
        Mark Completed
      </button>
    );
    reopenForEditingButton = (
      <button
        id="scheduler-daily-reopen-for-editing-button"
        onClick={handleReopenForEditing}
      >
        Reopen For Editing
      </button>
    );
  } else {
    markCompleteButton = (
      <button
        id="scheduler-daily-mark-for-completion-button"
        onClick={handleMarkCompletion}
      >
        Mark Completed
      </button>
    );
    reopenForEditingButton = (
      <button
        id="scheduler-daily-reopen-for-editing-button"
        onClick={handleReopenForEditing}
        hidden
      >
        Reopen For Editing
      </button>
    );
  }

  return (
    <div className="manager-body">
      <ManagerNavbar />

      <h1>Schedule of {schedule.weekStartDate}</h1>

      <ul className="schedule-daily-view">
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
            <li>
              <NavLink
                key={"schedule-id:" + schedule._id + "_day:" + index}
                to={
                  "/mgr/scheduler?scheduleId=" + schedule._id + "&day=" + index
                }
              >
                {name_of_day}
              </NavLink>
              <div className="schedule-status">
                <p>Completed: </p>
                {completionContent}
              </div>
              <div className="schedule-status">{issuesContent}</div>
            </li>
          );
        })}
      </ul>

      <div className="daily-view-management-pane">
        <h2>Schedule Information and Options</h2>
        <p>
          Schedule Status:{" "}
          {schedule.markedAsComplete ? "Completed" : "Not Completed"}
        </p>
        {markCompleteButton}
        {reopenForEditingButton}
      </div>
    </div>
  );
}

export default DailyView;
