import React from "react";
import phoneImage from "/Logo/phone.png";
import svgimage from "/Logo/desktop.svg";
import icon1 from "/Logo/icon1.jpeg";
import icon2 from "/Logo/icon2.jpeg";
import icon3 from "/Logo/icon3.jpeg";
import icon4 from "/Logo/icon4.jpeg";
import icon5 from "/Logo/icon5.jpeg";
import icon6 from "/Logo/icon6.jpeg";

function Partners() {
  return (
    <div className="p-8 py-4 px-10">
      <div className="">
        <h2 className="text-4xl font-bold text-center">We are trusted by 1000+ industries</h2>
        <div className="w-full py-5 gap-6 grid grid-cols-3 place-items-center">
          <img src={icon2} className="h-20 w-28 object-cover"></img>
          <img src={icon1} className="h-20 w-28 object-cover"></img>
          <img src={icon5} className="h-20 w-28 object-cover"></img>
          <img src={icon6} className="h-20 w-28 object-cover"></img>
          <img src={icon4} className="h-20 w-28 object-cover"></img>
          <img src={icon3} className="h-20 w-28 object-cover"></img>
        </div>

        {/* Products Section */}
        <div className="mb-4">
          <h2 className="text-[#004646] mb-1 text-2xl font-bold">
            Our Products 
          </h2>
          <div className="text-2xl sm:text-5xl font-medium mb-1">
          We offer various additional options to help you precisely and efficiently manage your files.
          </div>
          <div className="text-2xl mt-4">
            Our platform is designed to enable you to access your files anywhere
            and at any time. Automatic backup, remote access, and easy file
            sharing ensure that your data is always available when you need it.
          </div>
        </div>

        {/* Product features section */}
        <div className=" md:p-4">
          <div className="flex flex-col md:flex-row gap-2 md:gap-4 mb-4">
            {/* Feature 1 */}
            <div className="flex flex-col lg:flex-row items-center gap-4 border-slate-300 rounded-lg border-2 p-5 py-12">
              <img
                src={phoneImage}
                className=" w-full sm:w-72 lg:w-60 h-auto mb-4 lg:mb-0 "
                alt="Phone"
              />
              <div>
                <div className="text-xl font-medium">
                  Built-in protection against malware, spam, and ransomware.
                </div>
                <div className="flex flex-wrap">
                  Drive can encrypt and secure your files. Files shared with you
                  can be inspected and removed if malware, spam, ransomware, or
                  phishing are discovered. Drive is cloud-native, eliminating
                  the need for local files and reducing device risks.
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col md:flex-row items-center border-slate-300 rounded-lg border-2 p-5 py-12">
              <div>
                <div className="text-xl font-medium mb-2">
                  "Websites that prioritize cooperation centered around people
                  can improve teamwork."
                </div>
                <div>
                  Drive collaborates with Docs, Sheets, and Slides, allowing
                  teams to create and collaborate in real time.
                </div>
              </div>
            </div>
          </div>

          {/* Second product features section */}
          <div className="flex flex-col md:flex-row gap-2 md:gap-4">
            {/* Feature 3 */}
            <div className="flex flex-col lg:flex-row items-center border-slate-300 rounded-lg border-2 p-5 w-full lg:w-1/2 py-12">
              <div>
                <div className="text-xl font-medium mb-2">
                  Make sure to integrate with your team's current tools and
                  applications.
                </div>
                <div>
                  Drive integrates and enhances your team's current technology.
                  It allows editing and storing of over 100 file types,
                  including PDFs, CAD files, and photos, without the need for
                  file format conversion.
                </div>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex flex-col md:flex-row items-center border-slate-300 rounded-lg border-2 p-5 gap-2 md:gap-4 py-12">
              <img
                src={svgimage}
                className="w-full sm:w-72 lg:w-72 mb-4 lg:mb-0 h-auto"
                alt="Image"
              />
              <div>
                <div className="text-xl font-medium mb-2">
                  Google's search and AI technologies accelerate team
                  productivity.
                </div>
                <div>
                  Drive integrates Google's powerful search capabilities,
                  offering rapid, dependable, and collaborative results. Drive
                  search chips deliver quicker access to crucial files for your
                  team.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Partners;
