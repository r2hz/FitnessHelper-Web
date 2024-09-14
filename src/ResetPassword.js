import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { account } from './appwriteClient';  // Make sure this is properly set up
import './ResetPassword.css';  // Import the CSS file for styling

const ResetPassword = () => {
  const [searchParams] = useSearchParams();  // Get URL parameters
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    const userId = searchParams.get('userId');  // Extract userId from URL
    const secret = searchParams.get('secret');  // Extract secret from URL

    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      await account.updateRecovery(userId, secret, newPassword, confirmPassword);
      setMessage('Password updated successfully!');
    } catch (error) {
      setMessage('Error resetting password: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-password-box">
    <div className="reset-password-container">
      <h2 className="reset-password-title">Reset Password</h2>
      {message && <p className="message">{message}</p>}
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="input-field"
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="input-field"
      />
      <button onClick={handleResetPassword} disabled={loading} className="submit-button">
        {loading ? 'Resetting...' : 'Reset Password'}
      </button>
    </div>
    </div>
  );
};

export default ResetPassword;
