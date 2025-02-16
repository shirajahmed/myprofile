// utils/infoUtils.js

// Function to get IP Address
export const getIPAddress = async () => {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    return { ip: data.ip };
  } catch (error) {
    console.error("Error fetching IP address:", error);
    return { error: "Unable to fetch IP address" };
  }
};

// Function to get Network Information
export const getNetworkInfo = async () => {
  try {
    const connection =
      navigator.connection ||
      navigator.mozConnection ||
      navigator.webkitConnection;
    if (connection) {
      return {
        type: connection.type,
        downlink: connection.downlink,
        effectiveType: connection.effectiveType,
        rtt: connection.rtt,
      };
    } else {
      return { error: "Network Information not available" };
    }
  } catch (error) {
    console.error("Error fetching network info:", error);
    return { error: "Unable to fetch network info" };
  }
};

// Function to get Battery Status
export const getBatteryStatus = async () => {
  try {
    const battery = await navigator.getBattery();
    return {
      level: battery.level * 100,
      charging: battery.charging,
      chargingTime: battery.chargingTime,
      dischargingTime: battery.dischargingTime,
    };
  } catch (error) {
    console.error("Error fetching battery status:", error);
    return { error: "Unable to fetch battery status" };
  }
};

// Function to get User Agent
export const getUserAgent = async () => {
  return { userAgent: navigator.userAgent };
};

// Function to get Time Zone
export const getTimeZone = async () => {
  return { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone };
};

// Add more utility functions as needed...
// utils/infoUtils.js

// Get Device Memory (RAM)
export const getDeviceMemory = async () => {
  return { deviceMemory: navigator.deviceMemory || "Not available" };
};

// Get CPU Cores (Hardware Concurrency)
export const getHardwareConcurrency = async () => {
  return {
    hardwareConcurrency: navigator.hardwareConcurrency || "Not available",
  };
};

// Get Media Devices
export const getMediaDevices = async () => {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return { mediaDevices: devices };
  } catch (error) {
    return { error: "Unable to fetch media devices" };
  }
};

// Get Screen Resolution
export const getScreenResolution = async () => {
  return {
    width: window.screen.width,
    height: window.screen.height,
  };
};

// Get Device Pixel Ratio
export const getDevicePixelRatio = async () => {
  return { devicePixelRatio: window.devicePixelRatio };
};

// Get Location (GPS)
export const getLocation = async () => {
  try {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    return {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };
  } catch (error) {
    return { error: "Unable to fetch location" };
  }
};

// Get Local Storage Info
export const getLocalStorageInfo = async () => {
  return { localStorage: { ...localStorage } };
};

// Get Session Storage Info
export const getSessionStorageInfo = async () => {
  return { sessionStorage: { ...sessionStorage } };
};

// Get IndexedDB Info
export const getIndexedDBInfo = async () => {
  return { indexedDB: "Not implemented" };
};

// Security & Privacy Information
export const detectIncognitoMode = async () => {
  const isIncognito = new Promise((resolve) => {
    const fs = window.RequestFileSystem || window.webkitRequestFileSystem;
    if (!fs) resolve(false);
    fs(
      window.TEMPORARY,
      100,
      () => resolve(false),
      () => resolve(true)
    );
  });
  return { isIncognito: await isIncognito };
};

export const checkWebRTCLeak = async () => {
  const rtc = new RTCPeerConnection();
  const leak = await new Promise((resolve) => {
    rtc.createDataChannel("");
    rtc.createOffer().then((offer) => resolve(offer.sdp));
  });
  return { webRTCLeak: leak.includes("0.0.0.0") ? "No Leak" : "Leak Detected" };
};

export const testCORS = async () => {
  try {
    const response = await fetch("https://example.com");
    return { cors: response.ok ? "CORS Allowed" : "CORS Blocked" };
  } catch (error) {
    return { error: "CORS Test Failed" };
  }
};

export const checkFingerprintingResistance = async () => {
  return { fingerprintingResistance: "Not implemented" };
};

// Performance & System Metrics
export const getPageLoadTime = async () => {
  return {
    pageLoadTime:
      window.performance.timing.loadEventEnd -
      window.performance.timing.navigationStart,
  };
};

export const getMemoryUsage = async () => {
  return { memoryUsage: window.performance.memory || "Not available" };
};

export const getCPUUsage = async () => {
  return { cpuUsage: "Not implemented" };
};

export const getPageVisibilityStatus = async () => {
  return { pageVisibility: document.visibilityState };
};

// Clipboard & File Access
export const checkClipboardSupport = async () => {
  return { clipboardSupport: "clipboard" in navigator };
};

export const checkDragAndDropSupport = async () => {
  return { dragAndDropSupport: "draggable" in document.createElement("span") };
};

export const checkFileSystemAccess = async () => {
  return { fileSystemAccess: "showOpenFilePicker" in window };
};

// Audio & Video Features
export const checkAutoplayPermission = async () => {
  const video = document.createElement("video");
  video.autoplay = true;
  return { autoplayPermission: video.autoplay };
};

export const checkAudioContext = async () => {
  return { audioContext: "AudioContext" in window };
};

export const checkVideoPlayback = async () => {
  const video = document.createElement("video");
  return { videoPlayback: video.canPlayType("video/mp4") };
};

// Web Features Support
export const checkWebBluetooth = async () => {
  return { webBluetooth: "bluetooth" in navigator };
};

export const checkWebNFC = async () => {
  return { webNFC: "NDEFReader" in window };
};

export const checkWebSerial = async () => {
  return { webSerial: "Serial" in navigator };
};

export const checkWebUSB = async () => {
  return { webUSB: "usb" in navigator };
};

export const checkWebShare = async () => {
  return { webShare: "share" in navigator };
};
