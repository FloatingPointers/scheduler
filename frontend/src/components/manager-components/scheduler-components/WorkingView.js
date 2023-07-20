import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { TiDelete } from 'react-icons/ti';


//Table that shows who is currently working and their info. 


function WorkingView(props) {

  const [employees, setEmployees] = useState([
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
    {
      employeeID: 3,
      name: "Arcueid Brunestud",
      startTime: "9:00 AM",
      endTime: "5:00 PM",
      roles: "Yep"
    },
  ])

  //delete function
  const handleDelete = (employeeID) => {

    //Send shift delete request to schedule database

    //Delete shift from local schedule if the database responded with a success message
    const updatedEmployees = employees.filter((employee) => employee.employeeID !== employeeID);
    setEmployees(updatedEmployees);


  }

  //get request to get all employees working today
  const handleChanges = () => {
    //setEmployees(response.data)
  }


  return (
    <div className=' bg-stone-50 shadow-md rounded-lg p-5'>
      <Table className='w-full text-left'>
        <thead>
          <tr className=' border-b-2 border-blue-300'>
            <th className='pb-2'>Name</th>
            <th className='pb-2'>Shift</th>
            <th className='pb-2'>Role</th>
            <th className='pb-2'></th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.employeeID} className='border-b-2 border-blue-200 py-2'>
              <td>{employee.name}</td>
              <td>{employee.startTime} - {employee.endTime}</td>
              <td>{employee.roles}</td>
              <td>
                <Button onClick={() => handleDelete(employee.employeeID)}
                  className=" bg-red-500 text-white rounded-lg w-10  my-2"><TiDelete />

                </Button>

              </td>
            </tr>
          ))}
        </tbody>

      </Table>
    </div>
  );
}
export default WorkingView;