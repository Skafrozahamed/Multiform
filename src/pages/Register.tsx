import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/AuthLayout';
import { FormInput } from '../components/FormInput';
import { motion } from 'framer-motion';

export function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    otp: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOTP = () => {
    if (formData.email && formData.phone) {
      // Simulate OTP sending
      const simulatedOTP = '123456';
      setOtpSent(true);
      // Show OTP in an alert for demo purposes
      alert(`Demo OTP: ${simulatedOTP}`);
    }
  };

  const handleVerifyOTP = () => {
    if (formData.otp === '123456') { // Demo OTP verification
      setOtpVerified(true);
      setErrors(prev => ({ ...prev, otp: '' }));
    } else {
      setErrors(prev => ({ ...prev, otp: 'Invalid OTP' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm() && otpVerified) {
      localStorage.setItem('userData', JSON.stringify({
        fullName: formData.name,
        email: formData.email,
        phone: formData.phone,
      }));
      navigate('/login');
    }
  };

  return (
    <AuthLayout title="Create your account">
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <FormInput
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          error={errors.name}
        />
        <FormInput
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          error={errors.email}
        />
        <FormInput
          label="Phone Number"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          error={errors.phone}
          placeholder="10-digit mobile number"
        />
        
        {!otpSent && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={handleSendOTP}
            className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Send OTP
          </motion.button>
        )}

        {otpSent && !otpVerified && (
          <>
            <FormInput
              label="Enter OTP"
              name="otp"
              value={formData.otp}
              onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
              error={errors.otp}
              placeholder="Enter 6-digit OTP"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={handleVerifyOTP}
              className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Verify OTP
            </motion.button>
          </>
        )}

        {otpVerified && (
          <>
            <FormInput
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              error={errors.password}
            />
            <FormInput
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              error={errors.confirmPassword}
            />

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Register
            </motion.button>
          </>
        )}

        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:text-blue-500">
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}