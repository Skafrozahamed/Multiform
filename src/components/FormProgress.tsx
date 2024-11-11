import React from 'react';
import { Check, Circle } from 'lucide-react';

interface FormProgressProps {
  currentStep: number;
  steps: string[];
}

export function FormProgress({ currentStep, steps }: FormProgressProps) {
  return (
    <div className="w-full max-w-3xl mx-auto mb-8">
      <div className="flex justify-between items-center">
        {steps.map((step, index) => (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 
                  ${
                    index < currentStep
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : index === currentStep
                      ? 'border-blue-600 text-blue-600'
                      : 'border-gray-300 text-gray-300'
                  }`}
              >
                {index < currentStep ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <Circle className="w-5 h-5" />
                )}
              </div>
              <span
                className={`mt-2 text-sm ${
                  index <= currentStep ? 'text-blue-600' : 'text-gray-400'
                }`}
              >
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 ${
                  index < currentStep ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}