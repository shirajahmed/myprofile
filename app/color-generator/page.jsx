"use client";

import { useState } from "react";

export default function Home() {
  const [selectedColor, setSelectedColor] = useState("#3B82F6");
  const [opacity, setOpacity] = useState(100);

  // Convert hex to RGB
  const hexToRgb = (hex) => {
    hex = hex.replace(/^#/, "");
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r}, ${g}, ${b}`;
  };

  // Convert RGB to HSL
  const rgbToHsl = (r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0,
      s,
      l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h *= 60;
    }

    return `${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%`;
  };

  // Convert RGB to CMYK
  const rgbToCmyk = (r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;

    const k = 1 - Math.max(r, g, b);
    if (k === 1) return "0%, 0%, 0%, 100%";

    const c = (1 - r - k) / (1 - k);
    const m = (1 - g - k) / (1 - k);
    const y = (1 - b - k) / (1 - k);

    return `${Math.round(c * 100)}%, ${Math.round(m * 100)}%, ${Math.round(
      y * 100
    )}%, ${Math.round(k * 100)}%`;
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const rgbValues = hexToRgb(selectedColor).split(", ").map(Number);
  const hsl = rgbToHsl(rgbValues[0], rgbValues[1], rgbValues[2]);
  const cmyk = rgbToCmyk(rgbValues[0], rgbValues[1], rgbValues[2]);

  // Convert opacity to hex and decimal values
  const alphaHex = Math.round((opacity / 100) * 255)
    .toString(16)
    .padStart(2, "0")
    .toUpperCase();

  const colorFormats = [
    { name: "HEX", value: `${selectedColor}${alphaHex}` },
    {
      name: "RGBA",
      value: `rgba(${hexToRgb(selectedColor)}, ${opacity / 100})`,
    },
    { name: "HSLA", value: `hsla(${hsl}, ${opacity / 100})` },
    { name: "CMYK", value: `cmyk(${cmyk})` },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 flex items-center justify-center">
      <div className="max-w-md w-full bg-gray-800 p-6 rounded-lg shadow-xl space-y-6">
        <h1 className="text-2xl font-bold text-center">Color Generator</h1>

        {/* Color Picker */}
        <div className="flex flex-col items-center space-y-4">
          <div
            className="w-32 h-32 rounded-full shadow-lg border-2 border-gray-200"
            style={{
              backgroundColor: `rgba(${hexToRgb(selectedColor)}, ${
                opacity / 100
              })`,
            }}
          />
          <input
            type="color"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="w-full h-12 cursor-pointer"
          />
        </div>

        {/* Opacity Slider */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <label>Opacity: {opacity}%</label>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={opacity}
            onChange={(e) => setOpacity(Number(e.target.value))}
            className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Color Formats */}
        <div className="space-y-4">
          {colorFormats.map((format) => (
            <div key={format.name} className="bg-gray-700 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{format.name}</span>
                <button
                  onClick={() => copyToClipboard(format.value)}
                  className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded transition-colors text-sm"
                >
                  Copy
                </button>
              </div>
              <div className="text-gray-300 text-sm break-all">
                {format.value}
              </div>
            </div>
          ))}
        </div>

        {/* Color Preview */}
        <div className="grid grid-cols-4 gap-2">
          <div
            className="h-12 rounded"
            style={{ backgroundColor: `${selectedColor}${alphaHex}` }}
          />
          <div
            className="h-12 rounded"
            style={{ backgroundColor: `${selectedColor}80` }}
          />
          <div
            className="h-12 rounded"
            style={{ backgroundColor: `${selectedColor}40` }}
          />
          <div
            className="h-12 rounded"
            style={{ backgroundColor: `${selectedColor}20` }}
          />
        </div>
      </div>
    </div>
  );
}
