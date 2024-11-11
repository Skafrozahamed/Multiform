import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { MultiStepForm } from './pages/MultiStepForm';
import { Payment } from './pages/Payment';
import { Chatbot } from './components/Chatbot';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/register" replace />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/form" element={<MultiStepForm />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
      <Chatbot />
    </BrowserRouter>
  );
}

export default App;