import React, { useEffect, useState } from "react";
import axiosInstance from "../../Axios";

function ShiftView(props) {
  const { startDay } = props;
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
        `/employeeSchedule/currentSchedule/employeeShifts`
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
        const originalIndex = (index + startDay) % 7;
        const shiftForDay = shifts.find((shift) => shift.day === originalIndex);
        if (!shiftForDay) return null;

        const startTime = shiftForDay.startTime;
        const endTime = shiftForDay.endTime;

        return (
          <div className="bg-white rounded-lg shadow-lg w-80">
            <h1 className="text-2xl font-bold text-blue-500">{dayName}</h1>
            <div className="flex justify-between items-center">
              <p className="text-lg font-medium">Shift Time: </p>
              <p className="text-lg font-medium">
                {startTime} - {endTime}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ShiftView;
