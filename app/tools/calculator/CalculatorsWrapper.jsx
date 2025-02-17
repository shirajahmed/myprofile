"use client";

import { Suspense } from "react";
import Calculators from "./Calculators";

export default function CalculatorsWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Calculators />
    </Suspense>
  );
}
