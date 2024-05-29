// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import JobScraper from './components/JobScraper';
import Login from './components/Login'; 
import Signup from './components/Signup'; 
import './App.scss';
import Dashboard from './components/DashBoard';
import ResetPassword from './components/ResetPassword';
import ForgotPassword from './components/ForgotPassword';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<JobScraper />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:uidb64/:token" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard  />} />
      </Routes>
    </Router>
  );
};

export default App;
