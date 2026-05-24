

"use client";
import ToolPageWrapper from "../../components/ToolPageWrapper";

import { useState, useEffect } from "react";

export default function GetYourInfo() {
  const [systemInfo, setSystemInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("device");

  useEffect(() => {
    collectSystemInfo();
  }, []);

  const collectSystemInfo = async () => {
    setLoading(true);
    
    const info = {
      // Device Information
      device: {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        languages: navigator.languages?.join(', ') || 'Not available',
        cookieEnabled: navigator.cookieEnabled,
        onLine: navigator.onLine,
        hardwareConcurrency: navigator.hardwareConcurrency || 'Not available',
        deviceMemory: navigator.deviceMemory || 'Not available',
        maxTouchPoints: navigator.maxTouchPoints || 0,
      },
      
      // Screen Information
      screen: {
        resolution: `${screen.width} × ${screen.height}`,
        availableResolution: `${screen.availWidth} × ${screen.availHeight}`,
        colorDepth: `${screen.colorDepth} bits`,
        pixelDepth: `${screen.pixelDepth} bits`,
        devicePixelRatio: window.devicePixelRatio || 1,
        orientation: screen.orientation?.type || 'Not available',
      },
      
      // Browser Information
      browser: {
        viewport: `${window.innerWidth} × ${window.innerHeight}`,
        documentSize: `${document.documentElement.scrollWidth} × ${document.documentElement.scrollHeight}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        timezoneOffset: new Date().getTimezoneOffset(),
        localStorage: typeof(Storage) !== "undefined",
        sessionStorage: typeof(Storage) !== "undefined",
        indexedDB: typeof(indexedDB) !== "undefined",
        webGL: !!window.WebGLRenderingContext,
        webGL2: !!window.WebGL2RenderingContext,
      },
      
      // Network Information
      network: {
        connectionType: navigator.connection?.effectiveType || 'Not available',
        downlink: navigator.connection?.downlink ? `${navigator.connection.downlink} Mbps` : 'Not available',
        rtt: navigator.connection?.rtt ? `${navigator.connection.rtt} ms` : 'Not available',
        saveData: navigator.connection?.saveData || false,
      }
    };

    // Get IP Address (using a public API)
    try {
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipResponse.json();
      info.network.publicIP = ipData.ip;
    } catch (error) {
      info.network.publicIP = 'Unable to fetch';
    }

    // Get Location (if permission granted)
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            info.location = {
              latitude: position.coords.latitude.toFixed(6),
              longitude: position.coords.longitude.toFixed(6),
              accuracy: `${position.coords.accuracy} meters`,
              altitude: position.coords.altitude ? `${position.coords.altitude} meters` : 'Not available',
              speed: position.coords.speed ? `${position.coords.speed} m/s` : 'Not available',
            };
            setSystemInfo({...info});
          },
          () => {
            info.location = { error: 'Location access denied or unavailable' };
            setSystemInfo({...info});
          }
        );
      }
    } catch (error) {
      info.location = { error: 'Geolocation not supported' };
    }

    // Get Battery Status (if supported)
    try {
      if ('getBattery' in navigator) {
        const battery = await navigator.getBattery();
        info.battery = {
          level: `${Math.round(battery.level * 100)}%`,
          charging: battery.charging ? 'Yes' : 'No',
          chargingTime: battery.chargingTime !== Infinity ? `${Math.round(battery.chargingTime / 60)} minutes` : 'Not available',
          dischargingTime: battery.dischargingTime !== Infinity ? `${Math.round(battery.dischargingTime / 60)} minutes` : 'Not available',
        };
      } else {
        info.battery = { error: 'Battery API not supported' };
      }
    } catch (error) {
      info.battery = { error: 'Battery information unavailable' };
    }

    setSystemInfo(info);
    setLoading(false);
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy');
    }
  };

  const copyAllInfo = () => {
    const allInfo = JSON.stringify(systemInfo, null, 2);
    copyToClipboard(allInfo);
  };

  const tabs = [
    { id: 'device', label: 'Device', icon: '📱' },
    { id: 'screen', label: 'Screen', icon: '🖥️' },
    { id: 'browser', label: 'Browser', icon: '🌐' },
    { id: 'network', label: 'Network', icon: '📡' },
    { id: 'location', label: 'Location', icon: '📍' },
    { id: 'battery', label: 'Battery', icon: '🔋' },
  ];

  const renderInfoSection = (data, title) => {
    if (!data) return null;
    
    if (data.error) {
      return (
        <div className="p-4 bg-red-500/20 border border-red-500 rounded-lg">
          <p className="text-red-300">{data.error}</p>
        </div>
      );
    }

    return (
      <div className="space-y-2">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <span className="text-gray-600 dark:text-gray-300 capitalize text-sm">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-gray-800 dark:text-white font-mono text-sm">{value}</span>
              <button onClick={() => copyToClipboard(String(value))} className="text-gray-400 hover:text-[#a65fa8] transition-colors text-xs">📋</button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <ToolPageWrapper title="💻 System Information" description="View your device, browser and network details">
        <div className="flex items-center justify-center h-48">
          <div className="text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#a65fa8] mx-auto mb-3"></div>
            <p className="text-gray-500 dark:text-gray-400">Collecting system information...</p>
          </div>
        </div>
      </ToolPageWrapper>
    );
  }

  return (
    <ToolPageWrapper title="💻 System Information" description="View your device, browser and network details">
      <div className="space-y-5">
        <div className="flex justify-between items-center">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-[#a65fa8] text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
          <button
            onClick={copyAllInfo}
            className="px-3 py-1.5 bg-[#a65fa8] hover:bg-purple-700 rounded-lg text-white text-sm font-medium transition-colors"
          >
            📋 Copy All
          </button>
        </div>

        <div className="space-y-2">
          {activeTab === 'device' && renderInfoSection(systemInfo.device)}
          {activeTab === 'screen' && renderInfoSection(systemInfo.screen)}
          {activeTab === 'browser' && renderInfoSection(systemInfo.browser)}
          {activeTab === 'network' && renderInfoSection(systemInfo.network)}
          {activeTab === 'location' && renderInfoSection(systemInfo.location)}
          {activeTab === 'battery' && renderInfoSection(systemInfo.battery)}
        </div>

        <button
          onClick={collectSystemInfo}
          className="w-full py-3 bg-[#a65fa8] hover:bg-purple-700 rounded-lg text-white font-medium transition-colors"
        >
          🔄 Refresh Information
        </button>

        <p className="text-xs text-gray-400 dark:text-gray-500">
          🔒 All data is collected locally. No information is sent to external servers except for IP lookup.
        </p>
      </div>
    </ToolPageWrapper>
  );
}
