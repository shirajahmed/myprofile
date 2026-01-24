

"use client";

import { useState } from "react";

export default function ColorGenerator() {
  const [selectedColor, setSelectedColor] = useState("#3b82f6");
  const [opacity, setOpacity] = useState(100);
  const [copiedFormat, setCopiedFormat] = useState("");

  // Convert hex to RGB
  const hexToRgb = (hex) => {
    hex = hex.replace(/^#/, "");
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
  };

  // Convert RGB to HSL
  const rgbToHsl = (r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h *= 60;
    }

    return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
  };

  // Generate random color
  const generateRandomColor = () => {
    const randomColor = "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    setSelectedColor(randomColor);
  };

  // Generate color palette
  const generatePalette = () => {
    const { r, g, b } = hexToRgb(selectedColor);
    const { h, s, l } = rgbToHsl(r, g, b);
    
    const palette = [];
    for (let i = 0; i < 5; i++) {
      const newL = Math.max(10, Math.min(90, l + (i - 2) * 20));
      const newColor = hslToHex(h, s, newL);
      palette.push(newColor);
    }
    return palette;
  };

  // Convert HSL to Hex
  const hslToHex = (h, s, l) => {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  };

  const copyToClipboard = async (text, format) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedFormat(format);
      setTimeout(() => setCopiedFormat(""), 2000);
    } catch (err) {
      console.error('Failed to copy');
    }
  };

  const { r, g, b } = hexToRgb(selectedColor);
  const { h, s, l } = rgbToHsl(r, g, b);
  const alphaDecimal = opacity / 100;

  const colorFormats = [
    { name: "HEX", value: selectedColor.toUpperCase() },
    { name: "RGB", value: `rgb(${r}, ${g}, ${b})` },
    { name: "RGBA", value: `rgba(${r}, ${g}, ${b}, ${alphaDecimal})` },
    { name: "HSL", value: `hsl(${h}, ${s}%, ${l}%)` },
    { name: "HSLA", value: `hsla(${h}, ${s}%, ${l}%, ${alphaDecimal})` },
  ];

  const palette = generatePalette();

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          🎨 Color Generator & Palette
        </h1>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Color Picker Section */}
          <div className="space-y-6">
            {/* Main Color Display */}
            <div className="text-center">
              <div
                className="w-48 h-48 mx-auto rounded-2xl shadow-2xl border-4 border-gray-600 mb-4"
                style={{ backgroundColor: `rgba(${r}, ${g}, ${b}, ${alphaDecimal})` }}
              />
              
              <div className="flex gap-3 justify-center">
                <input
                  type="color"
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="w-16 h-12 rounded-lg cursor-pointer border-2 border-gray-600"
                />
                <button
                  onClick={generateRandomColor}
                  className="px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg text-white font-medium transition-colors"
                >
                  Random
                </button>
              </div>
            </div>

            {/* Opacity Slider */}
            <div>
              <div className="flex justify-between mb-3">
                <label className="text-white font-medium">Opacity</label>
                <span className="text-blue-400 font-semibold">{opacity}%</span>
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

            {/* Color Palette */}
            <div>
              <h3 className="text-white font-semibold mb-3">Color Palette</h3>
              <div className="grid grid-cols-5 gap-2">
                {palette.map((color, index) => (
                  <div
                    key={index}
                    className="aspect-square rounded-lg cursor-pointer border-2 border-gray-600 hover:scale-105 transition-transform"
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                    title={color}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Color Formats Section */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-xl mb-4">Color Formats</h3>
            
            {colorFormats.map((format) => (
              <div key={format.name} className="bg-gray-700 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-medium">{format.name}</span>
                  <button
                    onClick={() => copyToClipboard(format.value, format.name)}
                    className="px-3 py-1 bg-blue-500 hover:bg-blue-600 rounded text-white text-sm transition-colors"
                  >
                    {copiedFormat === format.name ? "✓ Copied!" : "Copy"}
                  </button>
                </div>
                <div className="text-gray-300 font-mono text-sm bg-gray-800 p-2 rounded">
                  {format.value}
                </div>
              </div>
            ))}

            {/* Color Information */}
            <div className="bg-gray-700 p-4 rounded-lg">
              <h4 className="text-white font-medium mb-3">Color Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-300">Hue:</span>
                  <span className="text-white">{h}°</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Saturation:</span>
                  <span className="text-white">{s}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Lightness:</span>
                  <span className="text-white">{l}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Brightness:</span>
                  <span className="text-white">{Math.round((r * 299 + g * 587 + b * 114) / 1000)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Accessibility Preview */}
        <div className="mt-8 p-6 bg-gray-700/50 rounded-lg">
          <h3 className="text-white font-semibold mb-4">Accessibility Preview</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              className="p-4 rounded-lg"
              style={{ backgroundColor: selectedColor, color: '#ffffff' }}
            >
              <p className="font-semibold">White text on color</p>
              <p className="text-sm">Sample text for contrast testing</p>
            </div>
            <div
              className="p-4 rounded-lg"
              style={{ backgroundColor: selectedColor, color: '#000000' }}
            >
              <p className="font-semibold">Black text on color</p>
              <p className="text-sm">Sample text for contrast testing</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
