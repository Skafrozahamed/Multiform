import React from 'react';
import { FormProgress } from './FormProgress';

interface FormLayoutProps {
  children: React.ReactNode;
  title: string;
  currentStep: number;
  steps: string[];
}

export function FormLayout({ children, title, currentStep, steps }: FormLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <FormProgress currentStep={currentStep} steps={steps} />
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
          {children}
        </div>
      </div>
    </div>
  );
}