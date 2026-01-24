

"use client";

import React, { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";

export default function QRGenerator() {
  const [text, setText] = useState("https://example.com");
  const [qrSize, setQrSize] = useState(300);
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [errorLevel, setErrorLevel] = useState("M");
  const [qrDataURL, setQrDataURL] = useState("");
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef(null);

  const generateQR = async () => {
    if (!text.trim()) return;

    const options = {
      width: qrSize,
      margin: 2,
      color: {
        dark: fgColor,
        light: bgColor,
      },
      errorCorrectionLevel: errorLevel,
    };

    try {
      // Generate QR code as data URL
      const dataURL = await QRCode.toDataURL(text, options);
      setQrDataURL(dataURL);

      // Also draw on canvas for download functionality
      if (canvasRef.current) {
        await QRCode.toCanvas(canvasRef.current, text, options);
      }
    } catch (err) {
      console.error("QR generation failed:", err);
    }
  };

  useEffect(() => {
    generateQR();
  }, [text, qrSize, fgColor, bgColor, errorLevel]);

  const downloadQR = () => {
    if (qrDataURL) {
      const link = document.createElement("a");
      link.download = `qr-code-${Date.now()}.png`;
      link.href = qrDataURL;
      link.click();
    }
  };

  const copyQR = async () => {
    if (!qrDataURL) return;

    try {
      // Convert data URL to blob
      const response = await fetch(qrDataURL);
      const blob = await response.blob();
      
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob }),
      ]);
      
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy QR code:", err);
      // Fallback: copy the text instead
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (textErr) {
        console.error("Failed to copy text:", textErr);
      }
    }
  };

  const presetTexts = [
    { label: "Website URL", value: "https://example.com" },
    { label: "Email", value: "mailto:contact@example.com" },
    { label: "Phone", value: "tel:+1234567890" },
    { label: "WiFi", value: "WIFI:T:WPA;S:NetworkName;P:Password;;" },
    { label: "SMS", value: "sms:+1234567890?body=Hello" },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          📱 QR Code Generator
        </h1>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Controls Section */}
          <div className="space-y-6">
            {/* Content Input */}
            <div>
              <label className="block text-white font-medium mb-3">
                Content (URL/Text):
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Enter text, URL, email, phone number..."
                rows={3}
              />
            </div>

            {/* Quick Presets */}
            <div>
              <label className="block text-white font-medium mb-3">
                Quick Presets:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {presetTexts.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => setText(preset.value)}
                    className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white text-sm transition-colors"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Control */}
            <div>
              <div className="flex justify-between mb-3">
                <label className="text-white font-medium">QR Code Size</label>
                <span className="text-blue-400 font-semibold">{qrSize}px</span>
              </div>
              <input
                type="range"
                min="200"
                max="800"
                value={qrSize}
                onChange={(e) => setQrSize(Number(e.target.value))}
                className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Color Controls */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-medium mb-3">
                  Foreground Color:
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="w-12 h-12 rounded-lg cursor-pointer border-2 border-gray-600"
                  />
                  <input
                    type="text"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-white font-medium mb-3">
                  Background Color:
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-12 h-12 rounded-lg cursor-pointer border-2 border-gray-600"
                  />
                  <input
                    type="text"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Error Correction */}
            <div>
              <label className="block text-white font-medium mb-3">
                Error Correction Level:
              </label>
              <select
                value={errorLevel}
                onChange={(e) => setErrorLevel(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="L">Low (7% recovery)</option>
                <option value="M">Medium (15% recovery)</option>
                <option value="Q">Quartile (25% recovery)</option>
                <option value="H">High (30% recovery)</option>
              </select>
            </div>
          </div>

          {/* Preview Section */}
          <div className="flex flex-col items-center space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-2xl">
              {qrDataURL ? (
                <img
                  src={qrDataURL}
                  alt="Generated QR Code"
                  className="max-w-full h-auto"
                  style={{ width: Math.min(qrSize, 400) }}
                />
              ) : (
                <div 
                  className="flex items-center justify-center bg-gray-200 rounded-lg"
                  style={{ width: 300, height: 300 }}
                >
                  <span className="text-gray-500">QR Code Preview</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 w-full">
              <button
                onClick={downloadQR}
                disabled={!qrDataURL}
                className="flex-1 px-6 py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg transition-colors text-white font-semibold"
              >
                📥 Download PNG
              </button>
              <button
                onClick={copyQR}
                disabled={!qrDataURL}
                className="flex-1 px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg transition-colors text-white font-semibold"
              >
                {copied ? "✓ Copied!" : "📋 Copy"}
              </button>
            </div>

            {/* QR Info */}
            {text && (
              <div className="w-full p-4 bg-gray-700/50 rounded-lg">
                <h4 className="text-white font-medium mb-2">QR Code Info:</h4>
                <div className="text-sm text-gray-300 space-y-1">
                  <div>Content Length: {text.length} characters</div>
                  <div>Size: {qrSize}×{qrSize} pixels</div>
                  <div>Error Correction: {errorLevel}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Hidden canvas for download functionality */}
        <canvas ref={canvasRef} style={{ display: 'none' }} />

        {/* Tips */}
        <div className="mt-8 p-4 bg-gray-700/50 rounded-lg">
          <h3 className="text-white font-semibold mb-2">💡 QR Code Tips:</h3>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>• Higher error correction allows more damage tolerance</li>
            <li>• Use high contrast colors for better readability</li>
            <li>• Test your QR code with different scanners</li>
            <li>• Keep URLs short for simpler QR codes</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
