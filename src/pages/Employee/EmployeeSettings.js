import React, { useState } from 'react';
import Navbar from '../../components/employee-components/Navbar';
import "../../styles/employee.css"



function EmployeeSettings() {

  const [info, setInfo] = useState({
    name: "jobin",
    email: "grape@gmail.com",
    password: "Jobin123",
    //avalilable, not, preferred



    availability: [
      {
        dayOfWeek: 0,
        preference: 'not',
        startTime: '',
        endTime: '',
        isPreferred: false
      },
      {
        dayOfWeek: 1,
        preference: 'not',
        startTime: '',
        endTime: '',
        isPreferred: false
      },
      {
        dayOfWeek: 2,
        preference: 'not',
        startTime: '',
        endTime: '',
        isPreferred: false
      },
      {
        dayOfWeek: 3,
        preference: 'not',
        startTime: '',
        endTime: '',
        isPreferred: false
      },
      {
        dayOfWeek: 4,
        preference: 'not',
        startTime: '',
        endTime: '',
        isPreferred: false
      },
      {
        dayOfWeek: 5,
        preference: 'not',
        startTime: '',
        endTime: '',
        isPreferred: false
      },
      {
        dayOfWeek: 6,
        preference: 'not',
        startTime: '',
        endTime: '',
        isPreferred: false
      },
    ]
  });



  const handleInputChange = (event) => {
    const { name, value } = event.target;
    
    setInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };


  const handleAvailabilityChange = (index, field, value) => {
    setInfo((prevInfo) => {
      const updatedAvailability = [...prevInfo.availability];
      updatedAvailability[index] = { ...updatedAvailability[index], [field]: value };
      return { ...prevInfo, availability: updatedAvailability };
    });
  };

  const handleSubmit = (event) => {
    //submit to database

  };



  return (
    <div className='employee-body'>
      <Navbar />
      <h2>Settings</h2>
      <form onSubmut={handleSubmit}>

        <div className='label-input-combo'>
          <label htmlFor='name'>Name: </label>
          <input name='name' type='text' value={info.name} onChange={handleInputChange} />
        </div>

        <div className='label-input-combo'>
          <label htmlFor='email'>Email: </label>
          <input name='email' type='email' value={info.email} onChange={handleInputChange} />
        </div>
        <div className='label-input-combo'>
          <label htmlFor='password'>Password: </label>
          <input name='password' type='password' value={info.password} onChange={handleInputChange} />
        </div>


        <h2>Availability</h2>
        
        {info.availability.map((day, index) => (
          <div key={day.dayOfWeek} className='border'>
            <div className='availability'>
              <p>Day {day.dayOfWeek}</p>
              <div>
                <input
                  type='radio'
                  id={`not_${index}`}
                  name={`preference_${index}`}
                  value='not'
                  checked={day.preference === 'not'}
                  onChange={() => handleAvailabilityChange(index, 'preference', 'not')}
                />
                <label htmlFor={`not_${index}`}>Not Available</label>
              </div>
              <div>
                <input
                  type='radio'
                  id={`available_${index}`}
                  name={`preference_${index}`}
                  value='available'
                  checked={day.preference === 'available'}
                  onChange={() => handleAvailabilityChange(index, 'preference', 'available')}
                />
                <label htmlFor={`available_${index}`}>Available</label>
              </div>
              <div>
                <input
                  type='radio'
                  id={`preferred_${index}`}
                  name={`preference_${index}`}
                  value='preferred'
                  checked={day.preference === 'preferred'}
                  onChange={() => handleAvailabilityChange(index, 'preference', 'preferred')}
                />
                <label htmlFor={`preferred_${index}`}>Preferred</label>
              </div>
            </div>
            {day.preference !== 'not' && (
              <div >
                <label htmlFor={`start_time_${index}`}>Start Time:</label>
                <input
                  id={`start_time_${index}`}
                  type='time'
                  value={day.startTime}
                  onChange={(e) => handleAvailabilityChange(index, 'startTime', e.target.value)}
                />
                <label htmlFor={`end_time_${index}`}>End Time:</label>
                <input
                  id={`end_time_${index}`}
                  type='time'
                  value={day.endTime}
                  onChange={(e) => handleAvailabilityChange(index, 'endTime', e.target.value)}
                />
              </div>
            )}
          </div>
        ))}



        <button type='submit' >Submit</button>


      </form>


    </div>
  );
}

export default EmployeeSettings;