import React, { useState, useEffect } from "react";
import ManagerNavbar from '../../components/manager-components/ManagerNavbar';
import { Virtuoso } from 'react-virtuoso';



import '../../styles/manager.css';

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const hourTimes = ["12:00 AM", "12:30 AM", "1:00 AM", "1:30 AM", "2:00 AM", "2:30 AM", "3:00 AM", "3:30 AM", "4:00 AM", "4:30 AM", "5:00 AM",
 "5:30 AM", "6:00 AM", "6:30 AM", "7:00 AM", "7:30 AM", "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", 
  "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM", "10:00 PM", "10:30 PM", "11:00 PM", "11:30 PM"]


function ManagerAccountSettings() {

  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [state, setState] = useState(
    {
      name: "",
      email: "",
      startDay: "",
      openTime: "",
      closeTime: "",
      roles: []

    }
  );
  const [newRole, setNewRole] = useState('');

  useEffect(() => {
    console.log(state);
    //THIS IS WHERE WE POST CHANGES
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setState({
      ...state,
      [id]: value
    });
    setUnsavedChanges(true);
    console.log(state);
  }

  const handleSave = () => {
    

    setUnsavedChanges(false);
    //backend stuff
  }


  const handleDelete = (index) => {
    setState((prevState) => {
      const updatedRoles = [...prevState.roles];
      updatedRoles.splice(index, 1);
      return { ...prevState, roles: updatedRoles };
    });
    setUnsavedChanges(true);
  };

  const handleNewRole = (event) => {
    setNewRole(event.target.value);
    setUnsavedChanges(true);
  }

  const handleAddRole = () => {
    setState((prevState) => ({
      ...prevState, 
      roles: [...prevState.roles, newRole]
    }));
    setNewRole('');
    setUnsavedChanges(true);
  }


  const handleRoleChange = (event, index) => {
    const updatedRoles = [...state.roles];
    updatedRoles[index] = event.target.value;
    setState((prevState) => ({
      ...prevState,
      roles: updatedRoles
    }));
    setUnsavedChanges(true);
  };

  const isValidTime = (time, string) => {
    const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/;
    if(!timeRegex.test(time)){
      alert("Invalid " + string + " Time")
    }
    // return timeRegex.test(time);
  };

  /*
      Settings:   
      Name
      email
      Schedule start day
      Open time
      Close time
      Manage Roles - show all roles , allow add (or delete)

  */

  return (

    <div className="manager-body">
      <ManagerNavbar />
      {/* <div className="settings"> */}
      <div>

        <h2>Change Account Settings</h2>
        <div className="label-input-combo">
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" value={state.name} onChange={handleChange} />
        </div>

        <div className="label-input-combo">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" value={state.email} onChange={handleChange} />
        </div>

        <div className="label-input-combo">
          <label htmlFor="startDay">Schedule Start Day</label>
          <select id="startDay" name="startDay" value={state.startDay} onChange={handleChange}>
            {daysOfWeek.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>

        <div className="label-input-combo">
          <label htmlFor="openTime">Open Time</label>
          <select id="openTime" name="openTime" type="text" value={state.openTime} onChange={handleChange} >
            {hourTimes.map((hour) => (
                <option key={hour} value={hour}>
                    {hour}
                </option>
            ))}
            </select>
        </div>
        <div className="label-input-combo">
          <label htmlFor="closeTime">Close Time</label>
          <select id="closeTime" name="closeTime" type="text" value={state.closeTime} onChange={handleChange} >
            {hourTimes.map((hour) => (
                <option key={hour} value={hour}>
                    {hour}
                </option>
            ))}
            </select>
        </div>


        <div>
          <h3>Manage Roles</h3>
          <Virtuoso
            style={{ height: '200px', width: '600px' }}
            data={state.roles}
            itemContent={(index, role) => (
              <div key={index}>
                <input
                  type="text"
                  value={role}
                  onChange={(event) => handleRoleChange(event, index)}
                />
                <button onClick={() => handleDelete(index)}>Delete Role</button>
              </div>
            )}
          />
          <div className="label-input-combo">
            <input id="addRole" name="addRole" type="text" value={newRole} onChange={handleNewRole} />

            <button onClick={handleAddRole}>
              Add Role
            </button>

          </div>

        </div>

        {unsavedChanges && (
          <div>
            <p>Bojo!</p>
            <button onClick={handleSave}>Save Changes</button>
          </div>
        )}
      </div>
    </div>
  );

}

export default ManagerAccountSettings;