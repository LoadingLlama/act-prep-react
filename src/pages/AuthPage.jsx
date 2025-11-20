/**
 * Authentication Page
 * Container for login and signup forms with switching capability
 */

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';

const AuthPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const mode = searchParams.get('mode');

  // Default to signup, unless mode=signin is in URL
  const [showLogin, setShowLogin] = useState(mode === 'signin');

  // Update view when URL changes
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const mode = searchParams.get('mode');
    setShowLogin(mode === 'signin');
  }, [location.search]);

  const switchToSignup = () => setShowLogin(false);
  const switchToLogin = () => setShowLogin(true);

  return (
    <>
      {showLogin ? (
        <Login onSwitchToSignup={switchToSignup} />
      ) : (
        <Signup onSwitchToLogin={switchToLogin} />
      )}
    </>
  );
};

export default AuthPage;
