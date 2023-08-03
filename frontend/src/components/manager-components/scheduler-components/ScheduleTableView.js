import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { add, format } from "date-fns";
import {
  IoMdCheckmark,
  IoMdAlarm,
  IoMdDownload,
  IoIosArchive,
  IoMdCreate,
} from "react-icons/io";
import axiosInstance from "../../../Axios";
import ScheduleTable from "./ScheduleTable";

function ScheduleTableView() {
  const [showArchived, setShowArchived] = useState(false);

  const [schedules, setSchedules] = useState([]);
  const [archivedSchedules, setArchivedSchedules] = useState([]);
  const [page, setPage] = useState(0);
  const [archivedPage, setArchivedPage] = useState(0);
  const [maxPage, setMaxPage] = useState(999);
  const [maxArchivedPage, setMaxArchivedPage] = useState(999);

  /*
  ============
  GET REQUESTS
  ============
  */

  //Gets a page of non-archived schedules
  const updatePage = async (value) => {
    if (value < 0) {
      return;
    }

    axiosInstance
      .get(`/scheduler/paginatedSchedules/${value}/false`)
      .then((res) => {
        if (!res.data || res.data.length === 0) return;
        setSchedules(res.data);
      })
      .catch((err) => {});
  };

  //Gets a page of archived schedules
  const updateArchivedPage = async (value) => {
    if (value < 0) {
      return;
    }

    axiosInstance
      .get(`/scheduler/paginatedSchedules/${value}/true`)
      .then((res) => {
        if (!res.data || res.data.length === 0) return;
        setArchivedSchedules(res.data);
      })
      .catch((err) => {});
  };

  //Updates the max number of pages for non-archived schedules
  const updateMaxPages = async () => {
    axiosInstance
      .get("/scheduler/maxSchedulePages/false")
      .then((res) => {
        setMaxPage(res.data.maxPages);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const updateMaxArchivedPages = async () => {
    axiosInstance
      .get(`/scheduler/maxSchedulePages/true`)
      .then((res) => {
        setMaxArchivedPage(res.data.maxPages);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  /*
  ============
  UPDATE HOOKS
  ============
  */

  //Handle page change for non-archived schedules
  useEffect(() => {
    if (page < 0) {
      setPage(0);
      return;
    }

    if (page > maxPage && maxPage !== 0) {
      setPage(maxPage);
      return;
    }

    console.log("Set page: " + page + " max: " + maxPage);

    updatePage(page);
  }, [page]);

  //Handle page change for archived schedules
  useEffect(() => {
    if (archivedPage < 0) {
      setArchivedPage(0);
      return;
    }

    if (archivedPage > maxArchivedPage && maxArchivedPage !== 0) {
      setArchivedPage(maxArchivedPage);
      return;
    }

    updateArchivedPage(archivedPage);
  }, [archivedPage]);

  //Component initialization
  useEffect(() => {
    //Get archived and normal schedule pages
    updateArchivedPage(0);
    updatePage(0);
    updateMaxArchivedPages();
    updateMaxPages();
  }, []);

  /*
  ==============
  BUTTON HANDLES
  ==============
  */

  const handleDownloadSchedule = (event) => {};

  const handleArchiveSchedule = (id, value) => {
    console.log("Archiving schedule: " + id);

    axiosInstance
      .post("/scheduler/archive", {
        id: id,
        archived: value,
      })
      .then((res) => {
        console.log("Updating page after archive");
        updatePage(page);
        updateArchivedPage(page);
        updateMaxArchivedPages();
        updateMaxPages();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  /*
  ======
  RENDER
  ======
  */

  return (
    <div className="w-full px-16 pt-8 pb-16">
      <div className="w-full bg-slate-50 border border-slate-200 rounded shadow-md p-6">
        <div className="flex flex-row w-full items-center justify-between space-between">
          <div className="flex flex-row gap-6">
            <h2
              className={
                "text-2xl cursor-pointer " +
                (showArchived ? "" : "font-semibold")
              }
              onClick={() => {
                console.log("showing not archived");
                setShowArchived(false);
              }}
            >
              All Schedules
            </h2>
            <h2
              className={
                "text-2xl cursor-pointer " +
                (showArchived ? "font-semibold" : "")
              }
              onClick={() => {
                console.log("showing archived");
                setShowArchived(true);
              }}
            >
              Archived
            </h2>
          </div>
          <p>Page {showArchived ? archivedPage + 1 : page + 1}</p>
        </div>

        <hr class="h-px bg-slate-200 border-0 mt-6 mb-6"></hr>

        <ScheduleTable
          display={showArchived ? archivedSchedules : schedules}
          handleArchiveSchedule={handleArchiveSchedule}
          handleDownloadSchedule={handleDownloadSchedule}
        />

        <div className="flex w-full flex-row justify-center items-center gap-4 pt-6">
          {(!showArchived && page > 0) || (showArchived && archivedPage) ? (
            <button
              className="bg-blue-200 shadow-sm rounded px-2 py-1 hover:bg-blue-100 transition-colors m-2"
              onClick={() => {
                if (showArchived) setArchivedPage(archivedPage - 1);
                else setPage(page - 1);
              }}
            >
              Prev Page
            </button>
          ) : (
            <div />
          )}
          {(showArchived && archivedPage === maxArchivedPage - 1) ||
          (!showArchived && page === maxPage - 1) ? (
            <div />
          ) : (
            <button
              className="bg-blue-200 shadow-sm rounded px-2 py-1 hover:bg-blue-100 transition-colors m-2"
              onClick={() => {
                if (showArchived) setArchivedPage(archivedPage + 1);
                else setPage(page + 1);
              }}
            >
              Next Page
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ScheduleTableView;
