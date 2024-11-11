import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PaymentForm } from '../components/PaymentForm';
import { motion } from 'framer-motion';

export function Payment() {
  const navigate = useNavigate();

  const handlePayment = (paymentMethod: string, details: any) => {
    console.log('Payment processed:', { paymentMethod, details });
    // Add payment processing logic here
    alert('Payment successful!');
    navigate('/form');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Details</h2>
          <PaymentForm onSubmit={handlePayment} />
        </motion.div>
      </div>
    </div>
  );
}