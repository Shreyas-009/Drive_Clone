import React, { useEffect, useState } from "react";
import Navbar from "../Common/Navbar";
import Sidebar from "../Common/Sidebar";
import HomePage from "../MyDrive/MyDriveHome";
import PopupUpload from "../Dashboard/PopupUpload";
import FolderPopup from "../Dashboard/FolderPopup";
import axios from "axios";
import api from "../../utils/api";
import Preview from "../Common/Preview";
import Profile from "../Common/Profile";
import ProfilePopup from "../Common/ProfilePopup";
import SharePopup from "../Common/SharePopup";

const MyDrive = () => {
  const [isOpen, setOpen] = useState(false);
  const [selectedFolderID, setSelectedFolderId] = useState(null);
  const [isPreview, setPreview] = useState(false);
  const [isFolderOpen, setFolderOpen] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [userData, setuserData] = useState([]);
  const [previwData, setPreviewData] = useState("");
  const [isProfile, setProfile] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [isShared, setShared] = useState(false);

  //
  const fetchData = async () => {
    if (token) {
      try {
        const res = await axios.get(`${api}files/get-files`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res) {
          setData(res.data);

          // Try to get limit data, but don't fail if it doesn't exist
          try {
            const res2 = await axios.get(`${api}files/get-limit`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            if (res2 && res2.data) {
              setData2(res2.data);
            } else {
              setData2({
                total: "400",
                doc: "100",
                img: "100",
                other: "100",
                video: "100",
              });
            }
          } catch (limitError) {
            console.log("Limit data not available:", limitError);
            setData2({
              total: "400",
              doc: "100",
              img: "100",
              other: "100",
              video: "100",
            });
          }

          setPreviewData(res.data);
        }
      } catch (error) {
        console.log("Error fetching files:", error);
        setData([]);
        setData2({
          total: "400",
          doc: "100",
          img: "100",
          other: "100",
          video: "100",
        });
      }
    }
  };

  // Fetch files and limits when token changes
  useEffect(() => {
    fetchData();
  }, [token]);

  // Toggle the file upload popup and trigger re-fetch if closed
  const toggleUpload = (param, id) => {
    setSelectedFolderId(id);
    setOpen(param);

    if (!param) {
      // If the upload is finished (popup closed), fetch updated data
      fetchData(); // Re-fetch to get updated files list after upload
    }
  };

  // Toggle the folder creation popup
  const toggleFolder = () => {
    setFolderOpen((prev) => !prev);
    fetchData();
  };

  // Toggle the Preview Button
  const togglePreview = (param, data) => {
    setPreview(param);
    setPreviewData(data);
  };

  const toggleProfile = (param, data) => {
    setProfile(param);
    setuserData(data);
  };
  const toggleEdit = (param) => {
    setEdit(param);
  };

  const toggleShared = (param) => {
    setShared(param);
  };

  return (
    <div className="bg-gray-100">
      <Navbar profile={toggleProfile} />
      <div className="flex w-screen  h-[100vh] font-inter">
        <div className="w-[18%] md:w-[10%] lg:w-[15%]">
          {isProfile ? (
            <Profile
              data={userData}
              profile={toggleProfile}
              toggleEdit={toggleEdit}
            />
          ) : (
            <Sidebar data={data} data2={data2} />
          )}
        </div>

        <div className="w-[82%] bg-gray-100 md:w-[90%] lg:w-[85%]">
          <HomePage
            open={toggleUpload}
            data={data}
            data2={data2}
            isFolderOpen={isFolderOpen}
            toggleFolder={toggleFolder}
            preview={togglePreview}
          />
          {isEdit && <ProfilePopup open={toggleEdit} data={userData} />}{" "}
          {isOpen && (
            <PopupUpload
              open={toggleUpload}
              selectedFolderId={selectedFolderID}
              setSelectedFolderId={setSelectedFolderId}
            />
          )}{" "}
          {isFolderOpen && <FolderPopup toggle={toggleFolder} />}{" "}
          {isShared && (
            <SharePopup toggleShared={toggleShared} dataPreview={previwData} />
          )}{" "}
          {isPreview && (
            <Preview
              preview={togglePreview}
              dataPreview={previwData}
              toggleShared={toggleShared}
            />
          )}{" "}
        </div>
      </div>
    </div>
  );
};

export default MyDrive;
