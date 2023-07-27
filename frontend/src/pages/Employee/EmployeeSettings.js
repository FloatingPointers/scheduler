import React, { useEffect, useState } from 'react';
import Navbar from '../../components/employee-components/Navbar';
import "../../styles/employee.css"
import HourlySelection from '../../components/employee-components/Availability';
import { differenceInHours, format, add, compareAsc } from "date-fns";
import axiosInstance from "../../Axios";




function EmployeeSettings() {











  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    availability: Array(7).fill().map(() => ({ 
      preference: '', 
      hours: Array(24).fill(false) 
    }))
});



  const handleChange = (event) => {
    const { id, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
    setUnsavedChanges(true);
  };

  const handleAvailabilityChange = (newAvailability) => {
    setState((prevState) => ({
      ...prevState,
      availability: newAvailability,
    }));
    setUnsavedChanges(true);
  };

  const handleSave = async () => {
    try {
      const response = await axiosInstance.put('/settings/employee/updateSettings', {
        firstName: state.firstName,
        lastName: state.lastName,
        availability: state.availability
      });

      const { success } = response.data;
      if (success) {
        setUnsavedChanges(false);
        alert("Settings Saved!");
      } else {
        alert("Error saving settings");
      }
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    const getSettings = async () => {
      try {
        const response = await axiosInstance.get('/settings/employee/getSettings');
        const { settings } = response.data;

        setState((prevState) => ({
          ...prevState,
          firstName: settings.firstName,
          lastName: settings.lastName,
          availability: settings.availability
        }));
      } catch (error) {
        console.log("Error:", error);
        // Error handling
      }
    };
    getSettings();
  }, []);





  return (
    <div className="bg-slate-100 w-full h-full flex flex-col">
      <Navbar />
      <div className="flex flex-row w-full h-full">
        <div className="flex  justify-center items-center gap-3 p-10 flex-col w-full">
          <h2>Change Account Settings</h2>

          <div className="">
            <label className="p-2" htmlFor="firstName">First Name</label>
            <input id="firstName" name="firstName" type="text" value={state.name} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2" />
          </div>

          <div className="">
            <label className="p-2" htmlFor="lastName">Last Name</label>
            <input id="lastName" name="lastName" type="text" value={state.name} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2" />
          </div>


          <HourlySelection onChange={handleAvailabilityChange} initialAvailability={state.availability}  /> 

          {unsavedChanges && (
            <div>
              <button onClick={handleSave} className="px-3 py-2 bg-green-500 text-white rounded-md">Save Changes</button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default EmployeeSettings;