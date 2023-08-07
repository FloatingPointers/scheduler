import React, { useEffect, useState } from "react";
import Navbar from "../../components/employee-components/Navbar";
import { Tabs } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, TextInput } from "@mantine/core";
import "../../styles/employee.css";
import axiosInstance from "../../Axios";
import Request from "../../components/app-components/Request";

function ManagerRequests() {
  const [activeRequests, setActiveRequests] = useState([]);
  const [archived, setArchived] = useState([]);

  const [opened, { open, close }] = useDisclosure(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const getRequests = async (update = false) => {
    try {
      if (activeRequests.length !== 0 && !update) {
        return;
      }
      const res = await axiosInstance.get(
        "/ManagerRequests/request/getPage/0/false"
      );
      setActiveRequests(res.data);
    } catch (err) {
      console.log("Error:", err);
    }
  };
  const getArchived = async () => {
    try {
      if (archived.length !== 0) {
        return;
      }
      const res = await axiosInstance.get(
        "/ManagerRequests/request/getPage/0/true"
      );
      setArchived(res.data);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const deleteRequest = async (id) => {
    try {
      const res = await axiosInstance.delete(
        `/ManagerRequests/request/delete/${id}`
      );
      console.log(res.data.success);
      if (res.data.success) {
        getRequests(true);
      }
    } catch (err) {
      console.log("Error:", err);
    }
  };

  useEffect((activeRequests, archived) => {
    getRequests();
    getArchived();
  }, []);

  const submitRequest = async (e) => {
    e.preventDefault();

    setSubmitLoading(true);

    let params = {
      title: e.target.title.value,
      description: e.target.description.value,
      start: e.target.start.value,
      end: e.target.end.value,
    };

    try {
      const res = await axiosInstance.post(
        "/ManagerRequests/request/create",
        params
      );
      if (!res.data.error) {
        close();
        await getRequests(true);
      }
      setSubmitLoading(false);
    } catch (err) {
      console.log("ERROR: Create Employee Req: " + err);
      setSubmitLoading(false);
    }
  };

  return (
    <div className="flex justify-center w-screen bg-slate-100">
      <Modal
        opened={opened}
        onClose={close}
        title="New Request"
        classNames={{ body: "p-6" }}
      >
        <form onSubmit={submitRequest}>
          <div className="inline-flex flex-col gap-2 w-full mb-1">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              required
              className="font-light border shadow-inner border-slate-300 rounded focus:border-slate-400 focus:outline-none p-1 w-full"
            />
          </div>
          <div className="inline-flex flex-col gap-2 w-full mb-2">
            <label htmlFor="description">
              Description{" "}
              <span className="italic text-xs">(300 character max)</span>
            </label>
            <textarea
              type="text"
              name="description"
              required
              maxLength="300"
              className="font-light border shadow-inner border-slate-300 rounded focus:border-slate-400 focus:outline-none p-1 w-full h-24 resize-none leading-tight"
            />
          </div>
          <div className="flex gap-2 w-full mb-1">
            <div>
              <label htmlFor="start">Start Date</label>
              <input
                type="date"
                name="start"
                required
                className="font-light border shadow-inner border-slate-300 rounded focus:border-slate-400 focus:outline-none p-1 w-full"
              />
            </div>
            <div>
              <label htmlFor="end">End Date</label>
              <input
                type="date"
                name="end"
                required
                className="font-light border shadow-inner border-slate-300 rounded focus:border-slate-400 focus:outline-none p-1 w-full"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              className="bg-blue-600 text-white py-3 px-6 rounded-lg mt-4 active:bg-blue-500 transition "
              type="submit"
              loading={submitLoading}
            >
              Submit
            </Button>
          </div>
        </form>
      </Modal>

      <Tabs defaultValue="active-requests" className="mt-4 w-10/12">
        <Tabs.List>
          <Tabs.Tab value="active-requests" color="blue">
            Active Requests
          </Tabs.Tab>
          <Tabs.Tab value="archived" color="red">
            Archived
          </Tabs.Tab>
        </Tabs.List>

        <div className="flex justify-end">
          <button
            className="bg-blue-600 mb-4 text-white p-3 rounded-md mt-4 active:bg-blue-500 transition"
            onClick={open}
          >
            Create New Request
          </button>
        </div>

        <Tabs.Panel value="active-requests">
          <div className="space-y-4 flex flex-col justify-center mt-4">
            {activeRequests.map((req) => (
              <div className="flex-col justify-center">
                <Request
                  data={req}
                  allowDelete={true}
                  deleteReq={() => {
                    deleteRequest(req._id);
                  }}
                />
              </div>
            ))}
          </div>
        </Tabs.Panel>

        <Tabs.Panel value="archived">
          {archived.map((req) => (
            <div className="flex-col justify-center">
              <Request data={req} allowDelete={false} />
            </div>
          ))}
        </Tabs.Panel>
      </Tabs>
    </div>
  );
}

export default ManagerRequests;
