import React from 'react';
import { useState } from 'react';
import ManagerNavbar from '../../components/manager-components/ManagerNavbar';





function EmployeeManager() {

  const [intlEmployee, setIntlEmployee] = useState([
    { id: 1, username: 'jobin', password: 'grape' },
    { id: 2, username: 'jacob', password: 'apple' },
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
  
  //Get database employee data using employee id
  const getIntlEmployee = (id) => {
    let found = null;
    intlEmployee.forEach(element => {
      if(element.id === id) {
        found = element;
      }
    });
    return found;
  }
  
  //Get current edited employee data
  const getEmployee = (id) => {
    let found = null;
    employee.forEach(element => {
      if(element.id === id) {
        found = element;
      }
    });
    return found;
  }


  const handleEditButton = (id, event) => {

    //Make text inputs visible
    Array.from(document.getElementsByClassName(id + "-input")).forEach((input) => {
      input.readOnly = false;
    });

    //Hide edit button, make submit and cancel buttons visible
    Array.from(document.getElementsByClassName(id + "-button")).forEach((button) => {
      if(button.innerText === "Edit") {
        button.hidden = true;
      } else if (button.innerText === "Submit" || button.innerText === "Cancel") {
        button.hidden = false;
      }
    });

  }


  const handleCancelButton = (id, event) => {

    //Get initial employee data
    let intlEmployeeValue = getIntlEmployee(id);

    //Cancels edits, makes text inputs unusable
    Array.from(document.getElementsByClassName(id + "-input")).forEach((input) => {

      if(input.name === "username") input.value = intlEmployeeValue.username;
      else if(input.name === "password") input.value = intlEmployeeValue.password;
      
      input.readOnly = true;

    });

    //Hide cancel and submit buttons, show edit button
    Array.from(document.getElementsByClassName(id + "-button")).forEach((button) => {

      if(button.innerText === "Cancel" || button.innerText === "Submit") {
        button.hidden = true;
      } else if(button.innerText === "Edit") {
        button.hidden = false;
      }

    });

  }


  const handleSubmitButton = (id, event) => {

    //Submit edits, POST them
    Array.from(document.getElementsByClassName(id + "-input")).forEach((input) => {
      input.readOnly = true;
    });

    //show edit button
    Array.from(document.getElementsByClassName(id + "-button")).forEach((button) => {

      if(button.innerText === "Cancel" || button.innerText === "Submit") {
        button.hidden = true;
      } else if(button.innerText === "Edit") {
        button.hidden = false;
      }

    });
  }




  return (

    <div className="manager-body">

      <ManagerNavbar />

      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employee.map((employee) => (
            <tr key={employee.id}>
              <td>
                <input
                  type="text"
                  className={employee.id + "-input"}
                  name="username"
                  value={employee.username}
                  onChange={(event) => handleUsernameChange(employee.id, event)}
                  readOnly
                />
              </td>
              <td>
                <input
                  type="text"
                  className={employee.id + "-input"}
                  name="password"
                  value={employee.password}
                  onChange={(event) => handlePasswordChange(employee.id, event)}
                  readOnly
                />
              </td>
              <td className="table-row-buttons">
                <button type="button" className={employee.id + "-button"} onClick={(event) => handleEditButton(employee.id, event)}>Edit</button>
                <button type="button" className={employee.id + "-button"} onClick={(event) => handleCancelButton(employee.id, event)} hidden>Cancel</button>
                <button type="button" className={employee.id + "-button"} onClick={(event) => handleSubmitButton(employee.id, event)} hidden>Submit</button>
              </td>
            </tr>
          ))}

        </tbody>

      </table>
    </div>


  );

};


export default EmployeeManager;