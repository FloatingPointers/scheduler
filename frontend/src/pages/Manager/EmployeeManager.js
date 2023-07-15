import React from 'react';
import { useState } from 'react';
import ManagerNavbar from '../../components/manager-components/ManagerNavbar';
import uniqid from 'uniqid';
<<<<<<< HEAD
import {Button, Notification} from '@mantine/core'
import InviteCode from '../../components/manager-components/InviteCode';
import axiosInstance from '../../Axios';
=======
import EmployeeTable from '../../components/manager-components/EmployeeTable';

>>>>>>> 98cd0ff16de6f18eef1e1a6caa6b295f2e1d6186




function EmployeeManager() {
<<<<<<< HEAD

  const createEmployee = (info) => {
    return({
      id: info.id,
      username: info.username,
      password: info.password,
    });
  };

  const [intlEmployee, setIntlEmployee] = useState([
    { id: uniqid(), username: 'jobin', password: 'OMG' },
    { id: uniqid(), username: 'user2', password: 'GUYS' },
    { id: uniqid(), username: 'employee3', password: 'I MADE THE' },
    { id: uniqid(), username: 'guy4', password: 'DELETE BUTTON' },
    { id: uniqid(), username: 'girl5', password: 'WORK!!!!!!!!!!!!!!!!!!!!!!!' }
  ]);

  const [employee, setEmployee] = useState(intlEmployee);

  





  const handleUsernameChange = (id, event) => {
    const newEmployee = employee.map((employee) => {
      if (employee.id === id) {
        return { ...employee, username: event.target.value };
      }
      return employee;
    });
    setEmployee(newEmployee);
  };

  const handlePasswordChange = (id, event) => {
    const newEmployee = employee.map((employee) => {
      if (employee.id === id) {
        return { ...employee, password: event.target.value };
      }
      return employee;
    });
    setEmployee(newEmployee);
  };
=======
>>>>>>> 98cd0ff16de6f18eef1e1a6caa6b295f2e1d6186
  

  return (
    <div className='bg-slate-100 w-full h-full'>
      <ManagerNavbar />

      <div className="flex flex-row w-full h-full justify-center items-center gap-10 p-10">

        <div className='w-1/2 p-4 flex flex-col items-center border bg-slate-50 border-slate-300 rounded shadow-md'>
          <h1 className='text-center font-semibold text-2xl'>Employees</h1>

          <hr class="h-px bg-slate-200 border-0 m-6 w-full"></hr>

          <EmployeeTable/>
            
          {/* <div className="inline-flex flex-row w-1/3 bg-slate-100 px-1 py-1 rounded">
            <button className='hover:bg-slate-50 hover:shadow-sm hover:shadow-slate-200 transition-all w-1/2 rounded'>Prev Page</button>
            <button className='hover:bg-slate-50 hover:shadow-sm hover:shadow-slate-200 transition-all w-1/2 rounded'>Next Page</button>
<<<<<<< HEAD
          </div>

          <InviteCode  />

=======
          </div> */}
>>>>>>> 98cd0ff16de6f18eef1e1a6caa6b295f2e1d6186
        </div>

      </div>
    </div>
  );

};


export default EmployeeManager;