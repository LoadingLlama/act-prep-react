/**
 * Authentication Page
 * Container for login and signup forms with switching capability
 */

import React, { useState } from 'react';
import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';

const AuthPage = () => {
  const [showLogin, setShowLogin] = useState(true);

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
