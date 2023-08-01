import React, { useState, useEffect, useRef } from "react";
import { Modal, Paper, Textarea } from "@mantine/core";
import { isEqual } from "lodash";

function Availability({ initialAvailability, onChange }) {
  const [availability, setAvailability] = useState(
    Array(7)
      .fill()
      .map(() => ({ preference: "", hours: Array(24).fill(false) }))
  );
  const [selectedDay, setSelectedDay] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [shouldCallOnChange, setShouldCallOnChange] = useState(false);

  useEffect(() => {
    setAvailability(initialAvailability);
    setShouldCallOnChange(false);
  }, [initialAvailability]);

  useEffect(() => {
    if (!isEqual(availability, initialAvailability)) {
      setShouldCallOnChange(true);
    }
  }, [availability, initialAvailability]);

  useEffect(() => {
    if (shouldCallOnChange) {
      onChange(availability);
      setShouldCallOnChange(false);
    }
  }, [shouldCallOnChange, availability, onChange]);

  useEffect(() => {
    const stopDrag = () => setDragging(false);
    window.addEventListener("mouseup", stopDrag);
    return () => {
      window.removeEventListener("mouseup", stopDrag);
    };
  }, []);

  const toggleHour = (dayIndex, hourIndex) => {
    const newAvailability = [...availability];
    newAvailability[dayIndex].hours[hourIndex] =
      !newAvailability[dayIndex].hours[hourIndex];
    setAvailability(newAvailability);
  };

  const handlePreferenceChange = (dayIndex, newPreference) => {
    const newAvailability = [...availability];
    newAvailability[dayIndex].preference = newPreference;
    setAvailability(newAvailability);
  };

  const handleMouseDown = (dayIndex, hourIndex) => {
    setDragging(true);
    toggleHour(dayIndex, hourIndex);
  };

  const handleMouseEnter = (dayIndex, hourIndex) => {
    if (dragging) {
      toggleHour(dayIndex, hourIndex);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {[
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ].map((day, dayIndex) => (
        <div
          key={day}
          className="flex bg-slate-100 shadow rounded-lg overflow-hidden flex-col m-5 w-11/12 shadow-slate-600"
        >
          <h3 className=" text-center">{day}</h3>
          <button
            className="hover:text-green-500"
            onClick={() => setSelectedDay(dayIndex)}
          >
            Set Preference
          </button>
          <Modal
            opened={selectedDay === dayIndex}
            onClose={() => setSelectedDay(null)}
            title={`Set preference for ${day}`}
          >
            <Textarea
              value={availability[dayIndex].preference}
              onChange={(e) =>
                handlePreferenceChange(dayIndex, e.currentTarget.value)
              }
            />
          </Modal>
          <div className="divide-x divide-gray-200 flex flex-row text-center items-center justify-center">
            {availability[dayIndex].hours.map((available, hourIndex) => (
              <button
                key={hourIndex}
                className={`"px-4 py-2 w-20 h-20 text-center text-sm cursor-pointer flex items-center justify-center text-justify"
                ${
                  available
                    ? "bg-green-400 hover:bg-green-200 "
                    : "bg-red-400 hover:bg-red-200"
                }`}
                onMouseDown={() => handleMouseDown(dayIndex, hourIndex)}
                onMouseEnter={() => handleMouseEnter(dayIndex, hourIndex)}
              >
                {`${hourIndex}:00`}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Availability;
