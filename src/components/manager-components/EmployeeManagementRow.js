import React from 'react';
import { useState } from 'react';
import {Employee} from '../../data/Employee.js';

function EmployeeManagementRow({employee}) {

    const [editable, setEditable] = useState(false);


    let content;
    if(!editable) {
        content = (
            <div className="employee-management-item">
                <p>{employee.getName()}</p>
                <p>{employee.getPassword()}</p>
                <button onClick={() => {setEditable(true)}}>Edit</button>
            </div>
        );
    } else {
        content = (
            <div className="employee-management-item">
                <form>
                    <input type="text" value={employee.getName()} />
                    <input type="text" value={employee.getPassword()} />
                    <button type="submit">Submit</button>
                </form>

                <button onClick={() => {setEditable(false)}}>Cancel</button>
                <button>Delete</button>

            </div>
        );
    }



    return (
        <div>
            {content}
        </div>
    );

}

export default EmployeeManagementRow;