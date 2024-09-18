// eslint-disable-next-line no-unused-vars
import React from "react";
import phoneImage from "/assets/phone.png";
import svgimage from "/assets/desktop.svg";
import icon1 from "/assets/icon1.jpeg";
import icon2 from "/assets/icon2.jpeg";
import icon3 from "/assets/icon3.jpeg";
import icon4 from "/assets/icon4.jpeg";
import icon5 from "/assets/icon5.jpeg";
import icon6 from "/assets/icon6.jpeg";

function Partner() {
  return (
    <div className="p-16">
      {/* Trusted by section */}
      <div className="whitespace-pre-wrap tracking-widest text-center mb-6">
        <h2 className="text-4xl font-bold">
          We are trusted by 1000+ industries
        </h2>
      </div>

      {/* Icon image section */}
      <div className="w-1/3 grid grid-cols-3 justify-evenly items-center mx-auto gap-6">
        <img src={icon5} className="h-28 w-28 object-cover "></img>
        <img src={icon6} className="h-28 w-28 object-cover "></img>
        <img src={icon1} className="h-28 w-28 object-cover "></img>
        <img src={icon2} className="h-28 w-28 object-cover "></img>
        <img src={icon4} className="h-28 w-28 object-fill "></img>
        <img src={icon3} className="h-28 w-28 object-cover"></img>
        {/* <div className='h-14 w-28 bg-gray-400'></div>
           <div className='h-14 w-28 bg-gray-400'></div>
           <div className='h-14 w-28 bg-gray-400'></div>
           <div className='h-14 w-28 bg-gray-400'></div>
           <div className='h-14 w-28 bg-gray-400'></div> */}
      </div>

      {/* Products Section */}
      <div className="mb-4">
        <div className="text-[#004646] mb-1 ">
          <b className="text-2xl">Our Products</b>
        </div>
        <div className="text-2xl sm:text-4xl font-medium mb-1">
          We offer various solutions to help you efficiently manage your files.
        </div>
        <div>
          Our platform is designed to enable you to access your files anywhere
          and at any time. Automatic backup, remote access, and easy file
          sharing ensure that your data is always available when you need it.
        </div>
      </div>

      {/* Product features section */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Feature 1 */}
        <div className="flex flex-col lg:flex-row items-center gap-4  rounded-lg p-2">
          <img
            src={phoneImage}
            className="h-44 w-full sm:w-72 lg:w-60 mb-4 lg:mb-0"
            alt="Phone"
          />
          <div>
            <div className="text-xl font-medium">
              Built-in protection against malware, spam, and ransomware.
            </div>
            <div className="flex flex-wrap">
              Drive can encrypt and secure your files. Files shared with you can
              be inspected and removed if malware, spam, ransomware, or phishing
              are discovered. Drive is cloud-native, eliminating the need for
              local files and reducing device risks.
            </div>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="flex flex-col lg:flex-row items-center  rounded-lg   ">
          <div>
            <div className="text-xl font-medium mb-2">
              {`"Websites that prioritize cooperation centered around people can
                improve teamwork."`}
            </div>
            <div>
              Drive collaborates with Docs, Sheets, and Slides, allowing teams
              to create and collaborate in real time.
            </div>
          </div>
        </div>
      </div>

      {/* Second product features section */}
      <div className="flex flex-col lg:flex-row gap-4 p-12">
        {/* Feature 3 */}
        <div className="flex flex-col lg:flex-row items-center  rounded-lg  w-full lg:w-1/2 ">
          <div>
            <div className="text-xl font-medium ">
              Make sure to integrate with your team's current tools and
              applications.
            </div>
            <div>
              Drive integrates and enhances your team's current technology. It
              allows editing and storing of over 100 file types, including PDFs,
              CAD files, and photos, without the need for file format
              conversion.
            </div>
          </div>
        </div>

        {/* Feature 4 */}
        <div className="flex flex-col lg:flex-row items-center  rounded-lg gap-8 px-4 ">
          <img
            src={svgimage}
            className="h-36 w-full sm:w-72 lg:w-72 mb-4 lg:mb-0"
            alt="Image"
          />
          <div>
            <div className="text-xl font-medium ">
              Google's search and AI technologies accelerate team productivity.
            </div>
            <div>
              Drive integrates Google's powerful search capabilities, offering
              rapid, dependable, and collaborative results. Drive search chips
              deliver quicker access to crucial files for your team.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Partner;
