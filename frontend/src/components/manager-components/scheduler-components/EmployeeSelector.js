import React, { useState, useEffect } from "react";

function EmployeeSelector(props) {
  const { employees, setCurrentShift, dayIndex } = props;

  const [sort, setSort] = useState("none");
  const [filter, setFilter] = useState("none");
  const [selected, setSelected] = useState(-1);

  //Called when an employee is clicked on in the table
  const handleEmployeeSelect = (id, firstName, lastName) => {
    setCurrentShift({
      ...props.currentShift,
      employee: firstName + " " + lastName,
      employeeID: id,
    });
  };

  return (
    <div className=" bg-stone-50 shadow-md rounded-lg p-5 w-1/3">
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

      <h1 className="text-2xl font-semibold text-center pb-2">
        Available Employees
      </h1>

      <table className="table-fixed text-left">
        <thead className="bg-slate-200 w-full">
          <tr className="">
            <th className="text-left font-semibold pl-2 pb-2">Employee Name</th>
            <th className="text-left font-semibold pl-2 pb-2">Preference</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => {
            return (
              <tr
                className={
                  "transition-colors " +
                  (selected === index
                    ? "bg-blue-500 text-white"
                    : index % 2 === 0
                    ? " bg-slate-100 hover:bg-blue-200 "
                    : "hover:bg-blue-200")
                }
                key={employee._id}
                onClick={() => {
                  setSelected(index);
                  handleEmployeeSelect(
                    employee._id,
                    employee.firstName,
                    employee.lastName
                  );
                }}
              >
                <td className="pl-2 py-1">{employee.firstName}</td>
                <td>
                  {/* {employee.availability[dayIndex]
                    ? employee.availability[dayIndex].preference
                    : ""} */}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeSelector;
