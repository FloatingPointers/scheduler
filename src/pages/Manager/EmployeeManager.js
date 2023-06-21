import React from 'react';
import ManagerNavbar from '../../components/manager-components/ManagerNavbar';

import '../../styles/manager.css';
import {Employee} from '../../data/Employee.js';
import EmployeeManagementRow from '../../components/manager-components/EmployeeManagementRow';



function EmployeeManager() {

    const employee_obj = new Employee(1493123, "Ryan", "password");

    return (

        <div className="manager-body">  
            <ManagerNavbar/>
            <p>Employee Manager Page</p>

            <div className="employee-management-item">
                <p>Name</p>
                <p>Password</p>
            </div>

            <div className="employee-manager-list">
                <EmployeeManagementRow employee={employee_obj} />
                <EmployeeManagementRow employee={employee_obj} />
                <EmployeeManagementRow employee={employee_obj} />
            </div>

        </div>

    );

}

export default EmployeeManager;