import React, { useEffect, useState } from "react";
import axiosInstance from "../../Axios";
import { TiDelete } from "react-icons/ti";

function EmployeeTable() {
  let [employees, setEmployees] = useState([]);

  useEffect(() => {
    getEmployees();
  }, []);

  const getEmployees = async () => {
    try {
      const res = await axiosInstance.get("/emp-table/employee/allEmployees");
      setEmployees(res.data.result);
    } catch (e) {
      console.log("ERROR: Employee table query failed");
    }
  };

  const deleteEmployee = async (id) => {
    try {
      await axiosInstance.delete(`/emp-table/employee/${id}/deleteEmployee`);
    } catch (e) {
      console.log("ERROR: Employee deletion failed");
    }
    setEmployees((employees) =>
      employees.filter((employee) => employee._id !== id)
    );
  };

  return (
    <table className="">
      <thead className="w-full">
        <tr className="w-full">
          <th className="w-1/2">Name</th>
          <th className="w-1/2">Email</th>
          <th className="w-[1%]"></th>
        </tr>
      </thead>
      <tbody className="w-full">
        {employees.map((employee) => (
          <tr key={employee._id} className="w-full">
            <td className="w-1/2">{`${employee.firstName} ${employee.lastName}`}</td>
            <td className="w-1/2">{employee.email}</td>
            <td
              className="w-[1%]"
              onClick={() => {
                deleteEmployee(employee._id);
              }}
            >
              <TiDelete />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default EmployeeTable;
