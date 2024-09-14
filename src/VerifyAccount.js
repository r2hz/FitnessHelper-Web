import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';  // To get URL query parameters
import { account } from './appwriteClient';  // Import Appwrite client setup
import './VerifyAccount.css';

const VerifyAccount = () => {
  const [searchParams] = useSearchParams();  // To extract the userId and secret from URL
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Extract userId and secret from the URL
  const userId = searchParams.get('userId');
  const secret = searchParams.get('secret');

  // Function to verify account
  const handleVerifyAccount = async () => {
    setLoading(true);
    try {
      await account.updateVerification(userId, secret);
      setMessage('Your account has been successfully verified!');
    } catch (error) {
      setMessage('Error verifying account: ' + error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    // Call verification automatically when the component mounts
    if (userId && secret) {
      handleVerifyAccount();
    } else {
      setMessage('Invalid verification link.');
    }
  }, [userId, secret]);  // Only run when userId and secret change

  return (
    <div className='verfiy-account-box'>
    <div className="vverfiy-account-container">
      <h2 className="verfiy-account-title">Verify Account</h2>
      {loading ? <p>Verifying...</p> : <p>{message}</p>}
    </div>
    </div>
  );
};

export default VerifyAccount;
