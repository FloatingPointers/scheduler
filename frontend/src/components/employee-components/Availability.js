import React, { useState, useEffect } from 'react';
import { Modal, Paper, Textarea } from '@mantine/core';

function Availability({ initialAvailability, onChange }) {
  const [availability, setAvailability] = useState(
    initialAvailability || Array(7).fill().map(() => ({ preference: '', hours: Array(24).fill(false) }))
  );
  const [selectedDay, setSelectedDay] = useState(null);


  
  useEffect(() => {
    onChange(availability);
  }, [availability, onChange]);




  const handleHourSelection = (dayIndex, hourIndex) => {
    const newAvailability = [...availability];
    newAvailability[dayIndex].hours[hourIndex] = !newAvailability[dayIndex].hours[hourIndex];
    setAvailability(newAvailability);
  };

  const handlePreferenceChange = (dayIndex, newPreference) => {
    const newAvailability = [...availability];
    newAvailability[dayIndex].preference = newPreference;
    setAvailability(newAvailability);
  };





  return (
    <div className='flex flex-col items-center'>
      {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day, dayIndex) => (
        <div key={day} className="flex bg-slate-100 shadow rounded-lg overflow-hidden flex-col m-5 w-11/12 shadow-slate-600">
          <h3 className=' text-center'>{day}</h3>
          <button className="hover:text-green-500" onClick={() => setSelectedDay(dayIndex)}>Set Preference</button>
          <Modal opened={selectedDay === dayIndex} onClose={() => setSelectedDay(null)} title={`Set preference for ${day}`}>
            <Textarea

              value={availability[dayIndex].preference}
              onChange={(e) => handlePreferenceChange(dayIndex, e.currentTarget.value)}
            />
          </Modal>
          <div className="divide-x divide-gray-200 flex flex-row">
            {availability[dayIndex].hours.map((available, hourIndex) => (
              <button
                key={hourIndex}
                className={`"px-4 py-2 w-20 h-20 text-center text-sm cursor-pointer flex items-center justify-center" 
                ${available ? 'bg-green-400 hover:bg-green-200 ' : 'bg-red-400 hover:bg-red-200'}`}
                onClick={() => handleHourSelection(dayIndex, hourIndex)}
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
