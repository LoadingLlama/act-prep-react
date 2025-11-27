/**
 * Upgrade Page
 * Redirects to home - upgrade modal is now shown via AppLayout when trial expires
 */

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UpgradePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to home - the blocking modal will show there if trial is expired
    navigate('/app/home', { replace: true });
  }, [navigate]);

  return null;
};

export default UpgradePage;
