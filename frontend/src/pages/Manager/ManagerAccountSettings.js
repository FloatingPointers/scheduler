import React, { useState, useEffect } from "react";
import ManagerNavbar from "../../components/manager-components/ManagerNavbar";
import { Virtuoso } from "react-virtuoso";
import axios from "axios";
import { Modal, Button, Group, Inp } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { TiDelete } from "react-icons/ti";
import axiosInstance from "../../Axios";
import {
  getDay,
  setDay,
  setHours,
  setMinutes,
  parseISO,
  formatISO,
  startOfDay,
  getHours,
  getMinutes,
} from "date-fns";

import "../../styles/manager.css";

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

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
      openTime: "00:00",
      closeTime: "00:00",
      roles: [],
    },
  });
  const [newRole, setNewRole] = useState("");

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
    if (+state.settings.startDay === +state.settings.endDay) {
      alert("Start day must not be end day");
      return;
    }
    try {
      const response = await axiosInstance.put(
        "/settings/store/updateSettings",
        {
          name: state.name,
          settings: state.settings,
        }
      );

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
        const response = await axiosInstance.get("/settings/store/getSettings");
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
        roles: updatedRoles,
      },
    }));
    setUnsavedChanges(true);
  };

  const handleEnterButton = (event) => {
    if (event.key === "Enter") {
      handleAddRole();
    }
  };

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div className="bg-slate-100 w-screen min-h-screen flex flex-col">
      <ManagerNavbar />
      <div className="mt-10 bg-slate-50 border border-slate-300 shadow-md p-6 mx-auto max-w-3xl">
        <div className="flex justify-center items-center gap-6 flex-col w-full">
          <h2 className="text-3xl font-semibold pb-4">
            Change Account Settings
          </h2>
          <div className="w-full">
            <label className="block p-2" htmlFor="name">
              Store Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={state.name}
              onChange={handleChange}
              className="font-light border shadow-inner border-slate-300 rounded focus:border-slate-400 focus:outline-none p-2 w-full"
            />
          </div>
          <div className="w-full">
            <label className="block p-2" htmlFor="startDay">
              Schedule Start Day
            </label>
            <select
              id="startDay"
              name="startDay"
              value={state.settings.startDay}
              onChange={handleChange}
              className="font-light border shadow-inner border-slate-300 rounded focus:border-slate-400 focus:outline-none p-2 w-full"
            >
              {daysOfWeek.map((day, index) => (
                <option key={index} value={index}>
                  {day}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full">
            <label className="block p-2" htmlFor="endDay">
              Schedule End Day
            </label>
            <select
              id="endDay"
              name="endDay"
              value={state.settings.endDay}
              onChange={handleChange}
              className="font-light border shadow-inner border-slate-300 rounded focus:border-slate-400 focus:outline-none p-2 w-full"
            >
              {daysOfWeek.map((day, index) => (
                <option key={index} value={index}>
                  {day}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full">
            <label className="block p-2" htmlFor="openTime">
              Open Time
            </label>
            <select
              id="openTime"
              name="openTime"
              value={state.settings.openTime}
              onChange={handleChange}
              className="font-light border shadow-inner border-slate-300 rounded focus:border-slate-400 focus:outline-none p-2 w-full"
            >
              {hourTimes.map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full">
            <label className="block p-2" htmlFor="closeTime">
              Close Time
            </label>
            <select
              id="closeTime"
              name="closeTime"
              value={state.settings.closeTime}
              onChange={handleChange}
              className="font-light border shadow-inner border-slate-300 rounded focus:border-slate-400 focus:outline-none p-2 w-full"
            >
              {hourTimes.map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={open}
            className="bg-blue-600 shadow-sm rounded-md p-2 hover:bg-blue-500 text-white transition-colors w-full mt-4"
          >
            Manage Roles
          </button>
          {unsavedChanges && (
            <div className="mt-4 w-full">
              <button
                onClick={handleSave}
                className="bg-green-400 shadow-sm rounded p-2 hover:bg-green-300 transition-colors w-full"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
      <Modal
        opened={opened}
        onClose={close}
        title="Manage Roles"
        classNames={{ body: "p-6" }}
        centered
      >
        <div className="flex flex-col gap-4">
          <Virtuoso
            style={{ height: "400px", width: "100%" }}
            data={state.settings.roles}
            itemContent={(index, role) => (
              <div
                key={index}
                className="flex items-center justify-between gap-4 w-full py-2"
              >
                <input
                  type="text"
                  value={role}
                  onChange={(event) => handleRoleChange(event, index)}
                  className="font-light border shadow-inner border-slate-300 rounded focus:border-slate-400 focus:outline-none p-1 flex-grow"
                />
                <button
                  onClick={() => handleDelete(index)}
                  className="bg-red-500 shadow-sm rounded px-3 py-2 text-white  hover:bg-red-400 transition-colors"
                >
                  <TiDelete />
                </button>
              </div>
            )}
          />

          <div className="flex justify-between items-center gap-4 w-full">
            <input
              id="addRole"
              name="addRole"
              type="text"
              value={newRole}
              onChange={handleNewRole}
              placeholder="New Role"
              className="font-light border shadow-inner border-slate-300 rounded focus:border-slate-400 focus:outline-none p-1 flex-grow"
              onKeyPress={handleEnterButton}
            />
            <Button
              onClick={handleAddRole}
              className="bg-blue-600 text-white py-1 px-4 rounded-md active:bg-blue-500 transition"
            >
              Add Role
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ManagerAccountSettings;
