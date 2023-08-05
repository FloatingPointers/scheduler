import React, { useEffect, useState } from "react";
import {
  IconClockHour3,
  IconForbid,
  IconCheck,
  IconTrash,
  IconTrashFilled,
} from "@tabler/icons-react";
import formatDateRange from "../../data/dateRange";

function Request(props) {
  const { title, description, start, end, status } = props.data;
  const { allowDelete, deleteReq } = props;

  const statusInfo = {
    PENDING: {
      color: "text-orange-600",
      icon: <IconClockHour3 className="mt-1" />,
    },
    APPROVED: {
      color: "text-green-600",
      icon: <IconCheck className="mt-1" />,
    },
    DENIED: {
      color: "text-red-600",
      icon: <IconForbid className="mt-1" />,
    },
  };

  const startDate = new Date(start);
  const endDate = new Date(end);

  return (
    <div className="flex items-center gap-12">
      <div className="px-8 py-4 w-8/12 shadow-lg rounded-md border border-slate-300 mb-4">
        <h3 className="text-3xl font-semibold mb-2">{title}</h3>
        <div className="flex justify-between">
          <p className="text-xl mb-2 inline-flex gap-2">
            Status:
            <span className={[statusInfo[status].color + " "]}> {status} </span>
            {statusInfo[status].icon}
          </p>
          <p className="text-xl mb-2">
            Period:{" "}
            {formatDateRange(
              new Date(
                startDate.getUTCFullYear(),
                startDate.getUTCMonth(),
                startDate.getUTCDate()
              ),
              new Date(
                endDate.getUTCFullYear(),
                endDate.getUTCMonth(),
                endDate.getUTCDate()
              )
            )}
          </p>
        </div>
        <p className="text-lg mb-2">Description: {description}</p>
      </div>

      {allowDelete ? (
        <button
          onClick={deleteReq}
          className="rounded-full border-2 text-slate-400 border-slate-500 active:text-white active:bg-red-500 active:border-red-300 active:border-4 w-24 h-24 flex justify-center items-center transition hover:opacity-100 opacity-30"
        >
          <IconTrash className=" w-12 h-12" />
        </button>
      ) : (
        ""
      )}
    </div>
  );
}

export default Request;
