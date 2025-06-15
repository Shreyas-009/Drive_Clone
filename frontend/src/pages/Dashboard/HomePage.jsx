import React, { useEffect, useState } from "react";
import Stats from "./Stats";
import Recent from "./Recent";
import FolderPopup from "./FolderPopup";
import axios from "axios";
import api from "../../utils/api";
import SharedFiles from "../Shared/SharedFiles";

//
function HomePage({ open, data, data2, isFolderOpen, toggleFolder, preview }) {
  const [folderFiles, setFolderFiles] = useState();
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [shared, setShared] = useState([]);
  const handleFolderClick = async (folderId) => {
    try {
      const response = await axios.get(`${api}folders/${folderId._id}/files`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setFolderFiles(Array.isArray(response.data) ? response.data : []);
      setSelectedFolder(folderId);
    } catch (error) {
      console.error("Error fetching folder files:", error);
    }
  };

  const handleGoBack = () => {
    setSelectedFolder(null); // Reset selected folder
    setFolderFiles([]); // Clear folder files
  };

  const handleUpload = (folderId) => {
    open(true, folderId); // Pass the folder ID to the open function
  };
  const fetchSharedFiles = async () => {
    const email = localStorage.getItem("email");
    const token = localStorage.getItem("token") || "";
    if (token) {
      try {
        const res = await axios.get(`${api}files/sharedfile?email=${email}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.data && res.data.files) {
          setShared(res.data.files);
        } else {
          setShared([]); // Set empty array if no files found
        }
      } catch (error) {
        console.log(error);
        setShared([]); // Set empty array on error
      }
    }
  };
  useEffect(() => {
    fetchSharedFiles();
  }, []);

  return (
    <div className="font-inter relative top-14 md:top-16 lg:top-20 p-2  bg-white h-[100%] ">
      <div className="flex w-[78%] md:w-[88%] lg:w-[84%] justify-between items-center top-14 md:top-16 lg:top-20  bg-white pt-2 pb-4 md:pb-6  z-10 fixed ">
        <h1 className="text-lg md:text-xl lg:text-2xl flex   font-[400] ">
          Welcome To Drive
        </h1>

        <div className="flex gap-1 justify-evenly ">
          <button className="btnAction1 z-20" onClick={toggleFolder}>
            <p className="hidden lg:block">Create</p>
            <i className="fa-regular fa-plus  "></i>
          </button>
          <button className="btnAction2 z-20 " onClick={() => open(true)}>
            <p className="hidden lg:block ">Upload</p>
            <i className="fa-solid fa-arrow-up-from-bracket"></i>
          </button>
        </div>
      </div>
      <div className="mt-14 md:mt-16 lg:mt-20">
        <Stats data={data} data2={data2} />
        <div className="mt-2">
          <Recent
            data={selectedFolder ? folderFiles : data}
            onFolderClick={handleFolderClick}
            selectedFolder={selectedFolder}
            handleGoBack={handleGoBack}
            preview={preview}
            data2={data2}
            open={open}
            handleUpload={handleUpload}
          />
        </div>
      </div>
      <div className="p-1">
        {shared.length > 0 && !selectedFolder ? (
          <SharedFiles
            preview={preview}
            data={shared}
            text={"Shared with me"}
          />
        ) : !selectedFolder ? (
          <div className="mt-8">
            <h2 className="text-lg md:text-xl lg:text-2xl mt-2 lg:mt-4">
              Shared with me
            </h2>
            <div className="flex flex-col items-center justify-center py-6 bg-[#e7e7e763] rounded-lg my-2">
              <div className="bg-white rounded-full p-4 mb-3">
                <img
                  src="/Logo/Recent/share.svg"
                  alt="No shared files"
                  className="w-8 h-8 opacity-60"
                />
              </div>
              <p className="text-gray-600 text-sm md:text-base text-center">
                No files have been shared with you yet
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default HomePage;
