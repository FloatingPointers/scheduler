import React, { useEffect, useState } from "react";
import ManagerNavbar from "../../components/manager-components/ManagerNavbar";
import InviteCode from "../../components/manager-components/InviteCode";
import EmployeeTable from "../../components/manager-components/EmployeeTable";
import ManagerRequests from "../../components/manager-components/ManagerRequests";
import axiosInstance from "../../Axios";

function EmployeeManager() {
  const [day, setDay] = useState(0);
  const getStartDay = async () => {
    try {
      const response = await axiosInstance.get(
        `/employeeSchedule/currentSchedule/startDate`
      );
      if (response.error) {
        console.log("Error geting current Schedule");
      } else {
        const startDate = new Date(response.data.result);
        setDay(startDate.getDay());
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getStartDay();
  }, []);

  return (
    <div className="bg-slate-100 w-full h-full">
      <ManagerNavbar />

      <div className="flex flex-col justify-center items-center">
        <ManagerRequests />
        <div className="flex flex-row w-full justify-center items-center gap-10 p-10">
          <div className="w-1/2 p-4 flex flex-col items-center border bg-slate-50 border-slate-300 rounded shadow-md">
            <h1 className="text-center font-semibold text-2xl">Employees</h1>
            <hr class="h-px bg-slate-200 border-0 m-6 w-full"></hr>
            <EmployeeTable />
            <hr class="h-px bg-slate-200 border-0 m-6 w-full"></hr>
            <InviteCode />
            {/* <div className="inline-flex flex-row w-1/3 bg-slate-100 px-1 py-1 rounded">
              <button className='hover:bg-slate-50 hover:shadow-sm hover:shadow-slate-200 transition-all w-1/2 rounded'>Prev Page</button>
              <button className='hover:bg-slate-50 hover:shadow-sm hover:shadow-slate-200 transition-all w-1/2 rounded'>Next Page</button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeManager;
