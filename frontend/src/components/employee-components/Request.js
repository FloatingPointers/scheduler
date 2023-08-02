import React, { useEffect, useState } from "react";
import { IconClockHour3 } from "@tabler/icons-react";
import { IconForbid } from "@tabler/icons-react";
import { IconCheck } from "@tabler/icons-react";
import { format } from "date-fns";

function Request(props) {
  const { title, description, start, end, status } = props.data;

  const formatDateRange = (startDate, endDate) => {
    const first = format(startDate, "LLL do");
    let second = null;
    if (startDate.getMonth() === endDate.getMonth()) {
      second = format(endDate, "do");
    } else {
      second = format(endDate, "LLL do");
    }
    return first + " - " + second;
  };

  const statusInfo = {
    PENDING: { color: "text-orange-600", icon: <IconClockHour3 /> },
    APPROVED: { color: "text-green-600", icon: <IconCheck /> },
    DENIED: { color: "text-red-600", icon: <IconForbid /> },
  };

  return (
    <div className="px-8 py-4 shadow-lg rounded-md border border-slate-300 mb-4">
      <h3 className="text-3xl font-semibold mb-2">{title}</h3>
      <p className="text-lg mb-2 inline-flex gap-2">
        Status:
        <span className={[statusInfo[status].color + " "]}> {status} </span>
        {statusInfo[status].icon}
      </p>
      <p className="text-lg mb-2">
        Period: {formatDateRange(new Date(start), new Date(end))}
      </p>
      <p className="text-md mb-2">Description: {description}</p>
    </div>
  );
}

export default Request;
