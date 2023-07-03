import React from 'react';
import Navbar from '../../components/employee-components/Navbar';
import "../../styles/employee.css"

function EmployeeRequests() {
  const activeRequests = [];

    return (
      <div className='body'>
        <Navbar/>
        <h2>Create a Request</h2>

        <form action="">
          <div className='label-input-combo'>
            <label htmlFor='reason'>Reason</label>
            <input name="reason" type='text'/>
          </div>
          <div className='label-input-combo'>
            <label htmlFor='start-date'>Start Date</label>
            <input type="date" name="start-date" required/>
          </div>
          <div className='label-input-combo'>
            <label htmlFor='end-date'>End Date</label>
            <input type="date" name="end-date" required/>
          </div>
          <button type="submit"/>
        </form>


        <h2>Open Requests</h2>
        {activeRequests}



      </div>
    );
  }
  
export default EmployeeRequests;