// utils/calculatorUtils.js

// Age Calculator
export const calculateAge = (birthDate) => {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return { age };
};

// BMI Calculator
export const calculateBMI = (weight, height) => {
  const bmi = (weight / (height / 100) ** 2).toFixed(2);
  return { bmi };
};

// Calorie Calculator
export const calculateCalories = (
  age,
  gender,
  weight,
  height,
  activityLevel
) => {
  let bmr;
  if (gender === "male") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }
  const calories = (bmr * activityLevel).toFixed(2);
  return { calories };
};

// Ideal Body Weight Calculator
export const calculateIdealBodyWeight = (height, gender) => {
  let idealWeight;
  if (gender === "male") {
    idealWeight = 50 + 0.9 * (height - 152);
  } else {
    idealWeight = 45.5 + 0.9 * (height - 152);
  }
  return { idealWeight: idealWeight.toFixed(2) };
};

// Body Fat Percentage Calculator
export const calculateBodyFatPercentage = (
  gender,
  weight,
  waist,
  neck,
  height
) => {
  let bodyFat;
  if (gender === "male") {
    bodyFat =
      495 /
        (1.0324 -
          0.19077 * Math.log10(waist - neck) +
          0.15456 * Math.log10(height)) -
      450;
  } else {
    bodyFat =
      495 / (1.29579 - 0.35004 * Math.log10(waist + height - neck)) - 450;
  }
  return { bodyFat: bodyFat.toFixed(2) };
};

// Add more calculator functions as needed...
