import React from "react";
import axiosInstance from "../../../Axios";
import format from "date-fns/format";

function EditingView(props) {
  const {
    currentShift,
    setCurrentShift,
    params,
    employees,
    getWorkingEmployees,
    getAvailableEmployees,
  } = props;
  const { startDate, endDate, employeeId } = currentShift;
  const employeeName = currentShift.employee;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentShift((prevShift) => ({ ...prevShift, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let shift = {
        day: params.day,
        employeeId: employeeId,
        employeeName: employeeName,
        startTime: startDate,
        role: "", //TODO: Employee's role here
        endTime: endDate,
      };

      //Upload shift to backend
      const response = await axiosInstance.post(
        `/scheduler/editor/schedule/${params.id}/addShift`,
        { shift }
      );

      if (response.data.error) {
        console.error("Error returned on add shift: " + response.data.error);
        return;
      }

      //Update working and available employees
      getWorkingEmployees();
      getAvailableEmployees();
    } catch (e) {
      console.error(
        "ERROR: Adding a new shift to the schedule in schedule editor\n",
        e
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-4">
      <h2 className="text-2x1 font-semibold mb-4 ">
        {employeeName ? "Employee: " + employeeName : "No Employee Selected"}
      </h2>
      <div className="bg-white shadow shadow-slate-600 rounded-lg p-5 w-80">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <label>
            Shift Start:
            <input
              className=" mt-2 block w-full border-2 border-blue-300 rounded-md py-2 px-3 mb-5"
              type="time"
              name="start"
              value={startDate ? format(startDate, "HH:mm") : ""}
              step={1800}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Shift End:
            <input
              className=" mt-2 block w-full border-2 border-blue-300 rounded-md py-2 px-3 mb-5"
              type="time"
              name="end"
              value={endDate ? format(endDate, "HH:mm") : ""}
              step={1800}
              onChange={handleInputChange}
            />
          </label>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Add to Shift
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditingView;
