import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, createSearchParams } from "react-router-dom";
import ManagerNavbar from "../../components/manager-components/ManagerNavbar";
import { add, format } from "date-fns";
import {
  IoMdCheckmark,
  IoMdAlarm,
  IoMdDownload,
  IoIosArchive,
  IoMdCreate,
} from "react-icons/io";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import axiosInstance from "../../Axios";

import ScheduleTableView from "../../components/manager-components/scheduler-components/ScheduleTableView";
import formatDateRange from "../../data/dateRange";

const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function SchedulerHome() {
  const navigate = useNavigate();

  const [recent, setRecent] = useState([]);

  const [monthsFromNow, setMonthsFromNow] = useState([new Date()]);
  const [selectedDate, setSelectedDate] = useState(
    new Date(new Date().getUTCFullYear(), new Date().getMonth(), 1)
  );

  const [scheduleDefaultSettings, setScheduleDefaultSettings] = useState({
    settings: {
      startDay: 0, //Day of week (0-6) representing default start day
      openTime: 0, //Hour of day (0-24) representing default store open time
      closeTime: 24, //Hour of day (0-24) representing default store close time
    },
  });

  const updateRecent = async () => {
    //Get list of recent schedules
    axiosInstance
      .get("/scheduler/recentSchedules")
      .then((res) => {
        if (!res.data) return;
        setRecent(res.data);
        setSelectedDate(getDayAfterSchedule(res.data[0]));
      })
      .catch((err) => {
        console.error("Error getting recent schedules");
        console.error(err);
      });
  };

  useEffect(() => {
    updateRecent();

    //Get default settings for schedule creation
    axiosInstance
      .get("/settings/store/scheduleSettings")
      .then((res) => {
        console.log(
          res.data.settings.startDay +
            " o: " +
            new Date(res.data.settings.openTime).getHours()
        );
        setScheduleDefaultSettings({
          settings: {
            startDay: res.data.settings.startDay,
            openTime: new Date(res.data.settings.openTime).getUTCHours(),
            closeTime: new Date(res.data.settings.closeTime).getUTCHours(),
          },
        });
      })
      .catch((err) => {
        console.error("Error getting schedule default settings");
        console.error(err);
      });

    //Generate a list of all months starting with this month
    let mo = new Date();
    let nextMo = [];
    for (let i = 0; i < 12; i++) {
      nextMo.push(new Date(mo.getTime()));
      mo.setMonth(mo.getMonth() + 1);
    }
    setMonthsFromNow(nextMo);

    /*nextScheduleStartDay = new Date();
    let dayOfWeek = nextScheduleStartDay.getDate() % 7;
    nextScheduleStartDay.setDate((new Date().getDate() / 7) * 7 + dayOfWeek)
    
    let lastStartDate = nextScheduleStartDay;
    for(let i = 0; i < 3; i++) {
      lastStartDate = add(lastStartDate, { days: 7 });
      nextScheduleDates.push(lastStartDate);
    }*/
  }, []);

  const [opened, { open, close }] = useDisclosure(false);

  const handleCreateSchedule = async (event) => {
    event.preventDefault();

    if (
      Number(event.target.closeTime.value) < Number(event.target.openTime.value)
    ) {
      event.target.closeTime.setCustomValidity(
        "Close time must be greater than open time"
      );

      return;
    }

    let startDate = new Date(
      event.target.year.value,
      event.target.month.value,
      event.target.day.value
    );

    let closeTime = new Date(startDate);
    closeTime.setHours(event.target.closeTime.value);
    let openTime = new Date(startDate);
    openTime.setHours(event.target.openTime.value);

    try {
      const res = await axiosInstance.post("/scheduler/create", {
        startDate: startDate,
        startTime: openTime,
        endTime: closeTime,
      });
      console.log("Created Schedule");
      navigate(`/mgr/scheduler/${res.data.id}`);
    } catch (err) {
      console.log("ERROR ", err);
    }

    close();
  };

  function getDaysInMonth(date) {
    return daysInMonth[date.getMonth()];
  }

  const handleSelectMonth = (event) => {
    let mo = new Date(selectedDate.getTime());
    mo.setDate(1);
    document.getElementById("daySelector").value = 1;
    mo.setMonth(event.target.value);
    setSelectedDate(mo);
  };

  const handleSelectDay = (event) => {
    let day = new Date(selectedDate.getTime());
    day.setDate(event.target.value);
    setSelectedDate(day);
  };

  //Returns the date 7 days into the future from the given date
  function getWeekEnding(date) {
    let weekending = new Date(date.getTime());
    weekending = add(weekending, {
      days: 6,
    });
    return weekending;
  }

  //Gets the day after the most recent schedule ends
  function getDayAfterSchedule(schedule) {
    if (!schedule)
      return new Date(new Date().getUTCFullYear(), new Date().getMonth(), 1);
    let lastDay = new Date(schedule.startDate);
    lastDay = add(lastDay, {
      days: 7,
    });
    return lastDay;
  }

  return (
    <div>
      <Modal
        opened={opened}
        onClose={close}
        title={
          "New Schedule (" +
          format(selectedDate, "MMM d") +
          " - " +
          format(getWeekEnding(selectedDate), "MMM d") +
          ")"
        }
        classNames={{
          header: "h-1/4 gap-4 p-4 bg-blue-100",
          title: "text-xl font-semibold",
        }}
      >
        <form
          name="createScheduleForm"
          onSubmit={handleCreateSchedule}
          className="p-4 flex flex-col gap-6"
        >
          <div className="flex flex-row justify-between">
            <div className="flex flex-col w-1/3">
              <label htmlFor="month" className="">
                Month
              </label>
              <select
                required
                name="month"
                onChange={handleSelectMonth}
                className="font-light border shadow-inner border-slate-300 rounded focus:border-slate-400 focus:outline-none p-1 w-full h-full"
              >
                {monthsFromNow.map((month) => {
                  return (
                    <option value={month.getMonth()}>
                      {format(month, "MMMM")}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="flex flex-col w-1/4">
              <label htmlFor="day" className="">
                Day
              </label>
              <input
                type="number"
                name="day"
                id="daySelector"
                required
                defaultValue={selectedDate.getDate()}
                min={1}
                max={daysInMonth[selectedDate.getMonth()]}
                onChange={handleSelectDay}
                className="font-light border shadow-inner border-slate-300 rounded focus:border-slate-400 focus:outline-none p-1 w-full"
              ></input>
            </div>

            <div className="flex flex-col w-1/4">
              <label htmlFor="year" className="">
                Year
              </label>
              <input
                type="number"
                name="year"
                required
                defaultValue={new Date().getUTCFullYear()}
                min={2020}
                max={2050}
                className="font-light border shadow-inner border-slate-300 rounded focus:border-slate-400 focus:outline-none p-1 w-full"
              ></input>
            </div>
          </div>

          <div className="flex flex-row gap-8">
            <div className="">
              <label htmlFor="openTime" className="">
                Open Time
              </label>
              <input
                type="number"
                name="openTime"
                defaultValue={scheduleDefaultSettings.settings.openTime}
                required
                min={0}
                max={24}
                className="font-light border shadow-inner border-slate-300 rounded focus:border-slate-400 focus:outline-none p-1 w-full"
              />
            </div>

            <div className="">
              <label htmlFor="close" className="">
                Close Time
              </label>
              <input
                type="number"
                name="closeTime"
                defaultValue={scheduleDefaultSettings.settings.closeTime}
                required
                min={0}
                max={24}
                className="font-light border shadow-inner border-slate-300 rounded focus:border-slate-400 focus:outline-none p-1 w-full"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-200 shadow-sm rounded p-1 hover:bg-blue-100 transition-colors"
          >
            Create Schedule
          </button>
        </form>
      </Modal>

      <ManagerNavbar />

      <div className="flex flex-col justify-start items-center bg-slate-100 w-screen min-h-screen text-lg">
        <h1 className="text-3xl font-semibold pt-8">Recent Schedules</h1>

        <ul className="px-16 py-8 w-full flex flex-row justify-center items-stretch gap-12">
          {recent.map((schedule) => {
            return (
              <NavLink
                key={"schedule-id:" + schedule._id}
                to={`/mgr/scheduler/${schedule._id}`}
                className="bg-slate-50 border border-slate-300 rounded-md shadow-md hover:-translate-y-2 transition-all"
              >
                <li className="">
                  <div className="w-full h-1/4 inline-flex flex-row gap-4 p-4 bg-blue-100 justify-center items-center">
                    <p className="font-semibold">
                      {formatDateRange(
                        new Date(schedule.startDate),
                        add(new Date(schedule.startDate), { days: 6 })
                      )}
                    </p>

                    {schedule.markedAsComplete ? (
                      <IoMdCheckmark className="text-2xl" />
                    ) : (
                      <div />
                    )}
                    {schedule.goalsMet ? (
                      <div />
                    ) : (
                      <IoMdAlarm className="text-2xl" />
                    )}
                  </div>

                  <div className="p-4 w-full">
                    {schedule.markedAsComplete ? (
                      <p>Completed</p>
                    ) : (
                      <p>Not Completed</p>
                    )}
                    {schedule.goalsMet ? (
                      <div />
                    ) : (
                      <div>Schedule Issues Here</div>
                    )}
                  </div>
                </li>
              </NavLink>
            );
          })}

          <li className="">
            <div
              onClick={open}
              className="flex flex-col border border-slate-300 shadow-md rounded w-full h-full px-20 justify-center items-center hover:-translate-y-2 transition-all cursor-pointer"
            >
              <p className="text-4xl">+</p>
            </div>
          </li>
        </ul>

        <ScheduleTableView />
      </div>
    </div>
  );
}

export default SchedulerHome;
