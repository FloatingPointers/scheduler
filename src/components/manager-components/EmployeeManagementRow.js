import React from 'react';
import {Employee} from '../../data/Employee.js';

function EmployeeManagementRow({employee}) {

    return (
        <div className="employee-management-item">
            <p>{employee.getName()}</p>
            <p>{employee.getPassword()}</p>
            <button>-</button>
        </div>
    );

}

export default EmployeeManagementRow;