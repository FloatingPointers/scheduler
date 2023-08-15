import React, { useState, useEffect } from "react";
import { TiDelete } from "react-icons/ti";
import { IoMdTrash } from "react-icons/io";
import axiosInstance from "../../../Axios";
import { format } from "date-fns";

function WorkingView(props) {
  const { currentShift, workingEmployees, params, getWorkingEmployees } = props;

  const handleDelete = async (employeeId) => {
    try {
      await axiosInstance.put(
        `/scheduler/editor/schedule/${params.id}/removeShift`,
        {
          employeeId: employeeId,
          day: params.day,
        }
      );
      getWorkingEmployees();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-slate-50 shadow-md rounded-lg p-5">
      <h1 className="text-2xl font-semibold text-center pb-2">
        Working Employees
      </h1>

      <table className="table-fixed text-left">
        <thead className="bg-slate-200 w-full">
          <tr className="">
            <th className="pl-2">Name</th>
            <th className="pl-2">Shift</th>
          </tr>
        </thead>
        <tbody>
          {workingEmployees && workingEmployees.shifts ? (
            workingEmployees.shifts.map((employee, index) => (
              <tr
                key={employee._id}
                className={"w-1/2 " + (index % 2 === 0 ? "bg-slate-100" : "")}
              >
                <td className="pl-2">{employee.employeeName}</td>
                <td className="flex flex-row items-center justify-between px-2">
                  <div>
                    {format(new Date(employee.startTime), "hh:mm") + " - "}
                    {format(new Date(employee.endTime), "hh:mm")}
                  </div>
                  <IoMdTrash
                    onClick={() => {
                      handleDelete(employee._id);
                    }}
                    className="text-red-500 cursor-pointer rounded-lg text-3xl my-1"
                  />
                </td>
              </tr>
            ))
          ) : (
            <div>Loading</div>
          )}
        </tbody>
      </table>
    </div>
  );
}
export default WorkingView;
