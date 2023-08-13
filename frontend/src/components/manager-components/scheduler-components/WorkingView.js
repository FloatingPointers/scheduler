import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { TiDelete } from "react-icons/ti";
import axiosInstance from "../../../Axios";

//Table that shows who is currently working and their info.

function WorkingView(props) {
  const { currentShift, workingEmployees, params, getWorkingEmployees } = props;

  //delete from shift
  const handleDelete = async (employeeId) => {
    try {
      await axiosInstance.put(`/schedule/editor/${params.id}/removeShift`, {
        employeeId: employeeId,
        day: params.day,
      });
      getWorkingEmployees();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" bg-stone-50 shadow-md rounded-lg p-5">
      <Table className="w-full text-left">
        <thead>
          <tr className=" border-b-2 border-blue-300">
            <th className="pb-2">Name</th>
            <th className="pb-2">Shift</th>
            <th className="pb-2">Role</th>
            <th className="pb-2"></th>
          </tr>
        </thead>
        <tbody>
          {workingEmployees.map((employee) => (
            <tr
              key={employee.employeeId}
              className="border-b-2 border-blue-200 py-2"
            >
              <td>{employee.name}</td>
              <td>
                {employee.startTime} - {employee.endTime}
              </td>
              <td>{employee.roles}</td>
              <td>
                <Button
                  onClick={() => handleDelete(employee.employeeId)}
                  className=" bg-red-500 text-white rounded-lg w-10  my-2"
                >
                  <TiDelete />
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
