"use client";

import { useEffect } from "react";

export default function PasswordGenerator() {
  useEffect(() => {
    // Initialize Google Ads
    // (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);
  return (
    <div className="grid grid-cols-12 gap-6 px-5 my-14 lg:mb-0 md:mb-16 sm:px-20 md:px-32 lg:px-36 xl:px-48 ">
      {/* // do this div style later (after putting the content) */}
      <div className="h-full col-span-12 p-4 text-base text-center bg-dark-500 lg:col-span-3 rounded-2xl shadow-custom-dark ">
        {/* //!sidebar */}
        <>
          {/* <div className="ad-container">
         
            <ins
              className="adsbygoogle"
              style={{ display: "block" }}
              data-ad-client="YOUR_AD_CLIENT"
              data-ad-slot="YOUR_AD_SLOT"
              data-ad-format="auto"
            ></ins>
          </div> */}
        </>
      </div>
      <div className="flex flex-col col-span-12 overflow-hidden  shadow-custom-dark rounded-2xl lg:col-span-9 bg-dark-500">
        {/* //!navbar */}
        <div className="flex items-center justify-between px-5 py-3 my-3 bg-[#18191d] rounded-xl">
          <span className="text-xl font-bold border-b-4 md:text-2xl border-[#a65fa8] text-white">
            All Tools
          </span>
        </div>

        <div className="h-auto bg-[#0a0a0a]  rounded-xl text-white p-8 flex items-center justify-center">
          <div className="max-w-md w-full  bg-[#18191d] p-6 rounded-lg shadow-xl">
            <h1 className="text-2xl font-bold mb-6 text-center">Tools</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
