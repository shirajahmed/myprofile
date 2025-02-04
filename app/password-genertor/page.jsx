"use client";

import { useCallback, useState } from "react";

export default function Home() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(12);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });

  const generatePassword = useCallback(() => {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    let chars = "";
    if (options.uppercase) chars += uppercase;
    if (options.lowercase) chars += lowercase;
    if (options.numbers) chars += numbers;
    if (options.symbols) chars += symbols;

    // Fallback to lowercase if no options are selected
    if (chars === "") chars = lowercase;

    let generated = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      generated += chars[randomIndex];
    }
    setPassword(generated);
  }, [length, options]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
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

            {/* Password Display */}
            <div className="flex gap-2 mb-6">
              <input
                type="text"
                value={password}
                readOnly
                className="w-full px-4 py-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Generated password"
              />
              <button
                onClick={copyToClipboard}
                className="px-4 py-2 bg-green-500 hover:bg-blue-700 rounded transition-colors"
              >
                Copy
              </button>
            </div>

            {/* Length Slider */}
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <label>Password Length: {length}</label>
              </div>
              <input
                type="range"
                min="4"
                max="40"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Options */}
            <div className="space-y-3 mb-6">
              {Object.entries(options).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <label className="capitalize">{key}</label>
                  <button
                    onClick={() =>
                      setOptions((prev) => ({ ...prev, [key]: !value }))
                    }
                    className={`w-12 h-6 rounded-full p-1 transition-colors ${
                      value ? "bg-green-500" : "bg-gray-600"
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full transform transition-transform ${
                        value ? "translate-x-6" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>

            {/* Generate Button */}
            <button
              onClick={generatePassword}
              className="w-full py-3 bg-green-500 hover:bg-green-700 rounded transition-colors font-semibold"
            >
              Generate Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
