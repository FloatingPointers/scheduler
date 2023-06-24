import React from 'react';
import { useState } from 'react';
import ManagerNavbar from '../../components/manager-components/ManagerNavbar';





function EmployeeManager() {

  const [intlEmployee, setIntlEmployee] = useState([
    { id: 1, username: 'jobin', password: 'OMG' },
    { id: 2, username: 'user2', password: 'GUYS' },
    { id: 3, username: 'employee3', password: 'I MADE THE' },
    { id: 4, username: 'guy4', password: 'DELETE BUTTON' },
    { id: 5, username: 'girl5', password: 'WORK!!!!!!!!!!!!!!!!!!!!!!!' }
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

    //Hide edit and delete buttons
    Array.from(document.getElementsByClassName(id + " hideOnEdit")).forEach((element) => { element.hidden = true; });
    //Show cancel and submit buttons
    Array.from(document.getElementsByClassName(id + " showOnEdit")).forEach((element) => { element.hidden = false; });

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

    //Show edit and delete buttons
    Array.from(document.getElementsByClassName(id + " hideOnEdit")).forEach((element) => { element.hidden = false; });
    //Hide cancel and delete buttons
    Array.from(document.getElementsByClassName(id + " showOnEdit")).forEach((element) => { element.hidden = true; });

  }


  const handleSubmitButton = (id, event) => {

    //Submit edits, POST them
    Array.from(document.getElementsByClassName(id + "-input")).forEach((input) => {
      input.readOnly = true;
    });

    //Show edit and delete buttons
    Array.from(document.getElementsByClassName(id + " hideOnEdit")).forEach((button) => { button.hidden = false; });
    //Hide cancel and delete buttons
    Array.from(document.getElementsByClassName(id + " showOnEdit")).forEach((button) => { button.hidden = true; });

  }



  const handleDeleteButton = (id, event) => {

    //Get the employee to delete, and their index in the local list
    let to_remove = getEmployee(id);
    let remove_at_index = employee.indexOf(to_remove);

    //Ensure the employee exists in the local list so we don't remove the last element in the list by accident
    //or so we don't accidentally send two delete requests to the server
    if(to_remove === null || remove_at_index < 0) return;

    console.log("removing employee at index: " + remove_at_index + " with id: " + id);

    //Que a request to server to remove the employee from the remote database

    //Remove the employee from the local list
    let after_remove = employee.splice(0, employee.length);
    after_remove.splice(remove_at_index, 1);
    setEmployee(after_remove);

    //Register a handler that awaits the server's response to the delete request, then delete the employee from the intlEmployee
    //state if the delete request was successful, so that the intlEmployee list remains representative of the remote database

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
                <button type="button" className={employee.id + " hideOnEdit"} onClick={(event) => handleEditButton(employee.id, event)}>Edit</button>
                <button type="button" className={employee.id + " showOnEdit"} onClick={(event) => handleCancelButton(employee.id, event)} hidden>Cancel</button>
                <button type="button" className={employee.id + " showOnEdit"} onClick={(event) => handleSubmitButton(employee.id, event)} hidden>Submit</button>
                <button type="button" className={employee.id + " hideOnEdit"} onClick={(event) => handleDeleteButton(employee.id, event)}>Delete</button>
              </td>
            </tr>
          ))}

        </tbody>

      </table>
    </div>


  );

};


export default EmployeeManager;