import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { add, format } from "date-fns";
import { IconClockHour3, IconForbid, IconCheck } from "@tabler/icons-react";
import formatDateRange from "../../data/dateRange";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Group } from "@mantine/core";

function RequestTable(props) {
  const navigate = useNavigate();
  const [word, setWord] = useState("(ERROR: EXIT MODAL)");
  const [id, setId] = useState("");
  const [opened, { open, close }] = useDisclosure(false);
  const { display, pending, setStatus } = props;

  const statusInfo = {
    APPROVED: {
      color: "text-green-600",
      icon: <IconCheck className="mb-1" />,
    },
    DENIED: {
      color: "text-red-600",
      icon: <IconForbid className="mb-1" />,
    },
  };

  return (
    <div>
      <Modal
        opened={opened}
        onClose={close}
        title="Confirmation"
        classNames={{ title: "text-xl font-bold" }}
      >
        <h3 className="text-lg">
          Are you sure you want to {word} this request?{" "}
        </h3>
        <div className="flex justify-end mt-12 gap-4">
          <Button
            onClick={() => {
              close();
              setStatus(id, word);
            }}
            className="text-white bg-green-500 hover:bg-green-600 text-2xl w-20 h-11"
          >
            Yes
          </Button>
          <Button
            onClick={() => {
              close();
            }}
            className="text-white bg-red-500 hover:bg-red-600 text-2xl w-20 h-11"
          >
            No
          </Button>
        </div>
      </Modal>
      <table className="block w-full">
        <thead className="">
          <tr className="text-xl">
            <th className="w-1/6 text-left font-semibold pl-4 pb-2">
              Employee Name
            </th>
            <th className="w-1/6 text-left font-semibold pl-4 pb-2">Title</th>
            <th className="w-2/5 text-left font-semibold pb-2">Description</th>
            <th className="w-1/4 text-left font-semibold pb-2">Period</th>
            {!pending && (
              <th className="w-[1%] text-left font-semibold pb-2">Status</th>
            )}
            {pending && (
              <th className="w-[1%] text-center font-semibold pb-2">Actions</th>
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
                <td className="pl-4 py-1">{request.senderTag.name}</td>
                <td className="pl-4 py-1">{title}</td>
                <td className="w-[1%] pr-4 pb-2 pt-1">{description}</td>
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
                {!pending && (
                  <td className={" w-full"}>
                    <div
                      className={[statusInfo[status].color] + " flex gap-1 "}
                    >
                      {status} {statusInfo[status].icon}
                    </div>
                  </td>
                )}
                {pending && (
                  <td className="w-2/3">
                    <div className=" flex flex-row gap-2 items-center justify-start ">
                      <button
                        className=" w-1/2 bg-slate-50 hover:bg-green-500 hover:border-green-500 hover:text-white text-green-400 font-semibold border-2 border-green-400 rounded-md p-2 transition-colors "
                        onClick={() => {
                          setWord("approve");
                          setId(request._id);
                          open();
                        }}
                      >
                        Approve
                      </button>
                      <button
                        className="w-1/2 bg-slate-50 hover:bg-red-500 hover:border-red-500 hover:text-white text-red-400 font-semibold border-2 border-red-400 rounded-md p-2 transition-colors"
                        onClick={() => {
                          setWord("deny");
                          setId(request._id);
                          open();
                        }}
                      >
                        Deny
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default RequestTable;
