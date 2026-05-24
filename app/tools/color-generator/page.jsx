

"use client";

import { useState } from "react";

import ToolPageWrapper from "../../components/ToolPageWrapper";

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
    <ToolPageWrapper title="🎨 Color Generator & Palette" description="Pick colors and get all formats instantly">
      <div className="grid lg:grid-cols-2 gap-8">
          {/* Color Picker */}
          <div className="space-y-5">
            <div className="text-center">
              <div className="w-40 h-40 mx-auto rounded-2xl shadow-lg border border-gray-200 dark:border-gray-600 mb-4"
                style={{ backgroundColor: `rgba(${r}, ${g}, ${b}, ${alphaDecimal})` }} />
              <div className="flex gap-3 justify-center">
                <input type="color" value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}
                  className="w-14 h-10 rounded-lg cursor-pointer border border-gray-300 dark:border-gray-600" />
                <button onClick={generateRandomColor}
                  className="px-4 py-2 bg-[#a65fa8] hover:bg-purple-700 rounded-lg text-white font-medium transition-colors">
                  Random
                </button>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-gray-700 dark:text-gray-300 font-medium">Opacity</label>
                <span className="text-[#a65fa8] font-semibold">{opacity}%</span>
              </div>
              <input type="range" min="0" max="100" value={opacity} onChange={(e) => setOpacity(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer" />
            </div>

            <div>
              <h3 className="text-gray-700 dark:text-gray-300 font-medium mb-2">Palette</h3>
              <div className="grid grid-cols-5 gap-2">
                {palette.map((color, i) => (
                  <div key={i} className="aspect-square rounded-lg cursor-pointer border border-gray-200 dark:border-gray-600 hover:scale-105 transition-transform"
                    style={{ backgroundColor: color }} onClick={() => setSelectedColor(color)} title={color} />
                ))}
              </div>
            </div>
          </div>

          {/* Formats */}
          <div className="space-y-3">
            <h3 className="text-gray-700 dark:text-gray-300 font-medium">Color Formats</h3>
            {colorFormats.map((format) => (
              <div key={format.name} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-gray-700 dark:text-gray-200 font-medium text-sm">{format.name}</span>
                  <button onClick={() => copyToClipboard(format.value, format.name)}
                    className="px-3 py-1 bg-[#a65fa8] hover:bg-purple-700 rounded text-white text-xs transition-colors">
                    {copiedFormat === format.name ? "✓ Copied!" : "Copy"}
                  </button>
                </div>
                <div className="bg-white dark:bg-gray-800 p-2 rounded font-mono text-xs text-gray-700 dark:text-gray-300">
                  {format.value}
                </div>
              </div>
            ))}

            <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
              <h4 className="text-gray-700 dark:text-gray-200 font-medium mb-2 text-sm">Accessibility Preview</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 rounded-lg text-sm" style={{ backgroundColor: selectedColor, color: '#fff' }}>White text</div>
                <div className="p-3 rounded-lg text-sm" style={{ backgroundColor: selectedColor, color: '#000' }}>Black text</div>
              </div>
            </div>
          </div>
        </div>
    </ToolPageWrapper>
  );
}
