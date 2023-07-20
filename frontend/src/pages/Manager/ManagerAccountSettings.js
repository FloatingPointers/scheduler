import React, { useState, useEffect } from "react";
import ManagerNavbar from '../../components/manager-components/ManagerNavbar';
import { Virtuoso } from 'react-virtuoso';
import axios from 'axios';
import { Modal, Button, Group } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks';
import { TiDelete } from 'react-icons/ti'
import axiosInstance from "../../Axios";
import { getDay, setDay, setHours, setMinutes, parseISO, formatISO, startOfDay, getHours, getMinutes } from "date-fns";

import '../../styles/manager.css';

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const hourTimes = [];
for (let i = 0; i < 24; i++) {
  const hour = i < 10 ? `0${i}` : `${i}`;
  hourTimes.push(`${hour}:00`);
  hourTimes.push(`${hour}:30`);
}


function ManagerAccountSettings() {
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [state, setState] = useState({
    name: "",
    settings: {
      startDay: 0,
      endDay: 0,
      openTime: '00:00',
      closeTime: '00:00',
      roles: [],
    },
  });
  const [newRole, setNewRole] = useState('');

  const handleChange = (event) => {
    const { id, value } = event.target;
    let newValue;
    if (id === "name") {
      setState((prevState) => ({
        ...prevState,
        name: value,
      }));
    } else if (id === "startDay" || id === "endDay") {
      newValue = value;
    } else if (id === "openTime" || id === "closeTime") {
      newValue = value;
    } else {
      newValue = value;
    }

    if (id !== "name") {
      setState((prevState) => ({
        ...prevState,
        settings: {
          ...prevState.settings,
          [id]: newValue,
        },
      }));
    }

    setUnsavedChanges(true);
};



  const handleSave = async () => {
    try {
      const response = await axiosInstance.put('/settings/store/updateSettings', {
        name: state.name,
        settings: state.settings
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
  };

  useEffect(() => {
    const getSettings = async () => {
      try {
        const response = await axiosInstance.get('/settings/store/getSettings');
        const { settings } = response.data;

        setState((prevState) => ({
          ...prevState,
          name: response.data.name,
          settings: {
            ...prevState.settings,
            startDay: settings.startDay,
            endDay: settings.endDay,
            openTime: settings.openTime,
            closeTime: settings.closeTime,
            roles: settings.roles,
          },
        }));
      } catch (error) {
        console.log("Error:", error);
        // Error handling
      }
    };
    getSettings();
  }, []);

  const handleDelete = (index) => {
    setState((prevState) => {
      const updatedRoles = [...prevState.settings.roles];
      updatedRoles.splice(index, 1);
      return {
        ...prevState,
        settings: {
          ...prevState.settings,
          roles: updatedRoles,
        },
      };
    });
    setUnsavedChanges(true);
  };

  const handleNewRole = (event) => {
    setNewRole(event.target.value);
    setUnsavedChanges(true);
  };

  const handleAddRole = () => {
    setState((prevState) => ({
      ...prevState,
      settings: {
        ...prevState.settings,
        roles: [...prevState.settings.roles, newRole],
      },
    }));
    setNewRole("");
    setUnsavedChanges(true);
  };

  const handleRoleChange = (event, index) => {
    const updatedRoles = [...state.settings.roles];
    updatedRoles[index] = event.target.value;
    setState((prevState) => ({
      ...prevState,
      settings: {
        ...prevState.settings,
        roles: updatedRoles
      }
    }));
    setUnsavedChanges(true);
  };

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div className="bg-slate-100 w-full h-full flex flex-col">
      <ManagerNavbar />
      <div className="flex flex-row w-full h-full">
        <div className="flex  justify-center items-center gap-3 p-10 flex-col w-full">
          <h2>Change Account Settings</h2>
          <div className="">
            <label className="p-2" htmlFor="name">Store Name</label>
            <input id="name" name="name" type="text" value={state.name} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2" />
          </div>
          <div className="">
            <label htmlFor="startDay">Schedule Start Day</label>
            <select
              id="startDay"
              name="startDay"
              value={state.settings.startDay}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2"
            >
              {daysOfWeek.map((day, index) => (
                <option key={index} value={index}>
                  {day}
                </option>
              ))}
            </select>
          </div>
          <div className="">
            <label htmlFor="endDay">Schedule End Day</label>
            <select
              id="endDay"
              name="endDay"
              value={state.settings.endDay}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2"
            >
              {daysOfWeek.map((day, index) => (
                <option key={index} value={index}>
                  {day}
                </option>
              ))}
            </select>
          </div>

          <div className="">
            <label htmlFor="openTime">Open Time</label>
            <select
              id="openTime"
              name="openTime"
              value={state.settings.openTime} 
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2"
            >
              {hourTimes.map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
          <div className="">
            <label htmlFor="closeTime">Close Time</label>
            <select
              id="closeTime"
              name="closeTime"
              value={state.settings.closeTime} 
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2"
            >
              {hourTimes.map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
          <Button onClick={open} className="px-3 py-2 bg-blue-500 text-white rounded-md">Manage Roles</Button>
          {unsavedChanges && (
            <div>
              <button onClick={handleSave} className="px-3 py-2 bg-green-500 text-white rounded-md">Save Changes</button>
            </div>
          )}
        </div>
      </div>
      <Modal opened={opened} onClose={close} size="50%" shadow="md" padding="xl" title="Manage Roles" centered >
        <div className="w-full h-full flex flex-col justify-center items-center ">
          <Virtuoso
            style={{ height: '400px', width: '400px' }}
            data={state.settings.roles}
            itemContent={(index, role) => (
              <div key={index} className="px-5 gap-5 w-full h-full">
                <input
                  type="text"
                  value={role}
                  onChange={(event) => handleRoleChange(event, index)}
                  className="border border-gray-300 rounded-md px-3 py-2 m-1"
                />
                <button onClick={() => handleDelete(index)} className="px-3 py-2 bg-red-500 text-white rounded-md gap-20"><TiDelete /></button>
              </div>
            )}
          />
          <div className="">
            <input id="addRole" name="addRole" type="text" value={newRole} onChange={handleNewRole} autoFocus className="border border-gray-300 rounded-md px-3 py-2 m-1" />
            <button onClick={handleAddRole} className="px-3 py-2 bg-blue-500 text-white rounded-md">Add Role</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ManagerAccountSettings;
