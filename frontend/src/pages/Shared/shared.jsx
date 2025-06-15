import React, { useEffect, useState } from "react";
import Navbar from "../Common/Navbar";
import Sidebar from "../Common/Sidebar";
import SharedHome from "./SharedHome";
import axios from "axios";
import api from "../../utils/api";
import Preview from "../Common/Preview";
import Profile from "../Common/Profile";
import ProfilePopup from "../Common/ProfilePopup";

const Shared = () => {
  const [isPreview, setPreview] = useState(false);
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
          setPreviewData(res.data);

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

        <div className="w-[82%] bg-white md:w-[90%] lg:w-[85%]">
          <SharedHome preview={togglePreview} />
          {isEdit && <ProfilePopup open={toggleEdit} data={userData} />}
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

export default Shared;
