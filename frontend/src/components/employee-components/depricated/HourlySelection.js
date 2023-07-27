import React, { useState } from 'react';
import { format, add } from 'date-fns';

function HourlySelection(props) {
  const [preference, setPreference] = useState('not');

  const handlePreferenceChange = (event) => {
    setPreference(event.target.value);
  };

  const [week, setWeek] = useState([
    {
      dayOfWeek: new Date(2023, 6, 1, 12, 0, 0, 0),
      hours: [
        {
          hour: new Date(2023, 6, 1, 12, 0, 0, 0).getHours(),
          preference: 'not',
        },
        {
          hour: new Date(2023, 6, 1, 13, 0, 0, 0).getHours(),
          preference: 'not',
        },
        {
          hour: new Date(2023, 6, 1, 14, 0, 0, 0).getHours(),
          preference: 'not',
        },
        {
          hour: new Date(2023, 6, 1, 15, 0, 0, 0).getHours(),
          preference: 'not',
        },
        {
          hour: new Date(2023, 6, 1, 16, 0, 0, 0).getHours(),
          preference: 'not',
        },
      ],
    },
    {
      dayOfWeek: new Date(2023, 6, 2, 12, 0, 0, 0),
      hours: [
        {
          hour: new Date(2023, 6, 2, 12, 0, 0, 0).getHours(),
          preference: 'not',
        },
        {
          hour: new Date(2023, 6, 2, 13, 0, 0, 0).getHours(),
          preference: 'not',
        },
        {
          hour: new Date(2023, 6, 2, 14, 0, 0, 0).getHours(),
          preference: 'not',
        },
        {
          hour: new Date(2023, 6, 2, 15, 0, 0, 0).getHours(),
          preference: 'not',
        },
        {
          hour: new Date(2023, 6, 2, 16, 0, 0, 0).getHours(),
          preference: 'not',
        },
      ],
    },
    {
      dayOfWeek: new Date(2023, 6, 3, 12, 0, 0, 0),
      hours: [
        {
          hour: new Date(2023, 6, 3, 12, 0, 0, 0).getHours(),
          preference: 'not',
        },
        {
          hour: new Date(2023, 6, 3, 13, 0, 0, 0).getHours(),
          preference: 'not',
        },
        {
          hour: new Date(2023, 6, 3, 14, 0, 0, 0).getHours(),
          preference: 'not',
        },
        {
          hour: new Date(2023, 6, 3, 15, 0, 0, 0).getHours(),
          preference: 'not',
        },
        {
          hour: new Date(2023, 6, 3, 16, 0, 0, 0).getHours(),
          preference: 'not',
        },
      ],
    }
  ]);

  const handleHourSelection = (dayIndex, hourIndex) => {
    const updatedWeek = [...week];
    updatedWeek[dayIndex].hours[hourIndex].preference = preference;
    setWeek(updatedWeek);
  };

  const generateHoursContent = () => {

    return (
      <div className="availability-selector">


        {week.map((day, dayIndex) => {
          let { dayOfWeek, hours } = day;
          let curDate = new Date(dayOfWeek);

          return (


            <div key={`week-total-${dayIndex}`} className="week-total">
              <div className="day-separator" >
                {format(curDate, 'EEEE')}
              </div>

              {
                <ul className="week-hour-display" key={`hours-list-${dayIndex}`}>
                  {
                    hours.map((hour, hourIndex) => {

                      let { preference } = hour;
                      let classList = `hour-selector-${preference}`;
                      curDate = add(curDate, { hours: 1 })
                      console.log(hourIndex)
                      console.log(curDate)
                      return (
                        <li
                          key={`hour-selector-${dayIndex}-${hourIndex}`}
                          className={classList}
                          onClick={() => handleHourSelection(dayIndex, hourIndex)}
                        >
                          {format(curDate, 'h a')}
                        </li>
                      )
                    })}
                </ul>}
            </div>
          );


        })}
      </div>

    )
  };

  return (
    <div >
      <div className="center">
        <label>
          <input
            type="radio"
            value="not-available"
            checked={preference === 'not-available'}
            onChange={handlePreferenceChange}
          />
          Not Available
        </label>
        <label>
          <input
            type="radio"
            value="available"
            checked={preference === 'available'}
            onChange={handlePreferenceChange}
          />
          Available
        </label>
        <label>
          <input
            type="radio"
            value="preferred"
            checked={preference === 'preferred'}
            onChange={handlePreferenceChange}
          />
          Preferred
        </label>
      </div>

      {generateHoursContent()}
    </div>

  );
}

export default HourlySelection;
