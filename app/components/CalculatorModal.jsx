"use client";

import { useState } from "react";

export default function CalculatorModal({ title, onClose, onSubmit, inputs }) {
  const [results, setResults] = useState(null);
  const [inputValues, setInputValues] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleSubmit = async () => {
    const result = await onSubmit(inputValues);
    setResults(result);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-[#18191d] p-6 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        {!results ? (
          <>
            {inputs.map((input, index) => (
              <div key={index} className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  {input.label}
                </label>
                <input
                  type={input.type || "text"}
                  name={input.name}
                  value={inputValues[input.name] || ""}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-[#0a0a0a] rounded-lg text-white"
                />
              </div>
            ))}
            <button
              onClick={handleSubmit}
              className="w-full px-4 py-2 bg-[#a65fa8] text-white rounded-lg"
            >
              Calculate
            </button>
          </>
        ) : (
          <>
            <pre className="text-sm text-white overflow-auto">
              {JSON.stringify(results, null, 2)}
            </pre>
            <button
              onClick={onClose}
              className="mt-4 px-4 py-2 bg-[#a65fa8] text-white rounded-lg"
            >
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
}
