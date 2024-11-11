import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { Wallet, CreditCard, QrCode, Building2 } from 'lucide-react';

interface PaymentFormProps {
  onSubmit: (paymentMethod: string, details: any) => void;
}

export function PaymentForm({ onSubmit }: PaymentFormProps) {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: '',
    focus: '',
  });
  const [upiId, setUpiId] = useState('');
  const [netBankingDetails, setNetBankingDetails] = useState({
    bank: '',
    username: '',
    password: '',
  });
  const [walletDetails, setWalletDetails] = useState({
    provider: '',
    mobileNumber: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const details = {
      card: cardData,
      upi: { upiId },
      netBanking: netBankingDetails,
      wallet: walletDetails,
    }[paymentMethod];
    onSubmit(paymentMethod, details);
  };

  const PaymentOption = ({ value, label, icon: Icon }: { value: string; label: string; icon: any }) => (
    <button
      type="button"
      onClick={() => setPaymentMethod(value)}
      className={`flex items-center space-x-2 p-4 rounded-lg w-full ${
        paymentMethod === value
          ? 'bg-blue-600 text-white'
          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </button>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-2 gap-4 mb-6">
        <PaymentOption value="card" label="Card" icon={CreditCard} />
        <PaymentOption value="upi" label="UPI" icon={QrCode} />
        <PaymentOption value="netBanking" label="Net Banking" icon={Building2} />
        <PaymentOption value="wallet" label="Wallet" icon={Wallet} />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {paymentMethod === 'card' && (
          <div className="space-y-6">
            <Cards
              number={cardData.number}
              name={cardData.name}
              expiry={cardData.expiry}
              cvc={cardData.cvc}
              focused={cardData.focus as any}
            />
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Card Number</label>
                <input
                  type="text"
                  name="number"
                  value={cardData.number}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="1234 5678 9012 3456"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Cardholder Name</label>
                <input
                  type="text"
                  name="name"
                  value={cardData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="John Doe"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                  <input
                    type="text"
                    name="expiry"
                    value={cardData.expiry}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="MM/YY"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">CVC</label>
                  <input
                    type="text"
                    name="cvc"
                    value={cardData.cvc}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="123"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {paymentMethod === 'upi' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">UPI ID</label>
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="username@upi"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/1200px-UPI-Logo-vector.svg.png" 
                   alt="UPI" className="h-12 object-contain" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Paytm_Logo_%28standalone%29.svg/2560px-Paytm_Logo_%28standalone%29.svg.png" 
                   alt="Paytm" className="h-12 object-contain" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/2560px-Google_Pay_Logo.svg.png" 
                   alt="Google Pay" className="h-12 object-contain" />
            </div>
          </div>
        )}

        {paymentMethod === 'netBanking' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Select Bank</label>
              <select
                value={netBankingDetails.bank}
                onChange={(e) => setNetBankingDetails({ ...netBankingDetails, bank: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Select a bank</option>
                <option value="sbi">State Bank of India</option>
                <option value="hdfc">HDFC Bank</option>
                <option value="icici">ICICI Bank</option>
                <option value="axis">Axis Bank</option>
              </select>
            </div>
            {netBankingDetails.bank && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Username</label>
                  <input
                    type="text"
                    value={netBankingDetails.username}
                    onChange={(e) => setNetBankingDetails({ ...netBankingDetails, username: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    type="password"
                    value={netBankingDetails.password}
                    onChange={(e) => setNetBankingDetails({ ...netBankingDetails, password: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </>
            )}
          </div>
        )}

        {paymentMethod === 'wallet' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Select Wallet</label>
              <select
                value={walletDetails.provider}
                onChange={(e) => setWalletDetails({ ...walletDetails, provider: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Select a wallet</option>
                <option value="paytm">Paytm</option>
                <option value="phonepe">PhonePe</option>
                <option value="amazonpay">Amazon Pay</option>
                <option value="mobikwik">MobiKwik</option>
              </select>
            </div>
            {walletDetails.provider && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                <input
                  type="tel"
                  value={walletDetails.mobileNumber}
                  onChange={(e) => setWalletDetails({ ...walletDetails, mobileNumber: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="10-digit mobile number"
                />
              </div>
            )}
          </div>
        )}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Pay Now
        </motion.button>
      </form>
    </motion.div>
  );
}