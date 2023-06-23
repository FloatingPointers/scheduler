import React from 'react';
import { useState, useEffect } from 'react';
import ManagerNavbar from '../../components/manager-components/ManagerNavbar';

import '../../styles/manager.css';
import EmployeeManagementRow from '../../components/manager-components/EmployeeManagementRow';


function EmployeeManager() {

  const [employeeElements, setEmployeeElements] = useState([
    { uuid: 1493123, name: "Ryan", password: "password" },
    { uuid: 2930103, name: "Jobean", password: "bobinrobinjobincalobin" },
    { uuid: 8008135, name: "AATON", password: "Bjork" }
  ]);

  //GET employees from database --> load into list --> construct individual components for editing each employee's settings in the table

  

  function generateEmployeeContent() {

    let content = [];
    employeeElements.forEach(element => {
      let append = ( <EmployeeManagementRow employeeInfo={element} /> );
      content.push(append);
    });

    return content;

  }



  
  return (

    <div className="manager-body">
      <ManagerNavbar />
      <p>Employee Manager Page</p>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {generateEmployeeContent() /*employeeElements.map((info) => <EmployeeManagementRow employeeInfo={info} handleDeleteEmployee={handleDeleteEmployee} />)*/}
        </tbody>
      </table>

    </div>

  );

}

export default EmployeeManager;