import React, { useState } from "react";
import { differenceInHours, format, add, compareAsc } from "date-fns";

import "../../../styles/manager.css";

function HourlyView(props) {
  let { shiftInfo, currentShift } = props;
  let selectionStartTime = currentShift.start ? new Date([shiftInfo.date + "T" + currentShift.start]) : null;
  let selectionEndTime = currentShift.end ? new Date([shiftInfo.date + "T" + currentShift.end]) : null;
  let setSelectionStartTime = (date) => {
    props.setCurrentShift({
      ...currentShift,
      start: date ? format(date, "HH:mm") : "",
    });
  }
  let setSelectionEndTime = (date) => {
    props.setCurrentShift({
      ...currentShift,
      end: date ? format(date, "HH:mm") : "",
    });
  }
  let setSelectionTime = (start, end) => {
    props.setCurrentShift({
      ...currentShift,
      start: start ? format(start, "HH:mm") : "",
      end:  end ? format(end, "HH:mm") : "",
    });
  }

  let startTime = new Date([shiftInfo.date + "T" + shiftInfo.startTime]);
  let startTimeRound = new Date(startTime.getTime());
  startTimeRound.setMinutes(0, 0, 0);
  let endTime = new Date([shiftInfo.date + "T" + shiftInfo.endTime]);
  let endTimeRound = new Date(endTime.getTime());
  endTimeRound.setHours(
    endTimeRound.getHours() + Math.round(endTimeRound.getMinutes() / 60)
  );
  endTimeRound.setMinutes(0, 0, 0); // Resets also seconds and milliseconds
  let totalHours = differenceInHours(endTimeRound, startTimeRound, Math.ceil); //Allows for hourly view setup

  console.log(endTime);

  //Handles when a user selects an hour element
  function handleHourSelection(index) {
    // Number of hours from startTime
    if (selectionStartTime === null) {
      let newStart = new Date(startTime.getTime());
      newStart = add(newStart, { hours: index });
      setSelectionStartTime(newStart);

    } else if (selectionEndTime === null) {
      let newEnd = new Date(startTime.getTime());
      newEnd = add(newEnd, { hours: index });

      //Check if the second selection is less than the first one, then swap start and end times
      if (compareAsc(selectionStartTime, newEnd) === 1) {
        let swap = selectionStartTime;
        setSelectionTime(newEnd, swap);
      } else {
        setSelectionEndTime(newEnd);
      }

    } else {
      //Clear selection if both start and end times are selected
      setSelectionTime(null, null);
    }
  }

  //Create a list containing an html element for each hour of the day, starting at the specified start time of the shift
  function generateHoursContent() {
    let hoursContent = [];
    let cur_date = new Date(startTimeRound);

    for (let hr = 0; hr < totalHours; hr++) {
      let selected =
        selectionStartTime !== null &&
        selectionEndTime !== null &&
        compareAsc(cur_date, selectionStartTime) === 1 &&
        compareAsc(cur_date, selectionEndTime) === -1;

      let selection_start = selectionStartTime !== null && cur_date.getHours() === selectionStartTime.getHours();
      let selection_end = selectionEndTime !== null && cur_date.getHours() === selectionEndTime.getHours();

      let classList = "";
      if(selected) classList += "selected";
      if(selection_start) classList += "selected-start";
      if(selection_end) classList += "selected-end";

      hoursContent.push(
        <li
          id={"hour-selector-" + cur_date.getHours()}
          className={classList}
          onClick={() => {
            handleHourSelection(hr); //its like abstraction
          }}
        >
          {format(cur_date, "h a")}
        </li>
      );

      cur_date = add(cur_date, { hours: 1 });
    }

    return hoursContent;
  }

  return (
    <div className="hourly">
      <ul id="hour-display">{generateHoursContent()}</ul>
    </div>
  );
}

export default HourlyView;
