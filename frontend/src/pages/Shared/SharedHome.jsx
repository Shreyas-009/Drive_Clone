import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../../utils/api";
import { setTime, setDate } from "../../utils/timeConverter";
import { checkType } from "../../utils/fileType";
import SharedFiles from "./SharedFiles";

const SharedHome = ({ preview }) => {
  const [data, setData] = useState([]);
  const [fileTypes, setFileTypes] = useState({});
  const nav = useNavigate();
  const token = localStorage.getItem("token") || "";

  // Fetch shared files
  const fetchSharedFiles = async () => {
    const email = localStorage.getItem("email");
    if (!email) {
      nav("/");
    }

    if (token) {
      try {
        const res = await axios.get(`${api}files/sharedfile?email=${email}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.data && res.data.files) {
          setData(res.data.files);
        } else {
          setData([]);
        }
      } catch (error) {
        console.log("Error fetching shared files:", error);
        setData([]);
      }
    }
  };

  // Fetch file types based on the current data
  const fetchFileTypes = async () => {
    const types = await Promise.all(
      data.map(async (item) => {
        const category = await checkType(item.type);
        return { [item.fileName]: category };
      })
    );
    const fileTypesObj = types.reduce((acc, curr) => ({ ...acc, ...curr }), {});
    setFileTypes(fileTypesObj);
  };

  // Effect to fetch shared files when the component mounts
  useEffect(() => {
    fetchSharedFiles();
  }, []);

  // Effect to fetch file types whenever `data` changes
  useEffect(() => {
    if (data.length > 0) {
      fetchFileTypes();
    }
  }, [data]); // Only runs when `data` has changed

  return (
    <div className="font-inter relative top-14 md:top-16 lg:top-20 p-3 bg-white h-auto">
      <div className="flex w-[78%] md:w-[88%] lg:w-[84%] justify-between items-center top-14 md:top-16 bg-white lg:top-20 pt-2 pb-4 md:pb-6  z-10 fixed ">
        <h1 className="text-lg md:text-xl lg:text-2xl flex font-[400]">
          Shared With Me
        </h1>
      </div>
      <div className="mt-14 md:mt-16 lg:mt-20">
        {data && data.length > 0 ? (
          <SharedFiles preview={preview} data={data} />
        ) : (
          <div className="flex flex-col items-center justify-center py-10">
            <div className="bg-gray-100 rounded-full p-6 mb-4">
              <img
                src="/Logo/Recent/share.svg"
                alt="No shared files"
                className="w-10 h-10 md:w-16 md:h-16 opacity-50"
              />
            </div>
            <h3 className="text-xl md:text-2xl font-medium text-gray-700 mb-2">
              No files shared with you
            </h3>
            <p className="text-gray-500 text-center max-w-md">
              When someone shares files or folders with you, they will appear
              here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SharedHome;
