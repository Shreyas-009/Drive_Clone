import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../../utils/api";
import setTime from "../../utils/timeConverter";
import { checkType } from "../../utils/fileType";

const Shared = ({ preview }) => {
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
        if (res) {
          setData(res.data.files);
        }
      } catch (error) {
        console.log(error);
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
    <div className="font-inter relative top-14 md:top-16 lg:top-20 p-2 bg-white h-[100%]">
      <div className="flex w-[78%] md:w-[88%] lg:w-[84%] justify-between items-center top-14 md:top-16 lg:top-20 bg-white py-2 z-10 fixed">
        <h1 className="text-lg md:text-xl lg:text-2xl md:pb-4 lg:pb-4 font-[400]">
          Shared With Me
        </h1>
      </div>
      <div className="mt-14 md:mt-16 lg:mt-20">
        <>
          <h2 className="text-lg md:text-xl lg:text-2xl mt-2 lg:mt-4">Files</h2>
          {/* Filter files to show only those with folderId: null */}
          {data.map((item, i) => (
            <div
              key={i}
              className="flex w-full cursor-pointer justify-between p-3 my-2 items-center bg-[#e7e7e763] text-[12px] font-inter rounded-[16px] hover:bg-[#e7e7e7a2]"
            >
              <div className="itemName flex items-center w-[70%] md:w-[25%]">
                <img
                  src={
                    fileTypes[item.fileName] === "Document"
                      ? "/Logo/Recent/doc.svg"
                      : fileTypes[item.fileName] === "Video"
                      ? "/Logo/Recent/video.svg"
                      : fileTypes[item.fileName] === "Image"
                      ? "/Logo/Recent/image.svg"
                      : "/Logo/Recent/other.svg"
                  }
                  alt=""
                  className="w-5"
                />
                <p
                  onClick={() => preview(true, item)}
                  className="mx-2 hover:underline truncate"
                >
                  <span className="block sm:max-w-[15ch] md:max-w-[20ch] lg:max-w-none">
                    {item.fileName}
                  </span>
                </p>
              </div>

              <div className="flex items-center gap-2 justify-evenly w-[20%] md:w-[75%]">
                <div className="size hidden md:block lg:block">
                  <p>{(item.size / 1024 / 1024).toFixed(1)} MB</p>
                </div>
                <div className="type hidden md:block lg:block">
                  <p>
                    {fileTypes[item.fileName] === "Document"
                      ? "Document"
                      : fileTypes[item.fileName] === "Video"
                      ? "Video"
                      : fileTypes[item.fileName] === "Image"
                      ? "Image"
                      : "Other"}
                  </p>
                </div>
                <div className="accessTime hidden md:block lg:block">
                  <p>Last Opened {setTime(item.lAccess) || ""}</p>
                </div>
                <div className="accessName hidden md:block lg:block">
                  <p>{item.lName}</p>
                </div>
              </div>
            </div>
          ))}
        </>
      </div>
    </div>
  );
};

export default Shared;
