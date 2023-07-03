import React, { useState } from 'react';
import Navbar from '../../components/employee-components/Navbar';
import "../../styles/employee.css"
import HourlySelection from '../../components/employee-components/HourlySelection';
import { differenceInHours, format, add, compareAsc } from "date-fns";





function EmployeeSettings() {





  const [info, setInfo] = useState({
    name: "jobin",
    email: "grape@gmail.com",
    password: "Jobin123",
    //avalilable, not, preferred


  });



  const handleInputChange = (event) => {
    const { name, value } = event.target;
    
    setInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };



  const handleSubmit = (event) => {

    //submit to database

  };

  






  return (
    <div className='employee-body'>
      <Navbar />
      <h2>Settings</h2>
      <form onSubmit={handleSubmit}>

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
        


        <HourlySelection  />

        <button type='submit' >Submit</button>


      </form>


    </div>
  );
}

export default EmployeeSettings;