import React, { useState } from 'react';
import axiosInstance from '../../Axios';
import {TiDelete} from 'react-icons/ti'

function EmployeeTable() {

  let [employees, setEmployees] = useState([
  //   {
  //     _id: 1,
  //     firstName: "john",
  //     lastName: "smith",
  //     employer: "64b3664a0918445e2eb28fb6",
  //     email: "johnsmith@gmail.com",
  //   },
  //   {
  //     _id: 2,
  //     firstName: "ron",
  //     lastName: "kim",
  //     employer: "64b3664a0918445e2eb28fb6",
  //     email: "ronnie@gmail.com",
  //   },
  //   {
  //     _id: 3,
  //     firstName: "isaac",
  //     lastName: "rein",
  //     employer: "64b3664a0918445e2eb28fb6",
  //     email: "rein@gmail.com",
  //   },
  ]);

  const getEmployees = async () => {
    try {
      setEmployees(await JSON.parse(axiosInstance.get('/emp-table/employee/allEmployees')));
    } catch (e) {
      console.log("ERROR: Employee table query failed")
    }
  };
  getEmployees();

  const deleteEmployee = async (id) => {
    try {
      await axiosInstance.delete(`/emp-table/employee/${id}/deleteEmployee`);
      

    } catch (e) {
      console.log("ERROR: Employee deletion failed");
    }
    setEmployees(
      employees => employees.filter(employee => employee._id !== id)
    );
  };

  

  return (
<<<<<<< HEAD
    <table className="table-fixed w-4/5">
      <thead>
        <tr>
          <th className="text-left">Name</th>
          <th className="text-left">Email</th>
          <th className='w-5'></th>
=======
    <table className="">
      <thead className='w-full'>
        <tr className='w-full'>
          <th className='w-1/2'>Name</th>
          <th className='w-1/2'>Email</th>
          <th className='w-[1%]'></th>
>>>>>>> aa2ee95e84cc5ad750b7b00baccad7554b880ec9
        </tr>
      </thead>
      <tbody className='w-full'>
        {employees.map((employee) => (
<<<<<<< HEAD
          <tr key={employee._id} >
            <td className="truncate">{`${employee.firstName} ${employee.lastName}`}</td>
            <td className="truncate">{employee.email}</td>
            <td onClick={() => deleteEmployee(employee._id)} className='w-3'><TiDelete /></td>
=======
          <tr key={employee._id} className='w-full'>
            <td className="w-1/2">{`${employee.firstName} ${employee.lastName}`}</td>
            <td className="w-1/2">{employee.email}</td>
            <td className='w-[1%]' onClick={() => deleteEmployee(employee._id)}><TiDelete /></td>
>>>>>>> aa2ee95e84cc5ad750b7b00baccad7554b880ec9
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default EmployeeTable;