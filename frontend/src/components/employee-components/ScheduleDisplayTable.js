import React, { useEffect, useState } from "react";
import { format } from "date-fns";

import axiosInstance from "../../Axios";

function ScheduleDisplayTable(props) {
  const { days, day } = props;
  const [shifts, setShifts] = useState([
    {
      employee: "John Doe",
      times: [
        { startTime: new Date(), endTime: new Date() },
        {},
        {},
        {},
        {},
        {},
        {},
      ],
    },
  ]);

  //Get shifts from backend
  const getShifts = async () => {
    try {
      let response = await axiosInstance.get(
        `/employeeSchedule/schedule/displayTableInfo`
      );

      if (response.data.error) {
        console.log(
          "Received error when requesting schedule info",
          response.data.error
        );
        return;
      }

      setShifts(response.data.result.shifts);
    } catch (err) {
      console.error("Error getting shifts", err);
    }
  };

  function generateDayHeaders() {
    return days.map((aday) => {
      return <th className="text-left pl-2">{aday}</th>;
    });
  }

  function generateEmployeeRows() {
    return shifts.map((shift, index) => {
      return (
        <tr className={index % 2 === 0 ? "bg-slate-50" : ""}>
          <td className="text-left pl-2">{shift.employee}</td>

          {shift.times.map((time) => {
            return (
              <td>
                {time && time.startTime
                  ? format(time.startTime, "hbbb") +
                    "-" +
                    format(time.endTime, "hbbb")
                  : "Not Scheduled"}
              </td>
            );
          })}
        </tr>
      );
    });
  }

  return (
    <div className="bg-white border border-slate-300 shadow rounded m-12 p-6">
      <table className="table-fixed w-full">
        <thead>
          <tr>
            <th className="text-left pl-2">Employee</th>
            {generateDayHeaders()}
          </tr>
        </thead>
        <tbody>{generateEmployeeRows()}</tbody>
      </table>
    </div>
  );
}

export default ScheduleDisplayTable;
