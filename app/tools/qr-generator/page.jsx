

"use client";

import React, { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";

import ToolPageWrapper from "../../components/ToolPageWrapper";

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
    <ToolPageWrapper title="📱 QR Code Generator" description="Generate customizable QR codes for any URL or text">
      <div className="grid lg:grid-cols-2 gap-8">
          {/* Controls Section */}
          <div className="space-y-5">
            {/* Content Input */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Content (URL/Text):</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-[#a65fa8] focus:outline-none resize-none"
                placeholder="Enter text, URL, email, phone number..."
                rows={3}
              />
            </div>

            {/* Quick Presets */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Quick Presets:</label>
              <div className="grid grid-cols-2 gap-2">
                {presetTexts.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => setText(preset.value)}
                    className="px-3 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-gray-700 dark:text-gray-200 text-sm transition-colors"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Control */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-gray-700 dark:text-gray-300 font-medium">QR Code Size</label>
                <span className="text-[#a65fa8] font-semibold">{qrSize}px</span>
              </div>
              <input
                type="range" min="200" max="800" value={qrSize}
                onChange={(e) => setQrSize(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Color Controls */}
            <div className="grid grid-cols-2 gap-4">
              {[{ label: 'Foreground', val: fgColor, set: setFgColor }, { label: 'Background', val: bgColor, set: setBgColor }].map(({ label, val, set }) => (
                <div key={label}>
                  <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">{label}:</label>
                  <div className="flex gap-2">
                    <input type="color" value={val} onChange={(e) => set(e.target.value)} className="w-12 h-10 rounded-lg cursor-pointer border border-gray-300 dark:border-gray-600" />
                    <input type="text" value={val} onChange={(e) => set(e.target.value)} className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white text-sm" />
                  </div>
                </div>
              ))}
            </div>

            {/* Error Correction */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Error Correction:</label>
              <select
                value={errorLevel}
                onChange={(e) => setErrorLevel(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white focus:ring-2 focus:ring-[#a65fa8] focus:outline-none"
              >
                <option value="L">Low (7% recovery)</option>
                <option value="M">Medium (15% recovery)</option>
                <option value="Q">Quartile (25% recovery)</option>
                <option value="H">High (30% recovery)</option>
              </select>
            </div>
          </div>

          {/* Preview Section */}
          <div className="flex flex-col items-center space-y-4">
            <div className="bg-white p-4 rounded-xl shadow border border-gray-200">
              {qrDataURL ? (
                <img src={qrDataURL} alt="Generated QR Code" className="max-w-full h-auto" style={{ width: Math.min(qrSize, 300) }} />
              ) : (
                <div className="flex items-center justify-center bg-gray-100 rounded-lg w-64 h-64">
                  <span className="text-gray-400 text-sm">QR Code Preview</span>
                </div>
              )}
            </div>

            <div className="flex gap-3 w-full">
              <button
                onClick={downloadQR}
                disabled={!qrDataURL}
                className="flex-1 px-4 py-3 bg-[#a65fa8] hover:bg-purple-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg text-white font-semibold transition-colors"
              >
                📥 Download
              </button>
              <button
                onClick={copyQR}
                disabled={!qrDataURL}
                className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:cursor-not-allowed rounded-lg text-gray-700 dark:text-white font-semibold transition-colors"
              >
                {copied ? "✓ Copied!" : "📋 Copy"}
              </button>
            </div>

            {text && (
              <div className="w-full p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <div>Length: {text.length} chars</div>
                <div>Size: {qrSize}×{qrSize}px</div>
                <div>Error Correction: {errorLevel}</div>
              </div>
            )}
          </div>
        </div>
        <canvas ref={canvasRef} style={{ display: 'none' }} />
    </ToolPageWrapper>
  );
}
