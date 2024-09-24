import React, { useState } from "react";
import Stats from "./Stats";
import Recent from "./Recent";
import FolderPopup from "./FolderPopup";
import axios from "axios";
import api from "../../utils/api";

function HomePage({ open, data, data2, isFolderOpen, toggleFolder, preview }) {
  const [folderFiles, setFolderFiles] = useState();
  const [selectedFolder, setSelectedFolder] = useState(null);
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

  return (
    <div className="font-inter absolute top-16 left-72 w-[80%] h-[100%]">
      <div className="flex justify-evenly items-center pb-2 w-[80%] bg-white h-[20%] z-10 fixed">
        <h1 className="text-2xl w-[75%] font-[400]">Welcome To Drive</h1>
        <button className="btnAction1" onClick={toggleFolder}>
          Create
          <span>
            <svg
              width="13"
              height="12"
              viewBox="0 0 13 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.5003 6.83171H7.33366V10.9984C7.33366 11.2194 7.24586 11.4313 7.08958 11.5876C6.9333 11.7439 6.72134 11.8317 6.50033 11.8317C6.27931 11.8317 6.06735 11.7439 5.91107 11.5876C5.75479 11.4313 5.66699 11.2194 5.66699 10.9984V6.83171H1.50033C1.27931 6.83171 1.06735 6.74391 0.91107 6.58763C0.75479 6.43135 0.666992 6.21939 0.666992 5.99837C0.666992 5.77736 0.75479 5.5654 0.91107 5.40912C1.06735 5.25284 1.27931 5.16504 1.50033 5.16504H5.66699V0.998372C5.66699 0.777359 5.75479 0.565397 5.91107 0.409117C6.06735 0.252836 6.27931 0.165039 6.50033 0.165039C6.72134 0.165039 6.9333 0.252836 7.08958 0.409117C7.24586 0.565397 7.33366 0.777359 7.33366 0.998372V5.16504H11.5003C11.7213 5.16504 11.9333 5.25284 12.0896 5.40912C12.2459 5.5654 12.3337 5.77736 12.3337 5.99837C12.3337 6.21939 12.2459 6.43135 12.0896 6.58763C11.9333 6.74391 11.7213 6.83171 11.5003 6.83171Z"
                fill="#004646"
              />
            </svg>
          </span>
        </button>
        <button className="btnAction2" onClick={() => open(true)}>
          Upload
          <span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.16634 10.3333V3.54159L3.99967 5.70825L2.83301 4.49992L6.99967 0.333252L11.1663 4.49992L9.99967 5.70825L7.83301 3.54159V10.3333H6.16634ZM1.99967 13.6666C1.54134 13.6666 1.14912 13.5035 0.823008 13.1774C0.496897 12.8513 0.333563 12.4588 0.333008 11.9999V9.49992H1.99967V11.9999H11.9997V9.49992H13.6663V11.9999C13.6663 12.4583 13.5033 12.8508 13.1772 13.1774C12.8511 13.5041 12.4586 13.6671 11.9997 13.6666H1.99967Z"
                fill="white"
              />
            </svg>
          </span>
        </button>
      </div>
      <Stats data={data} data2={data2} />
      <Recent
        data={selectedFolder ? folderFiles : data}
        onFolderClick={handleFolderClick}
        selectedFolder={selectedFolder}
        handleGoBack={handleGoBack}
        preview={preview}
        data2={data2}
        open={open}
      />
      {isFolderOpen && <FolderPopup toggle={toggleFolder} />}
    </div>
  );
}

export default HomePage;
