import React, { useEffect, useState } from "react";
import axiosInstance from "../../Axios";

function ShiftView(props) {
  const { startDay, id } = props;
  const [shifts, setShifts] = useState([]);

  const allDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const days = [...allDays.slice(startDay), ...allDays.slice(0, startDay)];

  const getShifts = async () => {
    try {
      const response = await axiosInstance.get(
        `/employeeSchedule/schedule/${id}}`
      );
      if (response.error) {
        console.log("Error geting current Schedule");
      } else {
        setShifts(response.data.result);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getShifts();
  }, []);

  return (
    <div className="flex flex-row space-x-4">
      {days.map((dayName, index) => {
        const shiftsForDay = shifts.filter((employee) =>
          employee.shifts.some(
            (shift) => new Date(shift.startTime).getDay() === index
          )
        );
        if (shiftsForDay.length === 0) return null;

        return (
          <div key={index} className="bg-white rounded-lg shadow-lg w-80 p-4">
            <h1 className="text-2xl font-bold text-blue-500">{dayName}</h1>
            {shiftsForDay.map((employee) => {
              const shift = employee.shifts.find(
                (shift) => new Date(shift.startTime).getDay() === index
              );
              const startTime = new Date(shift.startTime).toLocaleTimeString(
                [],
                { hour: "2-digit", minute: "2-digit" }
              );
              const endTime = new Date(shift.endTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <div key={employee.id} className="mt-4">
                  <p className="text-lg font-medium">
                    {employee.name} ({employee.role})
                  </p>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-md font-medium">Shift Time: </p>
                    <p className="text-md font-medium text-blue-500">
                      {startTime} - {endTime}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default ShiftView;
