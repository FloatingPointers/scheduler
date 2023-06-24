import React from 'react';
import { useState } from 'react';
import ManagerNavbar from '../../components/manager-components/ManagerNavbar';
import uniqid from 'uniqid';





function EmployeeManager() {

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


  const handleEditBtn = (id, event) => {

    //Make text inputs visible
    Array.from(document.getElementsByClassName(id + "-input")).forEach((input) => {
      input.readOnly = false;
    });

    //Hide edit and delete buttons
    Array.from(document.getElementsByClassName(id + " hideOnEdit")).forEach((element) => { element.hidden = true; });
    //Show cancel and submit buttons
    Array.from(document.getElementsByClassName(id + " showOnEdit")).forEach((element) => { element.hidden = false; });

  }


  const handleCancelBtn = (id, event) => {

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


  const handleSubmitBtn = (id, event) => {

    //Submit edits, POST them
    Array.from(document.getElementsByClassName(id + "-input")).forEach((input) => {
      input.readOnly = true;
    });

    //Show edit and delete buttons
    Array.from(document.getElementsByClassName(id + " hideOnEdit")).forEach((button) => { button.hidden = false; });
    //Hide cancel and delete buttons
    Array.from(document.getElementsByClassName(id + " showOnEdit")).forEach((button) => { button.hidden = true; });

  }



  const handleDeleteBtn = (id, event) => {

    //Get the employee to delete, and their index in the local list
    let to_remove = getEmployee(id);
    let remove_at_index = employee.indexOf(to_remove);

    //Ensure the employee exists in the local list so we don't remove the last element in the list by accident
    //or so we don't accidentally send two delete requests to the server
    if(to_remove === null || remove_at_index < 0) return;

    console.log("removing employee at index: " + remove_at_index + " with id: " + id);

    //Que a request to server to remove the employee from the remote database

    //Remove the employee from the local list
    //Splice the entire list to generate a new one, so that after_remove is not a reference to employee
    //this way setEmployee(after_remove) is recognized as a state change
    let after_remove = employee.splice(0, employee.length); 
    after_remove.splice(remove_at_index, 1);
    setEmployee(after_remove);

    //Register a handler that awaits the server's response to the delete request, then delete the employee from the intlEmployee
    //state if the delete request was successful, so that the intlEmployee list remains representative of the remote database

  }


  const handleAddBtn = () => {

    let info = {id:uniqid()}
    let unfilled_input = null;

    Array.from(document.getElementsByClassName("addInput")).forEach((input) => {

      //Set unfilled input to the first empty input, if any
      if(unfilled_input !== null) return;
      if(input.value === "") {
        unfilled_input = input.name;
        return;
      }

      //Update info with the name and value pair from the input field (if it is not empty)
      info[input.name] = input.value
      input.value = "";

    });

    //Return if any of the input fields were left empty
    if(unfilled_input !== null) {
      alert("You must enter a value for " + unfilled_input);
      return;
    }

    const tempEmployee = createEmployee(info);
    setEmployee([
      ...employee,
      tempEmployee
    ]);

    //add employee to db

    //update intlEmployee to reflect db changes
    //setIntlEmployee(employee)
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
                <button type="button" className={employee.id + " hideOnEdit"} onClick={(event) => handleEditBtn(employee.id, event)}>Edit</button>
                <button type="button" className={employee.id + " showOnEdit"} onClick={(event) => handleCancelBtn(employee.id, event)} hidden>Cancel</button>
                <button type="button" className={employee.id + " showOnEdit"} onClick={(event) => handleSubmitBtn(employee.id, event)} hidden>Submit</button>
                <button type="button" className={employee.id + " hideOnEdit"} onClick={(event) => handleDeleteBtn(employee.id, event)}>Delete</button>
              </td>
            </tr>

          ))}
          <tr>
            <td>
              <input
                type="text"
                className="addInput"
                name="username"
                placeholder="username"
              />
            </td>
            <td>
              <input
                type="text"
                className="addInput"
                name="password"
                placeholder="password"
              />
            </td>
            <td className="table-row-buttons">
              <button type="button" onClick={handleAddBtn}>Add Employee</button>
            </td>
          </tr>
        </tbody>
        

      </table>

    </div>


  );

};


export default EmployeeManager;