import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { account } from './appwriteClient';
import './VerifyAccount.css';

const VerifyAccount = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Extract userId and secret from the URL
  const userId = searchParams.get('userId');
  const secret = searchParams.get('secret');

  const handleVerifyAccount = useCallback(async () => {
    setLoading(true);
    try {
      // Verify the user using userId and secret
      await account.updateVerification(userId, secret);
      setMessage('Your account has been successfully verified!');
    } catch (error) {
      setMessage('Error verifying account: ' + error.message);
    }
    setLoading(false);
  }, [userId, secret]);

  useEffect(() => {
    if (userId && secret) {
      handleVerifyAccount();
    } else {
      setMessage('Invalid verification link.');
    }
  }, [userId, secret, handleVerifyAccount]);

  return (
    <div className="verify-account-container">
      <h2>Verify Account</h2>
      {loading ? <p>Verifying...</p> : <p>{message}</p>}
    </div>
  );
};

export default VerifyAccount;
