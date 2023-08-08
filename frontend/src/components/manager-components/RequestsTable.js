import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { add, format } from "date-fns";
import { IconClockHour3, IconForbid, IconCheck } from "@tabler/icons-react";
import formatDateRange from "../../data/dateRange";

function RequestTable(props) {
  const navigate = useNavigate();
  const { display, pending } = props;

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

  return (
    <table className="block w-full">
      <thead className="">
        <tr className="text-xl">
          <th className="w-1/5 text-left font-semibold pl-4">Title</th>
          <th className="w-[1%] text-left font-semibold">Description</th>
          <th className="w-1/2 text-left font-semibold">Period</th>
          {!pending && (
            <th className="w-[1%] text-left font-semibold">Status</th>
          )}
          {pending && (
            <th className="w-[1%] text-left font-semibold">Actions</th>
          )}
        </tr>
      </thead>
      <tbody className="w-full text-md">
        {display.map((request, index) => {
          const { title, description, start, end, status } = request;
          const startDate = new Date(start);
          const endDate = new Date(end);
          return (
            <tr
              key={request._id}
              className={index % 2 === 0 ? "bg-slate-100" : ""}
            >
              <td className="pl-4 py-1 cursor-pointer">{title}</td>
              <td className="w-[1%]">{description}</td>
              <td>
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
              </td>
              {!pending && <td className="">{status}</td>}
              {pending && (
                <td className="w-2/3 flex flex-row justify-between items-center ">
                  <button>Approve</button>
                  <button>Deny</button>
                </td>
              )}
              {/* <button>Submit</button>
              <button>Cancel</button> */}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default RequestTable;
