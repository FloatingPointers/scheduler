import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";

function EmployeeSelector(props) {
  let { employees, setCurrentShift } = props;

  const [sort, setSort] = useState("none");
  const [filter, setFilter] = useState("none");

  //Called when an employee is clicked on in the table
  const handleEmployeeSelect = (id, firstName, lastName) => {
    setCurrentShift({
      ...props.currentShift,
      employee: firstName + " " + lastName,
      employeeID: id,
    });
  };

  return (
    <div>
      <div className="">
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
        {/* <label htmlFor="role-filter">Filter Role</label>
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
        </select> */}
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
            return (
              <tr
                key={employee._id}
                onClick={() => {
                  handleEmployeeSelect(
                    employee._id,
                    employee.firstName,
                    employee.lastName
                  );
                }}
              >
                <td>{employee.firstName}</td>
                <td></td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default EmployeeSelector;
