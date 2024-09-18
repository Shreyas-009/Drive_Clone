import axios from "axios";
import React, { useState } from "react";
import OTPInput from "react-otp-input";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";

function Otp() {
const nav = useNavigate()
  const [otp, setOtp ] = useState("");
  const [email,setEmail] = useState(localStorage.getItem('email'))
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(api + "auth/verify-otp", {email ,otp });

      if (res.data) {
      
        localStorage.setItem('token',res.data.token)
        nav('/dashboard')
        
      } else {
        console.log("Unexpected response:", res);
      }
    } catch (error) {
      if (error.response) {
        console.log("Error from server:", error.response.data);
      } else if (error.request) {
        console.log("No response from server:", error.request);
      } else {
        console.log("Error in setting up the request:", error.message);
      }
    }
  };
  return (
    <section className="rightAuth w-[45%] h-full p-5 flex flex-col justify-center">
      <h1 className="text-4xl font-[400]">Please Verify Otp</h1>
      <p className="text-gray-400 font-[300] p-2">Setting-up your files</p>
      <form
        onSubmit={handleSubmit}
        className="p-2 flex flex-col justify-start items-start h-[22%] w-[50%]"
      >
        <OTPInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          inputStyle={{
            width: "3rem", // Set a fixed width for better visibility
            height: "3rem", // Set a fixed height for better visibility
            margin: "0 0 rem", // Add some margin for spacing
            fontSize: "1.5rem", // Increase font size for better visibility
            borderRadius: "0.5rem", // Slightly round the corners
            border: "1px solid #ccc", // Add a light border for definition
            textAlign: "center", // Center the text in each input
            outline: "red",
          }}
          inputType="tel"
          renderSeparator={<span className="w-2"></span>} // Adjust width as needed
          renderInput={(props) => <input {...props} />}
        />
         <button className='hover:scale-105 transition-all duration-300 my-4 p-2 bg-[#004646] flex justify-center items-center rounded-sm text-white w-[120px]' type="submit"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M481-781q106 0 200 45.5T838-604q7 9 4.5 16t-8.5 12q-6 5-14 4.5t-14-8.5q-55-78-141.5-119.5T481-741q-97 0-182 41.5T158-580q-6 9-14 10t-14-4q-7-5-8.5-12.5T126-602q62-85 155.5-132T481-781Zm0 94q135 0 232 90t97 223q0 50-35.5 83.5T688-257q-51 0-87.5-33.5T564-374q0-33-24.5-55.5T481-452q-34 0-58.5 22.5T398-374q0 97 57.5 162T604-121q9 3 12 10t1 15q-2 7-8 12t-15 3q-104-26-170-103.5T358-374q0-50 36-84t87-34q51 0 87 34t36 84q0 33 25 55.5t59 22.5q34 0 58-22.5t24-55.5q0-116-85-195t-203-79q-118 0-203 79t-85 194q0 24 4.5 60t21.5 84q3 9-.5 16T208-205q-8 3-15.5-.5T182-217q-15-39-21.5-77.5T154-374q0-133 96.5-223T481-687Zm0-192q64 0 125 15.5T724-819q9 5 10.5 12t-1.5 14q-3 7-10 11t-17-1q-53-27-109.5-41.5T481-839q-58 0-114 13.5T260-783q-8 5-16 2.5T232-791q-4-8-2-14.5t10-11.5q56-30 117-46t124-16Zm0 289q93 0 160 62.5T708-374q0 9-5.5 14.5T688-354q-8 0-14-5.5t-6-14.5q0-75-55.5-125.5T481-550q-76 0-130.5 50.5T296-374q0 81 28 137.5T406-123q6 6 6 14t-6 14q-6 6-14 6t-14-6q-59-62-90.5-126.5T256-374q0-91 66-153.5T481-590Zm-1 196q9 0 14.5 6t5.5 14q0 75 54 123t126 48q6 0 17-1t23-3q9-2 15.5 2.5T744-191q2 8-3 14t-13 8q-18 5-31.5 5.5t-16.5.5q-89 0-154.5-60T460-374q0-8 5.5-14t14.5-6Z"/></svg></button>
      
      </form>
    </section>
  );
}

export default Otp;
