"use client";

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
      <div className="space-y-3">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
            <span className="text-gray-300 capitalize font-medium">
              {key.replace(/([A-Z])/g, ' $1').trim()}:
            </span>
            <div className="flex items-center gap-2">
              <span className="text-white font-mono text-sm">{value}</span>
              <button
                onClick={() => copyToClipboard(String(value))}
                className="p-1 text-gray-400 hover:text-white transition-colors"
                title="Copy"
              >
                📋
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-white">Collecting system information...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            ℹ️ System Information
          </h1>
          <button
            onClick={copyAllInfo}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-medium transition-colors"
          >
            📋 Copy All
          </button>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-gray-800/50 rounded-xl p-6">
          {activeTab === 'device' && renderInfoSection(systemInfo.device, 'Device Information')}
          {activeTab === 'screen' && renderInfoSection(systemInfo.screen, 'Screen Information')}
          {activeTab === 'browser' && renderInfoSection(systemInfo.browser, 'Browser Information')}
          {activeTab === 'network' && renderInfoSection(systemInfo.network, 'Network Information')}
          {activeTab === 'location' && renderInfoSection(systemInfo.location, 'Location Information')}
          {activeTab === 'battery' && renderInfoSection(systemInfo.battery, 'Battery Information')}
        </div>

        {/* Refresh Button */}
        <div className="mt-8 text-center">
          <button
            onClick={collectSystemInfo}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 rounded-lg text-white font-semibold transition-all duration-300"
          >
            🔄 Refresh Information
          </button>
        </div>

        {/* Privacy Note */}
        <div className="mt-8 p-4 bg-gray-700/50 rounded-lg">
          <h3 className="text-white font-semibold mb-2">🔒 Privacy Note:</h3>
          <p className="text-gray-300 text-sm">
            All information is collected locally in your browser. No data is sent to external servers 
            except for the public IP address lookup. Location data requires your explicit permission.
          </p>
        </div>
      </div>
    </div>
  );
}
