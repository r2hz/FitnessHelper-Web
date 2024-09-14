import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ResetPassword from './ResetPassword';
import VerifyAccount from './VerifyAccount';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-account" element={<VerifyAccount />} />
      </Routes>
    </Router>
  );
}

export default App;
