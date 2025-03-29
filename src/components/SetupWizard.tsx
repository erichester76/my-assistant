// src/components/SetupWizard.tsx
'use client'; // Client component directive

import { useState } from 'react';

export default function SetupWizard() {
  const [step, setStep] = useState(1);

  return (
    <div>
      <h2>Setup Step {step}</h2>
      <button onClick={() => setStep(step + 1)}>Next</button>
    </div>
  );
}