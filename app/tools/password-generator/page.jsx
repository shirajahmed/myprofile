

"use client";

import { useCallback, useState } from "react";

export default function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(12);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [copied, setCopied] = useState(false);
  const [strength, setStrength] = useState("");

  const calculateStrength = (pwd) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (pwd.length >= 12) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    
    if (score < 3) return { text: "Weak", color: "text-red-400" };
    if (score < 5) return { text: "Medium", color: "text-yellow-400" };
    return { text: "Strong", color: "text-green-400" };
  };

  const generatePassword = useCallback(() => {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    let chars = "";
    let required = "";
    
    if (options.uppercase) {
      chars += uppercase;
      required += uppercase[Math.floor(Math.random() * uppercase.length)];
    }
    if (options.lowercase) {
      chars += lowercase;
      required += lowercase[Math.floor(Math.random() * lowercase.length)];
    }
    if (options.numbers) {
      chars += numbers;
      required += numbers[Math.floor(Math.random() * numbers.length)];
    }
    if (options.symbols) {
      chars += symbols;
      required += symbols[Math.floor(Math.random() * symbols.length)];
    }

    if (chars === "") chars = lowercase;

    let generated = required;
    for (let i = required.length; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      generated += chars[randomIndex];
    }

    // Shuffle the password
    generated = generated.split('').sort(() => Math.random() - 0.5).join('');
    
    setPassword(generated);
    setStrength(calculateStrength(generated));
    setCopied(false);
  }, [length, options]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy password');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          🔐 Password Generator
        </h1>

        {/* Password Display */}
        <div className="mb-8">
          <div className="flex gap-3 mb-4">
            <input
              type="text"
              value={password}
              readOnly
              className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white font-mono text-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Click generate to create password"
            />
            <button
              onClick={copyToClipboard}
              disabled={!password}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg transition-colors text-white font-semibold"
            >
              {copied ? "✓ Copied!" : "Copy"}
            </button>
          </div>
          
          {password && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">
                Strength: <span className={strength.color}>{strength.text}</span>
              </span>
              <span className="text-gray-400">
                Length: {password.length} characters
              </span>
            </div>
          )}
        </div>

        {/* Length Slider */}
        <div className="mb-8">
          <div className="flex justify-between mb-3">
            <label className="text-white font-medium">Password Length</label>
            <span className="text-blue-400 font-semibold">{length}</span>
          </div>
          <input
            type="range"
            min="4"
            max="50"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>4</span>
            <span>50</span>
          </div>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {Object.entries(options).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
              <div>
                <label className="text-white font-medium capitalize">{key}</label>
                <p className="text-gray-400 text-sm">
                  {key === 'uppercase' && 'A-Z'}
                  {key === 'lowercase' && 'a-z'}
                  {key === 'numbers' && '0-9'}
                  {key === 'symbols' && '!@#$%^&*'}
                </p>
              </div>
              <button
                onClick={() => setOptions((prev) => ({ ...prev, [key]: !value }))}
                className={`relative w-14 h-7 rounded-full p-1 transition-colors ${
                  value ? "bg-blue-500" : "bg-gray-500"
                }`}
              >
                <div
                  className={`bg-white w-5 h-5 rounded-full transform transition-transform ${
                    value ? "translate-x-7" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>

        {/* Generate Button */}
        <button
          onClick={generatePassword}
          className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg transition-all duration-300 font-semibold text-white text-lg transform hover:scale-105"
        >
          Generate Secure Password
        </button>

        {/* Tips */}
        <div className="mt-8 p-4 bg-gray-700/50 rounded-lg">
          <h3 className="text-white font-semibold mb-2">💡 Password Tips:</h3>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>• Use at least 12 characters for better security</li>
            <li>• Include uppercase, lowercase, numbers, and symbols</li>
            <li>• Avoid using personal information</li>
            <li>• Use unique passwords for each account</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
