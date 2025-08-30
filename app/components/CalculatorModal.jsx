"use client";

import { useState } from "react";

export default function CalculatorModal({ title, onClose, onSubmit, inputs }) {
  const [results, setResults] = useState(null);
  const [inputValues, setInputValues] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
    setError(null);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Validate required inputs
      const missingInputs = inputs.filter(input => 
        !inputValues[input.name] && input.type !== "select"
      );
      
      if (missingInputs.length > 0) {
        setError(`Please fill in: ${missingInputs.map(i => i.label).join(', ')}`);
        setLoading(false);
        return;
      }

      const result = await onSubmit(inputValues);
      
      if (result.error) {
        setError(result.error);
      } else {
        setResults(result);
      }
    } catch (err) {
      setError("Calculation failed. Please check your inputs.");
    }
    
    setLoading(false);
  };

  const renderInput = (input, index) => {
    if (input.type === "select") {
      return (
        <select
          key={index}
          name={input.name}
          value={inputValues[input.name] || ""}
          onChange={handleInputChange}
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Select {input.label}</option>
          {input.options.map((option, idx) => (
            <option key={idx} value={typeof option === 'object' ? option.value : option}>
              {typeof option === 'object' ? option.label : option}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input
        key={index}
        type={input.type || "text"}
        name={input.name}
        value={inputValues[input.name] || ""}
        onChange={handleInputChange}
        placeholder={input.placeholder}
        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    );
  };

  const renderResults = (results) => {
    return (
      <div className="space-y-4">
        {Object.entries(results).map(([key, value]) => (
          <div key={key} className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
            <span className="text-gray-300 capitalize font-medium">
              {key.replace(/([A-Z])/g, ' $1').trim()}:
            </span>
            <span className="text-white font-semibold">{value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-gray-700">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {!results ? (
          <>
            {/* Input Form */}
            <div className="space-y-4 mb-6">
              {inputs.map((input, index) => (
                <div key={index}>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {input.label}
                  </label>
                  {renderInput(input, index)}
                </div>
              ))}
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-300 text-sm">
                {error}
              </div>
            )}

            {/* Calculate Button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Calculating...
                </div>
              ) : (
                "Calculate"
              )}
            </button>
          </>
        ) : (
          <>
            {/* Results */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-4">Results:</h3>
              {renderResults(results)}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setResults(null);
                  setInputValues({});
                  setError(null);
                }}
                className="flex-1 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Calculate Again
              </button>
              <button
                onClick={onClose}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
              >
                Close
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
