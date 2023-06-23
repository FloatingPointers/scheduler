import React, { useState, useEffect } from "react";
import ManagerNavbar from '../../components/manager-components/ManagerNavbar';
import { Virtuoso } from 'react-virtuoso';



import '../../styles/manager.css';

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const hourTimes = ["12:00 AM", "1:00 AM", "2:00 AM", "3:00 AM", "4:00 AM", "5:00 AM", "6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM",
"10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM", "11:00 PM"]


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
      <div classname="settings">

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


        <div classname="border">
          <h3>Manage Roles</h3>
          <Virtuoso
            style={{ height: '200px' }}
            data={state.roles}
            itemContent={(index, role) => (
              <div key={index}>
                <input
                  type="text"

                  onChange={(event) => handleChange(event, index)}
                />
                {/* <button onClick={() => handleDelete(index)}>Delete Role</button> */}
              </div>
            )}
          />
          <button onClick={() => setState({ ...state, roles: [...state.roles, 'New Role'] })}
          >
            Add Role
          </button>
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