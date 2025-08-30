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
  
  // Calculate detailed age
  let months = monthDiff;
  if (months < 0) {
    months += 12;
  }
  
  let days = today.getDate() - birth.getDate();
  if (days < 0) {
    const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += lastMonth.getDate();
    months--;
  }
  
  return { 
    age: `${age} years, ${months} months, ${days} days`,
    totalDays: Math.floor((today - birth) / (1000 * 60 * 60 * 24)),
    nextBirthday: `${365 - Math.floor((today - new Date(today.getFullYear(), birth.getMonth(), birth.getDate())) / (1000 * 60 * 60 * 24))} days`
  };
};

// BMI Calculator
export const calculateBMI = (weight, height) => {
  const bmi = (weight / (height / 100) ** 2).toFixed(2);
  let category = "";
  
  if (bmi < 18.5) category = "Underweight";
  else if (bmi < 25) category = "Normal weight";
  else if (bmi < 30) category = "Overweight";
  else category = "Obese";
  
  return { 
    bmi: parseFloat(bmi),
    category,
    healthyRange: "18.5 - 24.9"
  };
};

// Calorie Calculator
export const calculateCalories = (age, gender, weight, height, activityLevel) => {
  let bmr;
  if (gender === "male") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }
  
  const calories = Math.round(bmr * parseFloat(activityLevel));
  
  return { 
    bmr: Math.round(bmr),
    maintenanceCalories: calories,
    weightLoss: Math.round(calories - 500),
    weightGain: Math.round(calories + 500)
  };
};

// Ideal Body Weight Calculator
export const calculateIdealBodyWeight = (height, gender) => {
  let idealWeight;
  if (gender === "male") {
    idealWeight = 50 + 0.9 * (height - 152);
  } else {
    idealWeight = 45.5 + 0.9 * (height - 152);
  }
  
  return { 
    idealWeight: Math.round(idealWeight * 10) / 10,
    range: `${Math.round((idealWeight - 5) * 10) / 10} - ${Math.round((idealWeight + 5) * 10) / 10} kg`
  };
};

// Body Fat Percentage Calculator
export const calculateBodyFatPercentage = (gender, weight, waist, neck, height) => {
  let bodyFat;
  if (gender === "male") {
    bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
  } else {
    bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(waist + height - neck)) - 450;
  }
  
  return { 
    bodyFat: Math.round(bodyFat * 10) / 10,
    category: bodyFat < 15 ? "Athletic" : bodyFat < 25 ? "Fit" : "Average"
  };
};

// Tip Calculator
export const calculateTip = (billAmount, tipPercentage, numberOfPeople = 1) => {
  const bill = parseFloat(billAmount);
  const tip = parseFloat(tipPercentage);
  const people = parseInt(numberOfPeople);
  
  const tipAmount = (bill * tip) / 100;
  const totalAmount = bill + tipAmount;
  const perPerson = totalAmount / people;
  
  return {
    billAmount: bill.toFixed(2),
    tipAmount: tipAmount.toFixed(2),
    totalAmount: totalAmount.toFixed(2),
    perPerson: perPerson.toFixed(2),
    tipPerPerson: (tipAmount / people).toFixed(2)
  };
};

// Percentage Calculator
export const calculatePercentage = (value, total) => {
  const val = parseFloat(value);
  const tot = parseFloat(total);
  const percentage = (val / tot) * 100;
  
  return {
    percentage: percentage.toFixed(2),
    fraction: `${val}/${tot}`,
    decimal: (val / tot).toFixed(4)
  };
};

// Loan Calculator
export const calculateLoan = (principal, rate, years) => {
  const p = parseFloat(principal);
  const r = parseFloat(rate) / 100 / 12;
  const n = parseFloat(years) * 12;
  
  const monthlyPayment = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalAmount = monthlyPayment * n;
  const totalInterest = totalAmount - p;
  
  return {
    monthlyPayment: monthlyPayment.toFixed(2),
    totalAmount: totalAmount.toFixed(2),
    totalInterest: totalInterest.toFixed(2),
    principal: p.toFixed(2)
  };
};

// Compound Interest Calculator
export const calculateCompoundInterest = (principal, rate, time, compound) => {
  const p = parseFloat(principal);
  const r = parseFloat(rate) / 100;
  const t = parseFloat(time);
  const n = parseFloat(compound);
  
  const amount = p * Math.pow(1 + r / n, n * t);
  const interest = amount - p;
  
  return {
    finalAmount: amount.toFixed(2),
    totalInterest: interest.toFixed(2),
    principal: p.toFixed(2),
    growthMultiplier: (amount / p).toFixed(2)
  };
};

// Discount Calculator
export const calculateDiscount = (originalPrice, discountPercentage) => {
  const original = parseFloat(originalPrice);
  const discount = parseFloat(discountPercentage);
  
  const discountAmount = (original * discount) / 100;
  const finalPrice = original - discountAmount;
  const savings = discountAmount;
  
  return {
    originalPrice: original.toFixed(2),
    discountAmount: discountAmount.toFixed(2),
    finalPrice: finalPrice.toFixed(2),
    savings: savings.toFixed(2),
    savingsPercentage: discount.toFixed(1)
  };
};

// GPA Calculator
export const calculateGPA = (grades, credits) => {
  const gradeArray = grades.split(',').map(g => parseFloat(g.trim()));
  const creditArray = credits.split(',').map(c => parseFloat(c.trim()));
  
  if (gradeArray.length !== creditArray.length) {
    return { error: "Number of grades and credits must match" };
  }
  
  let totalPoints = 0;
  let totalCredits = 0;
  
  for (let i = 0; i < gradeArray.length; i++) {
    totalPoints += gradeArray[i] * creditArray[i];
    totalCredits += creditArray[i];
  }
  
  const gpa = totalPoints / totalCredits;
  
  return {
    gpa: gpa.toFixed(3),
    totalCredits: totalCredits,
    totalPoints: totalPoints.toFixed(2),
    letterGrade: gpa >= 3.7 ? "A" : gpa >= 3.0 ? "B" : gpa >= 2.0 ? "C" : "D"
  };
};

// Fuel Efficiency Calculator
export const calculateFuelEfficiency = (distance, fuel) => {
  const dist = parseFloat(distance);
  const fuelUsed = parseFloat(fuel);
  
  const mpg = dist / fuelUsed;
  const kmpl = mpg * 0.425144; // Convert to km/l if needed
  
  return {
    efficiency: mpg.toFixed(2),
    unit: "miles per gallon",
    kmPerLiter: kmpl.toFixed(2),
    costPer100Miles: ((100 / mpg) * 3.5).toFixed(2) // Assuming $3.5/gallon
  };
};

// Time Zone Converter
export const calculateTimeZone = (time, fromZone, toZone) => {
  const timeZones = {
    UTC: 0,
    GMT: 0,
    EST: -5,
    PST: -8,
    IST: 5.5
  };
  
  const [hours, minutes] = time.split(':').map(Number);
  const fromOffset = timeZones[fromZone] || 0;
  const toOffset = timeZones[toZone] || 0;
  
  let convertedHours = hours + (toOffset - fromOffset);
  let day = 0;
  
  if (convertedHours >= 24) {
    day = 1;
    convertedHours -= 24;
  } else if (convertedHours < 0) {
    day = -1;
    convertedHours += 24;
  }
  
  const dayText = day === 1 ? " (+1 day)" : day === -1 ? " (-1 day)" : "";
  
  return {
    originalTime: `${time} ${fromZone}`,
    convertedTime: `${String(convertedHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${toZone}${dayText}`,
    timeDifference: `${Math.abs(toOffset - fromOffset)} hours`,
    dayChange: dayText || "Same day"
  };
};
