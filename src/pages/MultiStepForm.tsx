import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormLayout } from '../components/FormLayout';
import { FormInput } from '../components/FormInput';
import { FormData, FormErrors } from '../types';
import { motion } from 'framer-motion';

const STEPS = ['Personal & Family Details', 'Education Details', 'Bank Details'];

export function MultiStepForm() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [hasHigherStudies, setHasHigherStudies] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    // Personal & Family Details
    fullName: '',
    email: '',
    phone: '',
    fatherName: '',
    motherName: '',
    address: '',
    occupation: '',
    income: '',
    panId: '',
    aadhaarId: '',
    
    // Bank Details
    accountName: '',
    accountNumber: '',
    confirmAccountNumber: '',
    ifscCode: '',
    
    // Education Details
    xBoard: '',
    xYear: '',
    xPercentage: '',
    xMarksheet: null,
    xiiBoard: '',
    xiiYear: '',
    xiiPercentage: '',
    xiiMarksheet: null,
    collegeName: '',
    collegeYear: '',
    collegePercentage: '',
    collegeMarksheet: null,
  });
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    // Auto-fill personal details from registration
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedData = JSON.parse(userData);
      setFormData(prev => ({
        ...prev,
        fullName: parsedData.fullName || '',
        email: parsedData.email || '',
        phone: parsedData.phone || '',
      }));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;
    if (type === 'file' && files) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      if (errors[name as keyof FormErrors]) {
        setErrors(prev => ({ ...prev, [name]: '' }));
      }
    }
  };

  const validateStep = () => {
    const newErrors: FormErrors = {};
    const currentFields = getStepFields(currentStep);

    currentFields.forEach(field => {
      const value = formData[field];
      if (!value && field !== 'collegeName' && field !== 'collegeYear' && field !== 'collegePercentage' && field !== 'collegeMarksheet') {
        newErrors[field] = 'This field is required';
      }

      // Validation rules
      if (field === 'phone' && value && !/^\d{10}$/.test(value as string)) {
        newErrors.phone = 'Phone number must be 10 digits';
      }
      if (field === 'aadhaarId' && value && !/^\d{12}$/.test(value as string)) {
        newErrors.aadhaarId = 'Aadhaar number must be 12 digits';
      }
      if (field === 'panId' && value && !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(value as string)) {
        newErrors.panId = 'Invalid PAN number format';
      }
      if (field === 'confirmAccountNumber' && value !== formData.accountNumber) {
        newErrors.confirmAccountNumber = 'Account numbers do not match';
      }
      if (field === 'ifscCode' && value && !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(value as string)) {
        newErrors.ifscCode = 'Invalid IFSC code format';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (currentStep === STEPS.length - 1) {
        navigate('/payment');
      } else {
        setCurrentStep(prev => prev + 1);
      }
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const getStepFields = (step: number) => {
    switch (step) {
      case 0:
        return [
          'fullName', 'email', 'phone', 'fatherName', 'motherName',
          'address', 'occupation', 'income', 'panId', 'aadhaarId'
        ];
      case 1:
        return hasHigherStudies
          ? ['xBoard', 'xYear', 'xPercentage', 'xMarksheet', 'xiiBoard', 'xiiYear', 'xiiPercentage', 'xiiMarksheet', 'collegeName', 'collegeYear', 'collegePercentage', 'collegeMarksheet']
          : ['xBoard', 'xYear', 'xPercentage', 'xMarksheet', 'xiiBoard', 'xiiYear', 'xiiPercentage', 'xiiMarksheet'];
      case 2:
        return ['accountName', 'accountNumber', 'confirmAccountNumber', 'ifscCode'];
      default:
        return [];
    }
  };

  const getCurrentStepFields = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                error={errors.fullName}
                required
              />
              <FormInput
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                error={errors.email}
                required
              />
              <FormInput
                label="Phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                error={errors.phone}
                required
              />
              <FormInput
                label="Father's Name"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleInputChange}
                error={errors.fatherName}
                required
              />
              <FormInput
                label="Mother's Name"
                name="motherName"
                value={formData.motherName}
                onChange={handleInputChange}
                error={errors.motherName}
                required
              />
              <FormInput
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                error={errors.address}
                required
              />
              <FormInput
                label="Occupation"
                name="occupation"
                value={formData.occupation}
                onChange={handleInputChange}
                error={errors.occupation}
                required
              />
              <FormInput
                label="Annual Income"
                type="number"
                name="income"
                value={formData.income}
                onChange={handleInputChange}
                error={errors.income}
                required
              />
              <FormInput
                label="PAN Number"
                name="panId"
                value={formData.panId}
                onChange={handleInputChange}
                error={errors.panId}
                placeholder="ABCDE1234F"
                required
              />
              <FormInput
                label="Aadhaar Number"
                name="aadhaarId"
                value={formData.aadhaarId}
                onChange={handleInputChange}
                error={errors.aadhaarId}
                placeholder="12-digit number"
                required
              />
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="X Board"
                name="xBoard"
                value={formData.xBoard}
                onChange={handleInputChange}
                error={errors.xBoard}
                required
              />
              <FormInput
                label="X Year"
                name="xYear"
                value={formData.xYear}
                onChange={handleInputChange}
                error={errors.xYear}
                required
              />
              <FormInput
                label="X Percentage"
                type="number"
                name="xPercentage"
                value={formData.xPercentage}
                onChange={handleInputChange}
                error={errors.xPercentage}
                required
              />
              <FormInput
                label="X Marksheet"
                type="file"
                name="xMarksheet"
                onChange={handleInputChange}
                error={errors.xMarksheet}
                required
              />
              <FormInput
                label="XII Board"
                name="xiiBoard"
                value={formData.xiiBoard}
                onChange={handleInputChange}
                error={errors.xiiBoard}
                required
              />
              <FormInput
                label="XII Year"
                name="xiiYear"
                value={formData.xiiYear}
                onChange={handleInputChange}
                error={errors.xiiYear}
                required
              />
              <FormInput
                label="XII Percentage"
                type="number"
                name="xiiPercentage"
                value={formData.xiiPercentage}
                onChange={handleInputChange}
                error={errors.xiiPercentage}
                required
              />
              <FormInput
                label="XII Marksheet"
                type="file"
                name="xiiMarksheet"
                onChange={handleInputChange}
                error={errors.xiiMarksheet}
                required
              />
            </div>

            <div className="mt-6">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={hasHigherStudies}
                  onChange={(e) => setHasHigherStudies(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">I have higher studies</span>
              </label>
            </div>

            {hasHigherStudies && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <FormInput
                  label="College Name"
                  name="collegeName"
                  value={formData.collegeName}
                  onChange={handleInputChange}
                  error={errors.collegeName}
                />
                <FormInput
                  label="Passing Year"
                  name="collegeYear"
                  value={formData.collegeYear}
                  onChange={handleInputChange}
                  error={errors.collegeYear}
                />
                <FormInput
                  label="Percentage"
                  type="number"
                  name="collegePercentage"
                  value={formData.collegePercentage}
                  onChange={handleInputChange}
                  error={errors.collegePercentage}
                />
                <FormInput
                  label="College Marksheet"
                  type="file"
                  name="collegeMarksheet"
                  onChange={handleInputChange}
                  error={errors.collegeMarksheet}
                />
              </div>
            )}
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <FormInput
              label="Account Holder Name"
              name="accountName"
              value={formData.accountName}
              onChange={handleInputChange}
              error={errors.accountName}
              required
            />
            <FormInput
              label="Account Number"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleInputChange}
              error={errors.accountNumber}
              required
            />
            <FormInput
              label="Confirm Account Number"
              name="confirmAccountNumber"
              value={formData.confirmAccountNumber}
              onChange={handleInputChange}
              error={errors.confirmAccountNumber}
              required
            />
            <FormInput
              label="IFSC Code"
              name="ifscCode"
              value={formData.ifscCode}
              onChange={handleInputChange}
              error={errors.ifscCode}
              placeholder="ABCD0123456"
              required
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <FormLayout
      title={STEPS[currentStep]}
      currentStep={currentStep}
      steps={STEPS}
    >
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        {getCurrentStepFields()}
        
        <div className="flex justify-between mt-8">
          {currentStep > 0 && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={handleBack}
              className="px-6 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200"
            >
              Back
            </motion.button>
          )}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={handleNext}
            className="ml-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {currentStep === STEPS.length - 1 ? 'Submit' : 'Next'}
          </motion.button>
        </div>
      </form>
    </FormLayout>
  );
}