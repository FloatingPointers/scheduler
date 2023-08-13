import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import "../../styles/manager.css";
import ManagerNavbar from "../../components/manager-components/ManagerNavbar";
import { generateDummySchedule } from "../../test/TestingFunctions.js";
import { format, add } from "date-fns";
import axiosInstance from "../../Axios";

function DailyView() {
  const [scheduleInfo, setScheduleInfo] = useState(generateDummySchedule());
  const params = useParams();

  //Handle page load
  useEffect(() => {
    console.log("Initialize daily schedule overview with id: " + params.id);
    axiosInstance
      .get(`/scheduler/overview/${params.id}/status`)
      .then((res) => {
        console.log("Updated day info");
        setScheduleInfo(res.data);
      })
      .catch((err) => {
        console.error("Error getting daily information");
        console.error(err);
      });
  }, []);

  const handleCompletionToggle = async () => {
    axiosInstance
      .post(`/scheduler/update/${params.id}`, {
        markedAsComplete: !scheduleInfo.markedAsComplete,
      })
      .then((res) => {
        console.log(`Updated schedule completion status ${res.data.success}`);
        setScheduleInfo({
          ...scheduleInfo,
          markedAsComplete: !scheduleInfo.markedAsComplete,
        });
      })
      .catch((err) => {
        console.error("Error updating schedule completion status");
        console.error(err);
      });
  };

  const handleArchiveToggle = async () => {
    axiosInstance
      .post(`/scheduler/update/${params.id}`, {
        archived: !scheduleInfo.archived,
      })
      .then((res) => {
        console.log(`Updated schedule archival status ${res.data.success}`);
        setScheduleInfo({ ...scheduleInfo, archived: !scheduleInfo.archived });
      })
      .catch((err) => {
        console.error("Error updating schedule archival status");
        console.error(err);
      });
  };

  return (
    <div>
      <ManagerNavbar />
      <div className="bg-slate-100 w-screen min-h-screen p-12 ">
        <div className="flex flex-col items-center justify-top gap-8 w-full px-12 ">
          <h1 className="text-4xl font-bold mb-4">
            {console.log(scheduleInfo.startDate)}
            Week of {format(new Date(scheduleInfo.startDate), "MMMM dd")}
          </h1>

          <ul className="flex flex-row w-full h-auto gap-4 justify-center items-stretch">
            {scheduleInfo.day.map((day, index) => {
              return (
                <NavLink
                  key={"schedule-id:" + scheduleInfo._id + "_day:" + index}
                  to={`/mgr/scheduler/editor/${scheduleInfo._id}/${index}`}
                  className={
                    "w-full bg-white border border-slate-100 rounded-lg shadow drop-shadow-sm text-xl hover:-translate-y-4 transition-all cursor-pointer "
                  }
                >
                  <li>
                    <div className="w-full h-1/4 flex flex-row justify-center items-center p-2 bg-blue-100">
                      <p className="text-blue-500 text-2xl font-semibold ">
                        {format(
                          add(new Date(scheduleInfo.startDate), {
                            days: index - 1,
                          }),
                          "eeee"
                        )}
                      </p>
                    </div>

                    <div className="p-4 text-md">
                      <p>
                        {scheduleInfo.day[index].markedAsComplete
                          ? "Completed"
                          : "Not Completed"}
                      </p>
                      <p>
                        {scheduleInfo.day[index].goalsMet ? "" : "Issues Here"}
                      </p>
                    </div>
                  </li>
                </NavLink>
              );
            })}
          </ul>

          <div className="bg-white rounded-lg shadow-xl border border-slate-100 p-6 mt-8 w-full max-w-lg flex flex-col text-xl">
            <h2 className="text-2xl font-bold mb-2">
              Schedule Information and Options
            </h2>

            <table className="my-2">
              <thead>
                <tr className="p-2 bg-slate-200">
                  <th className="text-left p-2">Setting</th>
                  <th className="text-left p-2">Value</th>
                </tr>
              </thead>
              <tbody className="bg-slate-100">
                <tr>
                  <td className="p-2">Visibility</td>
                  <td className="p-2">
                    {scheduleInfo.markedAsComplete
                      ? "Published"
                      : "Not Published"}
                  </td>
                </tr>
                <tr>
                  <td className="p-2">Status</td>
                  <td className="p-2">
                    {scheduleInfo.archived ? "Archived" : "Not Archived"}
                  </td>
                </tr>
                <tr>
                  <td className="p-2">Hours</td>
                  <td className="p-2">
                    {(scheduleInfo.startTime
                      ? format(new Date(scheduleInfo.startTime), "ha")
                      : "") +
                      " - " +
                      (scheduleInfo.endTime
                        ? format(new Date(scheduleInfo.endTime), "ha")
                        : "")}
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="flex flex-row w-full justify-between py-4 px-8">
              <div
                className={
                  "cursor-pointer text-white transition-all rounded text-center py-1 px-2 " +
                  (scheduleInfo.markedAsComplete
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-green-500 hover:bg-green-600")
                }
                onClick={handleCompletionToggle}
              >
                {scheduleInfo.markedAsComplete
                  ? "Unpublish Schedule"
                  : "Publish Schedule"}
              </div>
              <div
                className={
                  "cursor-pointer text-white transition-all rounded text-center py-1 px-2 " +
                  (scheduleInfo.archived
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-red-500 hover:bg-red-600")
                }
                onClick={handleArchiveToggle}
              >
                {scheduleInfo.archived
                  ? "Unarchive Schedule"
                  : "Archive Schedule"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DailyView;
