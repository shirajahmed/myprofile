export const metadata = {
  title: 'Advanced Calculator Suite - Health, Finance, Math & Utility Calculators',
  description: 'Comprehensive collection of calculators including BMI, loan, tip, percentage, GPA, and productivity calculators. Free online tools for daily calculations.',
  keywords: 'calculator, BMI calculator, loan calculator, tip calculator, percentage calculator, GPA calculator, age calculator, compound interest, productivity tools',
};

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {children}
    </div>
  );
}
