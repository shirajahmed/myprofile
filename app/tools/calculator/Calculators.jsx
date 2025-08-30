"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import CalculatorModal from "../../components/CalculatorModal";
import {
  calculateAge,
  calculateBMI,
  calculateCalories,
  calculateIdealBodyWeight,
  calculateBodyFatPercentage,
  calculateTip,
  calculatePercentage,
  calculateLoan,
  calculateCompoundInterest,
  calculateDiscount,
  calculateGPA,
  calculateFuelEfficiency,
  calculateTimeZone,
} from "../../utils/calculatorUtils";

const calculatorCategories = [
  {
    heading: "🏥 Health Calculators",
    calculators: [
      {
        title: "Age Calculator",
        onSubmit: (data) => calculateAge(data.birthDate),
        inputs: [
          { label: "Birth Date", name: "birthDate", type: "date" },
        ],
      },
      {
        title: "BMI Calculator",
        onSubmit: (data) => calculateBMI(data.weight, data.height),
        inputs: [
          { label: "Weight (kg)", name: "weight", type: "number", placeholder: "70" },
          { label: "Height (cm)", name: "height", type: "number", placeholder: "175" },
        ],
      },
      {
        title: "Calorie Calculator",
        onSubmit: (data) => calculateCalories(data.age, data.gender, data.weight, data.height, data.activityLevel),
        inputs: [
          { label: "Age", name: "age", type: "number", placeholder: "25" },
          { label: "Gender", name: "gender", type: "select", options: ["male", "female"] },
          { label: "Weight (kg)", name: "weight", type: "number", placeholder: "70" },
          { label: "Height (cm)", name: "height", type: "number", placeholder: "175" },
          { label: "Activity Level", name: "activityLevel", type: "select", options: [
            { value: 1.2, label: "Sedentary (little/no exercise)" },
            { value: 1.375, label: "Light activity (light exercise 1-3 days/week)" },
            { value: 1.55, label: "Moderate activity (moderate exercise 3-5 days/week)" },
            { value: 1.725, label: "Very active (hard exercise 6-7 days/week)" },
            { value: 1.9, label: "Extremely active (very hard exercise, physical job)" }
          ]},
        ],
      },
      {
        title: "Ideal Body Weight",
        onSubmit: (data) => calculateIdealBodyWeight(data.height, data.gender),
        inputs: [
          { label: "Height (cm)", name: "height", type: "number", placeholder: "175" },
          { label: "Gender", name: "gender", type: "select", options: ["male", "female"] },
        ],
      },
    ],
  },
  {
    heading: "💰 Financial Calculators",
    calculators: [
      {
        title: "Tip Calculator",
        onSubmit: (data) => calculateTip(data.billAmount, data.tipPercentage, data.numberOfPeople),
        inputs: [
          { label: "Bill Amount ($)", name: "billAmount", type: "number", placeholder: "100" },
          { label: "Tip Percentage (%)", name: "tipPercentage", type: "number", placeholder: "15" },
          { label: "Number of People", name: "numberOfPeople", type: "number", placeholder: "1" },
        ],
      },
      {
        title: "Loan Calculator",
        onSubmit: (data) => calculateLoan(data.principal, data.rate, data.years),
        inputs: [
          { label: "Loan Amount ($)", name: "principal", type: "number", placeholder: "10000" },
          { label: "Annual Interest Rate (%)", name: "rate", type: "number", placeholder: "5" },
          { label: "Loan Term (years)", name: "years", type: "number", placeholder: "5" },
        ],
      },
      {
        title: "Compound Interest",
        onSubmit: (data) => calculateCompoundInterest(data.principal, data.rate, data.time, data.compound),
        inputs: [
          { label: "Principal Amount ($)", name: "principal", type: "number", placeholder: "1000" },
          { label: "Annual Interest Rate (%)", name: "rate", type: "number", placeholder: "5" },
          { label: "Time (years)", name: "time", type: "number", placeholder: "10" },
          { label: "Compound Frequency", name: "compound", type: "select", options: [
            { value: 1, label: "Annually" },
            { value: 2, label: "Semi-annually" },
            { value: 4, label: "Quarterly" },
            { value: 12, label: "Monthly" },
            { value: 365, label: "Daily" }
          ]},
        ],
      },
      {
        title: "Discount Calculator",
        onSubmit: (data) => calculateDiscount(data.originalPrice, data.discountPercentage),
        inputs: [
          { label: "Original Price ($)", name: "originalPrice", type: "number", placeholder: "100" },
          { label: "Discount Percentage (%)", name: "discountPercentage", type: "number", placeholder: "20" },
        ],
      },
    ],
  },
  {
    heading: "📊 Math & Percentage",
    calculators: [
      {
        title: "Percentage Calculator",
        onSubmit: (data) => calculatePercentage(data.value, data.total),
        inputs: [
          { label: "Value", name: "value", type: "number", placeholder: "25" },
          { label: "Total", name: "total", type: "number", placeholder: "100" },
        ],
      },
      {
        title: "GPA Calculator",
        onSubmit: (data) => calculateGPA(data.grades, data.credits),
        inputs: [
          { label: "Grades (comma separated, e.g., 4,3.5,3.7)", name: "grades", type: "text", placeholder: "4,3.5,3.7,4" },
          { label: "Credits (comma separated, e.g., 3,4,3)", name: "credits", type: "text", placeholder: "3,4,3,3" },
        ],
      },
    ],
  },
  {
    heading: "🚗 Utility Calculators",
    calculators: [
      {
        title: "Fuel Efficiency",
        onSubmit: (data) => calculateFuelEfficiency(data.distance, data.fuel),
        inputs: [
          { label: "Distance (miles/km)", name: "distance", type: "number", placeholder: "300" },
          { label: "Fuel Used (gallons/liters)", name: "fuel", type: "number", placeholder: "12" },
        ],
      },
      {
        title: "Time Zone Converter",
        onSubmit: (data) => calculateTimeZone(data.time, data.fromZone, data.toZone),
        inputs: [
          { label: "Time (HH:MM)", name: "time", type: "time", placeholder: "14:30" },
          { label: "From Timezone", name: "fromZone", type: "select", options: [
            { value: "UTC", label: "UTC" },
            { value: "EST", label: "Eastern (EST)" },
            { value: "PST", label: "Pacific (PST)" },
            { value: "GMT", label: "Greenwich (GMT)" },
            { value: "IST", label: "India (IST)" },
          ]},
          { label: "To Timezone", name: "toZone", type: "select", options: [
            { value: "UTC", label: "UTC" },
            { value: "EST", label: "Eastern (EST)" },
            { value: "PST", label: "Pacific (PST)" },
            { value: "GMT", label: "Greenwich (GMT)" },
            { value: "IST", label: "India (IST)" },
          ]},
        ],
      },
    ],
  },
];

export default function Calculators() {
  const [modalInfo, setModalInfo] = useState(null);
  const [modalTitle, setModalTitle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const searchParams = useSearchParams();
  const showExtraButton = searchParams.get("sahil") === "true";

  const handleButtonClick = (title, onSubmit, inputs) => {
    setModalTitle(title);
    setModalInfo({ onSubmit, inputs });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalInfo(null);
    setModalTitle("");
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">🧮 Advanced Calculators</h1>
        <p className="text-gray-400">Professional calculators for health, finance, math, and daily utilities</p>
      </div>

      <div className="space-y-8">
        {showExtraButton && (
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold text-white mb-4">🎉 Special Calculator</h2>
            <button
              onClick={() =>
                handleButtonClick(
                  "Sahil Calculator",
                  () => ({ result: "🐰 ja beta kaaam daam kor" }),
                  []
                )
              }
              className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Click me very softly
            </button>
          </div>
        )}

        {calculatorCategories.map((category, index) => (
          <div key={index} className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6 border-b border-gray-600 pb-3">
              {category.heading}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {category.calculators.map((calculator, idx) => (
                <button
                  key={idx}
                  onClick={() =>
                    handleButtonClick(
                      calculator.title,
                      calculator.onSubmit,
                      calculator.inputs
                    )
                  }
                  className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <div className="font-semibold text-center">{calculator.title}</div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <CalculatorModal
          title={modalTitle}
          onClose={closeModal}
          onSubmit={modalInfo.onSubmit}
          inputs={modalInfo.inputs}
        />
      )}
    </div>
  );
}
