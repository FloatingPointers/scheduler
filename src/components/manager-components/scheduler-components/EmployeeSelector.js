import React, {useState, useEffect} from 'react';
import {Table} from 'react-bootstrap';

function EmployeeSelector(props) {

    
  const [employees, setEmployees] = [
    {
        employeeID: 1,
        name: "Tohno Akiha",
        startTime: "9:00 AM",
        endTime: "5:00 PM",
        roles: "Cashier"
    },
    {
        employeeID: 2,
        name: "Nanaya Shiki",
        startTime: "9:00 AM",
        endTime: "5:00 PM",
        roles: "Cashier"
    },
]


    return (
      <div>

        <Table>
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Role</th>
            </tr>
          </thead>
        </Table>

      </div>
    );
    
}

export default EmployeeSelector;