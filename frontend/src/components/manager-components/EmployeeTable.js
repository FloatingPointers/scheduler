import React, { useState } from 'react';
import axiosInstance from '../../Axios';
import {TiDelete} from 'react-icons/ti'

function EmployeeTable() {

  let [employees, setEmployees] = useState([
    {
      _id: 1,
      firstName: "john",
      lastName: "smith",
      email: "johnsmith@gmail.com",
    },
    {
      _id: 2,
      firstName: "ron",
      lastName: "kim",
      email: "ronnie@gmail.com",
    },
    {
      _id: 3,
      firstName: "isaac",
      lastName: "rein",
      email: "rein@gmail.com",
    },
  ]);

  const getEmployees = async () => {
    try {
      setEmployees(await JSON.parse(axiosInstance.get('/emp-table/allEmployees')));
    } catch (e) {
      console.log("ERROR: Employee table query failed")
    }
  };
  getEmployees();

  const deleteEmployee = async (id) => {
    try {
      await axiosInstance.delete(`/emp-table/${id}/deleteEmployee`);
      

    } catch (e) {
      console.log("ERROR: Employee deletion failed");
    }
    setEmployees(
      employees => employees.filter(employee => employee._id !== id)
    );
  };

  

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee._id}>
            <td className="truncate">{`${employee.firstName} ${employee.lastName}`}</td>
            <td className="truncate">{employee.email}</td>
            <td onClick={() => deleteEmployee(employee._id)}><TiDelete /></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default EmployeeTable;