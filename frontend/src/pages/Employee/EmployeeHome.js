import React from 'react';
import Navbar from '../../components/employee-components/Navbar';
import "../../styles/employee.css"

function EmployeeHome() {
  return (
    <div className='body'>
      <Navbar/>
      <p>Home Sweet Home</p>
    </div>
  );
}

export default EmployeeHome;