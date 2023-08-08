import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";

function EmployeeSelector(props) {
  let { currentShift, setCurrentShift } = props;
  const { startDate, endDate } = currentShift;

  if (startDate && endDate) {
  }

  const roles = ["manager", "cook", "cashier"];
  const [employees, setEmployees] = useState([
    // temporary employee data mockup
    // {
    //   employeeID: 1,
    //   name: "John Smith",
    //   startTime: "9:00 AM",
    //   endTime: "5:00 PM",
    //   roles: "Cashier",
    // },
    // {
    //   employeeID: 2,
    //   name: "Adam Sandler",
    //   startTime: "9:00 AM",
    //   endTime: "5:00 PM",
    //   roles: "Cashier",
    // },
  ]);

  const [sort, setSort] = useState("none");
  const [filter, setFilter] = useState("none");

  async function getData(filter) {
    //add sort later
    // get emloyee info from backend
  }

  //Get current edited employee data
  const getEmployee = (id) => {
    let found = null;
    found = employees.find((employee) => employee.employeeID === id);

    if (found === null)
      console.log(
        "ERROR>>EMPLOYEESELECTOR::GETEMPLOYEE: Employee not found in linear id search"
      );

    return found;
  };

  //Called when an employee is clicked on in the table
  const handleEmployeeSelect = (id) => {
    //Deselect previously selected employee selector :skull: selector
    Array.from(
      document.getElementsByClassName(
        "employee-selector-" + props.currentShift.employeeID
      )
    ).forEach((element) => {
      element.className =
        "employee-selector employee-selector-" + props.currentShift.employeeID;
    });

    //Mark element as selected
    Array.from(
      document.getElementsByClassName("employee-selector-" + id)
    ).forEach((element) => {
      element.className = "employee-selector selected employee-selector-" + id;
    });

    let employee = getEmployee(id);
    setCurrentShift({
      ...currentShift,
      employee: employee.name,
      employeeID: id,
    });
  };

  return (
    <div>
      <div className="employeeSelectorModifiers">
        {/* <label htmlFor="sort">Sort</label>
        <select name="sort">
          <option value="None">
            None
          </option>
          <option value="Select">
            Select
          </option>
          <option value="Select">
            Select
          </option>
        </select> */}
        <label htmlFor="role-filter">Filter Role</label>
        <select
          name="role-filter"
          onChange={(event) => {
            setFilter(event.target.value);
          }}
        >
          <option value="none">None</option>
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>

      <Table>
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Roles</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => {
            let selected =
              props.currentShift.employeeID !== null &&
              props.currentShift.employeeID === employee.employeeID;
            let classes =
              (selected
                ? "employee-selector selected "
                : "employee-selector ") +
              ("employee-selector-" + employee.employeeID);

            return (
              <tr
                className={classes}
                key={employee._id}
                onClick={() => {
                  handleEmployeeSelect(employee.employeeID);
                }}
              >
                <td>{employee.name}</td>
                <td>{employee.roles}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default EmployeeSelector;
