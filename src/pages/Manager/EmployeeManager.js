import React from 'react';
import ManagerNavbar from '../../components/manager-components/ManagerNavbar';

import '../../styles/manager.css';
import EmployeeManagementRow from '../../components/manager-components/EmployeeManagementRow';



function EmployeeManager() {

  const employee_obj = { uuid: 1493123, name: "Ryan", password: "password" };

  return (

    <div className="manager-body">
      <ManagerNavbar />
      <p>Employee Manager Page</p>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Password</th>
            <th>check</th>
          </tr>
        </thead>
        <tbody>
          <EmployeeManagementRow employeeInfo={employee_obj} />
          <EmployeeManagementRow employeeInfo={employee_obj} />
          <EmployeeManagementRow employeeInfo={employee_obj} />
        </tbody>
      </table>

    </div>

  );

}

export default EmployeeManager;