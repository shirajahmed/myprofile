"use client";

import React, { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
export default function PasswordGenerator() {
  const [text, setText] = useState("https://example.com");
  const [qrSize, setQrSize] = useState(200);
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [errorLevel, setErrorLevel] = useState("H");
  const [logo, setLogo] = useState(null);
  const canvasRef = useRef(null);

  const generateQR = async () => {
    if (canvasRef.current) {
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
        await QRCode.toCanvas(canvasRef.current, text, options);

        // Add logo if present
        if (logo) {
          const ctx = canvasRef.current.getContext("2d");
          if (ctx) {
            const img = new Image();
            img.src = logo;
            img.onload = () => {
              const center = qrSize / 2;
              const logoSize = qrSize / 4;
              ctx.drawImage(
                img,
                center - logoSize / 2,
                center - logoSize / 2,
                logoSize,
                logoSize
              );
            };
          }
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    generateQR();
  }, [text, qrSize, fgColor, bgColor, errorLevel, logo]);

  const downloadQR = () => {
    if (canvasRef.current) {
      const link = document.createElement("a");
      link.download = `qr-code-${Date.now()}.png`;
      link.href = canvasRef.current.toDataURL("image/png");
      link.click();
    }
  };

  const copyQR = async () => {
    if (canvasRef.current) {
      try {
        const blob =
          ((await new Promise()) < Blob) |
          (null > ((resolve) => canvasRef.current?.toBlob(resolve)));
        if (blob) {
          await navigator.clipboard.write([
            new ClipboardItem({ "image/png": blob }),
          ]);
          alert("QR code copied to clipboard!");
        }
      } catch (err) {
        console.error("Failed to copy QR code:", err);
      }
    }
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setLogo(event.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="grid grid-cols-12 gap-6 px-5 my-14 lg:mb-0 md:mb-16 sm:px-20 md:px-32 lg:px-36 xl:px-48 ">
      {/* // do this div style later (after putting the content) */}
      <div className="h-full col-span-12 p-4 text-base text-center bg-dark-500 lg:col-span-3 rounded-2xl shadow-custom-dark ">
        {/* //!sidebar */}
        <>sidebar</>
      </div>
      <div className="flex flex-col col-span-12 overflow-hidden  shadow-custom-dark rounded-2xl lg:col-span-9 bg-dark-500">
        {/* //!navbar */}
        <div className="flex items-center justify-between px-5 py-3 my-3 bg-[#18191d] rounded-xl">
          <span className="text-xl font-bold border-b-4 md:text-2xl border-green-500 text-white">
            Password Generator
          </span>
        </div>

        <div className="max-h-[65vh] bg-[#0a0a0a] rounded-xl text-white p-8 flex items-center justify-center">
          <div className="max-w-md w-full bg-[#18191d] p-6 rounded-lg shadow-xl">
            <h1 className="text-2xl font-bold mb-6 text-center">
              Password Generator
            </h1>
            <div className="space-y-4">
              <div>
                <label className="block mb-2">Content (URL/Text):</label>
                <input
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter text or URL"
                />
              </div>

              {/* Size Control */}
              <div>
                <label className="block mb-2">QR Code Size ({qrSize}px):</label>
                <input
                  type="range"
                  min="100"
                  max="500"
                  value={qrSize}
                  onChange={(e) => setQrSize(Number(e.target.value))}
                  className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Color Controls */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2">Foreground Color:</label>
                  <input
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="w-full h-12 cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block mb-2">Background Color:</label>
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-full h-12 cursor-pointer"
                  />
                </div>
              </div>

              {/* Error Correction */}
              <div>
                <label className="block mb-2">Error Correction Level:</label>
                <select
                  value={errorLevel}
                  onChange={(e) => setErrorLevel(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="L">Low (7%)</option>
                  <option value="M">Medium (15%)</option>
                  <option value="Q">Quartile (25%)</option>
                  <option value="H">High (30%)</option>
                </select>
              </div>

              {/* Logo Upload */}
              <div>
                <label className="block mb-2">
                  Add Logo (PNG recommended):
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="w-full file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                />
              </div>
            </div>

            {/* QR Preview */}
            <div className="flex flex-col items-center space-y-4">
              <canvas
                ref={canvasRef}
                className="border-2 border-gray-600 rounded"
              />
              <div className="flex gap-4">
                <button
                  onClick={downloadQR}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
                >
                  Download
                </button>
                <button
                  onClick={copyQR}
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded transition-colors"
                >
                  Copy
                </button>
              </div>
            </div>

            {/* Tips */}
            <div className="text-sm text-gray-400">
              <p>Tips:</p>
              <ul className="list-disc pl-6">
                <li>
                  Higher error correction levels allow more damage tolerance
                </li>
                <li>
                  Keep logo size less than 30% of QR code size for best results
                </li>
                <li>Use high contrast colors for better readability</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
