"use client";

import { useState } from "react";
import GetInfoModal from "../../components/GetInfoModal";
import {
  getIPAddress,
  getNetworkInfo,
  getBatteryStatus,
  getUserAgent,
  getTimeZone,
  getDeviceMemory,
  getHardwareConcurrency,
  getMediaDevices,
  getScreenResolution,
  getDevicePixelRatio,
  getLocation,
  getLocalStorageInfo,
  getSessionStorageInfo,
  getIndexedDBInfo,
  detectIncognitoMode,
  checkWebRTCLeak,
  testCORS,
  checkFingerprintingResistance,
  getPageLoadTime,
  getMemoryUsage,
  getCPUUsage,
  getPageVisibilityStatus,
  checkClipboardSupport,
  checkDragAndDropSupport,
  checkFileSystemAccess,
  checkAutoplayPermission,
  checkAudioContext,
  checkVideoPlayback,
  checkWebBluetooth,
  checkWebNFC,
  checkWebSerial,
  checkWebUSB,
  checkWebShare,
} from "../../utils/getInfoUtils";

// Object to manage sections, headings, and buttons
const sections = [
  {
    heading: "Network Information",
    buttons: [
      { title: "IP Address", onClick: getIPAddress },
      { title: "Network Type", onClick: getNetworkInfo },
      { title: "Downlink Speed", onClick: getNetworkInfo },
      { title: "Effective Bandwidth", onClick: getNetworkInfo },
      { title: "Round Trip Time (RTT)", onClick: getNetworkInfo },
    ],
  },
  {
    heading: "Device & Hardware Information",
    buttons: [
      { title: "Battery Status", onClick: getBatteryStatus },
      { title: "CPU Cores", onClick: getHardwareConcurrency },
      { title: "RAM Size", onClick: getDeviceMemory },
      {
        title: "GPU Information",
        onClick: () => ({ info: "Not implemented" }),
      },
      {
        title: "Device Model & Type",
        onClick: () => ({ info: "Not implemented" }),
      },
      {
        title: "Touchscreen Support",
        onClick: () => ({ info: "Not implemented" }),
      },
      { title: "Media Devices", onClick: getMediaDevices },
    ],
  },
  {
    heading: "Browser & OS Information",
    buttons: [
      { title: "User Agent", onClick: getUserAgent },
      {
        title: "Browser Language",
        onClick: () => ({ info: "Not implemented" }),
      },
      {
        title: "Cookies Enabled/Disabled",
        onClick: () => ({ info: "Not implemented" }),
      },
      {
        title: "JavaScript Enabled",
        onClick: () => ({ info: "Not implemented" }),
      },
      {
        title: "Do Not Track (DNT) Status",
        onClick: () => ({ info: "Not implemented" }),
      },
      { title: "Ad Blockers", onClick: () => ({ info: "Not implemented" }) },
      { title: "Time Zone & Date", onClick: getTimeZone },
      {
        title: "Installed Fonts",
        onClick: () => ({ info: "Not implemented" }),
      },
      {
        title: "Dark Mode / Light Mode",
        onClick: () => ({ info: "Not implemented" }),
      },
      { title: "Screen Resolution", onClick: getScreenResolution },
      { title: "Device Pixel Ratio (DPR)", onClick: getDevicePixelRatio },
      {
        title: "Clipboard Access",
        onClick: () => ({ info: "Not implemented" }),
      },
    ],
  },
  {
    heading: "Location & Sensors (If Allowed)",
    buttons: [
      { title: "GPS Location", onClick: getLocation },
      {
        title: "Accelerometer & Gyroscope",
        onClick: () => ({ info: "Not implemented" }),
      },
      {
        title: "Magnetometer (Compass)",
        onClick: () => ({ info: "Not implemented" }),
      },
      {
        title: "Proximity Sensor",
        onClick: () => ({ info: "Not implemented" }),
      },
      {
        title: "Ambient Light Sensor",
        onClick: () => ({ info: "Not implemented" }),
      },
    ],
  },
  {
    heading: "Browser Storage & Capabilities",
    buttons: [
      { title: "Local Storage", onClick: getLocalStorageInfo },
      { title: "Session Storage", onClick: getSessionStorageInfo },
      { title: "IndexedDB", onClick: getIndexedDBInfo },
      { title: "Cache Storage", onClick: () => ({ info: "Not implemented" }) },
      {
        title: "Service Workers & PWA Support",
        onClick: () => ({ info: "Not implemented" }),
      },
      {
        title: "WebSockets / WebRTC Availability",
        onClick: () => ({ info: "Not implemented" }),
      },
      { title: "Clipboard API", onClick: () => ({ info: "Not implemented" }) },
    ],
  },
  {
    heading: "Security & Privacy Information",
    buttons: [
      { title: "Incognito Mode Detection", onClick: detectIncognitoMode },
      { title: "WebRTC Leak Detection", onClick: checkWebRTCLeak },
      { title: "CORS & Same-Origin Policy Test", onClick: testCORS },
      {
        title: "Browser Fingerprinting Resistance",
        onClick: checkFingerprintingResistance,
      },
    ],
  },
  {
    heading: "Performance & System Metrics",
    buttons: [
      { title: "Page Load Time", onClick: getPageLoadTime },
      { title: "Memory Usage", onClick: getMemoryUsage },
      { title: "CPU/GPU Usage", onClick: getCPUUsage },
      { title: "Page Visibility Status", onClick: getPageVisibilityStatus },
    ],
  },
  {
    heading: "Clipboard & File Access",
    buttons: [
      { title: "Copy/Paste Support", onClick: checkClipboardSupport },
      { title: "Drag & Drop File Detection", onClick: checkDragAndDropSupport },
      { title: "File System Access API", onClick: checkFileSystemAccess },
    ],
  },
  {
    heading: "Audio & Video Features",
    buttons: [
      { title: "Autoplay Permission Check", onClick: checkAutoplayPermission },
      { title: "Audio Context API", onClick: checkAudioContext },
      { title: "Video Playback Capabilities", onClick: checkVideoPlayback },
    ],
  },
  {
    heading: "Web Features Support",
    buttons: [
      { title: "Web Bluetooth API", onClick: checkWebBluetooth },
      { title: "Web NFC API", onClick: checkWebNFC },
      { title: "Web Serial API", onClick: checkWebSerial },
      { title: "Web USB API", onClick: checkWebUSB },
      { title: "Web Share API", onClick: checkWebShare },
    ],
  },
];

export default function GetYourInfo() {
  const [modalInfo, setModalInfo] = useState(null);
  const [modalTitle, setModalTitle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = async (title, fetchFunction) => {
    const info = await fetchFunction();
    setModalTitle(title);
    setModalInfo(info);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalInfo(null);
    setModalTitle("");
  };

  return (
    <div className="grid grid-cols-12 gap-6 px-5 my-14 lg:mb-0 md:mb-16 sm:px-20 md:px-32 lg:px-36 xl:px-48 ">
      <div className="h-full col-span-12 p-4 text-base text-center bg-dark-500 lg:col-span-3 rounded-2xl shadow-custom-dark ">
        <>sidebar</>
      </div>
      <div className="flex flex-col col-span-12 overflow-hidden shadow-custom-dark rounded-2xl lg:col-span-9 bg-dark-500">
        <div className="flex items-center justify-between px-5 py-3 my-3 bg-[#18191d] rounded-xl">
          <span className="text-xl font-bold border-b-4 md:text-2xl border-[#a65fa8] text-white">
            Get Your Info
          </span>
        </div>

        <div className="h-auto bg-[#0a0a0a] rounded-xl text-white p-8 flex flex-col space-y-8">
          {sections.map((section, index) => (
            <div key={index} className="space-y-4">
              <h2 className="text-xl font-bold border-b-2 border-[#a65fa8]">
                {section.heading}
              </h2>
              <div className="flex flex-wrap gap-2">
                {section.buttons.map((button, idx) => (
                  <button
                    key={idx}
                    onClick={() =>
                      handleButtonClick(button.title, button.onClick)
                    }
                    className="px-4 py-2 bg-[#a65fa8] text-white rounded-lg whitespace-nowrap"
                  >
                    {button.title}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <GetInfoModal
          title={modalTitle}
          info={modalInfo}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
