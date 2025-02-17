"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation"; // Import useSearchParams
import CalculatorModal from "../../components/CalculatorModal";
import {
  calculateAge,
  calculateBMI,
  calculateCalories,
  calculateIdealBodyWeight,
  calculateBodyFatPercentage,
} from "../../utils/calculatorUtils";

// Object to manage calculator categories and buttons
const calculatorCategories = [
  {
    heading: "Health Calculators",
    calculators: [
      {
        title: "Age Calculator",
        onSubmit: calculateAge,
        inputs: [
          { label: "Birth Date (YYYY-MM-DD)", name: "birthDate", type: "date" },
        ],
      },
      {
        title: "BMI Calculator",
        onSubmit: calculateBMI,
        inputs: [
          { label: "Weight (kg)", name: "weight", type: "number" },
          { label: "Height (cm)", name: "height", type: "number" },
        ],
      },
      {
        title: "Calorie Calculator",
        onSubmit: calculateCalories,
        inputs: [
          { label: "Age", name: "age", type: "number" },
          { label: "Gender (male/female)", name: "gender", type: "text" },
          { label: "Weight (kg)", name: "weight", type: "number" },
          { label: "Height (cm)", name: "height", type: "number" },
          { label: "Activity Level", name: "activityLevel", type: "number" },
        ],
      },
      {
        title: "Ideal Body Weight Calculator",
        onSubmit: calculateIdealBodyWeight,
        inputs: [
          { label: "Height (cm)", name: "height", type: "number" },
          { label: "Gender (male/female)", name: "gender", type: "text" },
        ],
      },
      {
        title: "Body Fat Percentage Calculator",
        onSubmit: calculateBodyFatPercentage,
        inputs: [
          { label: "Gender (male/female)", name: "gender", type: "text" },
          { label: "Weight (kg)", name: "weight", type: "number" },
          { label: "Waist (cm)", name: "waist", type: "number" },
          { label: "Neck (cm)", name: "neck", type: "number" },
          { label: "Height (cm)", name: "height", type: "number" },
        ],
      },
    ],
  },
  // Add more categories and calculators here...
];

export default function Calculators() {
  const [modalInfo, setModalInfo] = useState(null);
  const [modalTitle, setModalTitle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Use useSearchParams to read query parameters
  const searchParams = useSearchParams();
  const showExtraButton = searchParams.get("sahil") === "true"; // Check if sahil=true is in the URL

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
    <div className="grid grid-cols-12 gap-6 px-5 my-14 lg:mb-0 md:mb-16 sm:px-20 md:px-32 lg:px-36 xl:px-48 ">
      <div className="h-full col-span-12 p-4 text-base text-center bg-dark-500 lg:col-span-3 rounded-2xl shadow-custom-dark ">
        <>sidebar</>
      </div>
      <div className="flex flex-col col-span-12 overflow-hidden shadow-custom-dark rounded-2xl lg:col-span-9 bg-dark-500">
        <div className="flex items-center justify-between px-5 py-3 my-3 bg-[#18191d] rounded-xl">
          <span className="text-xl font-bold border-b-4 md:text-2xl border-[#a65fa8] text-white">
            Calculators
          </span>
        </div>

        <div className="h-auto bg-[#0a0a0a] rounded-xl text-white p-8 flex flex-col space-y-8">
          {/* Render extra button if sahil=true is in the URL */}
          {showExtraButton && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold border-b-2 border-[#a65fa8]">
                Extra Options
              </h2>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() =>
                    handleButtonClick(
                      "Extra Calculator",
                      () => ({ result: "Extra feature" }),
                      []
                    )
                  }
                  className="px-4 py-2 bg-[#a65fa8] text-white rounded-lg whitespace-nowrap"
                >
                  Extra Button
                </button>
              </div>
            </div>
          )}

          {/* Render regular calculator categories */}
          {calculatorCategories.map((category, index) => (
            <div key={index} className="space-y-4">
              <h2 className="text-xl font-bold border-b-2 border-[#a65fa8]">
                {category.heading}
              </h2>
              <div className="flex flex-wrap gap-2">
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
                    className="px-4 py-2 bg-[#a65fa8] text-white rounded-lg whitespace-nowrap"
                  >
                    {calculator.title}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
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
