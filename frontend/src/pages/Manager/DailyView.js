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

  const handleCompletionToggle = () => {
    axiosInstance
      .post(`/scheduler/update/${params.id}`, {
        markedAsComplete: !scheduleInfo.markedAsComplete,
      })
      .then((res) => {
        console.log(
          `Updated schedule completion status to ${res.data.markedAsComplete}`
        );
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

  return (
    <div>
      <ManagerNavbar />
      <div className="bg-slate-100 w-screen min-h-screen p-12 ">
        <div className="flex flex-col items-center justify-top gap-8 w-full px-12 ">
          <h1 className="text-4xl font-bold mb-4">
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
            <hr className="h-px bg-slate-200 border-0 mt-4 mb-4" />

            <table className="border-collapse border border-slate-200">
              <tbody>
                <tr>
                  <td className="border border-slate-200">Completion</td>
                  <td>
                    <DuoSelector
                      radioName="publicationStatus"
                      option1Name="published"
                      option2Name="unpublished"
                      defaultOption="1"
                    ></DuoSelector>
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-200">Status</td>
                  <td>Item 2</td>
                </tr>
              </tbody>
            </table>
            <button onClick={handleCompletionToggle}>
              {scheduleInfo.markedAsComplete ? "Unpublish" : "Publish"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DuoSelector(props) {
  const { option1Name, option2Name, radioName, defaultOption } = props;
  const [selected, setSelected] = useState(true); // true = option 1 selected

  return (
    <div className="flex flex-row w-full h-full justify-center items-stretch">
      <div>
        <input
          type="radio"
          id={`${radioName}${option1Name}`}
          name={radioName}
          className="hidden peer"
          defaultChecked={defaultOption && defaultOption === "1"}
        ></input>
        <label
          for={`${radioName}${option1Name}`}
          className="p-1 bg-red-500 peer-checked:bg-green-500"
        >
          {option1Name}
        </label>
      </div>
      <div>
        <input
          type="radio"
          id={`${radioName}${option2Name}`}
          name={radioName}
          className="hidden peer"
          defaultChecked={defaultOption && defaultOption === "2"}
        ></input>
        <label
          for={`${radioName}${option2Name}`}
          className="p-1 bg-red-500 peer-checked:bg-green-500 "
        >
          {option2Name}
        </label>
      </div>
    </div>
  );
}

export default DailyView;
