/**
 * OAuth Callback Handler
 * Handles authentication callback from OAuth providers and redirects to app
 */

import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../services/api/supabase.service';
import logger from '../services/logging/logger';

const AuthCallback = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [isProcessing, setIsProcessing] = useState(true);
  const hasNavigated = useRef(false);

  // Second useEffect: Navigate to /app/home once user is authenticated
  useEffect(() => {
    // Don't navigate if already navigated or still processing initial auth
    if (hasNavigated.current || loading) {
      return;
    }

    // Once we have a user, navigate to /app/home
    if (user) {
      logger.info('AuthCallback', 'userEffect', {
        action: 'user_authenticated_navigating',
        userId: user.id
      });
      hasNavigated.current = true;
      setIsProcessing(false);
      navigate('/app/home', { replace: true });
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        logger.info('AuthCallback', 'handleCallback', {
          action: 'start',
          hasUser: !!user,
          loading
        });

        // Get the session from the URL hash (OAuth callback)
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
          logger.error('AuthCallback', 'handleCallback', {
            error: error.message
          });
          setIsProcessing(false);
          hasNavigated.current = true;
          navigate('/', { replace: true });
          return;
        }

        if (session && session.user) {
          logger.info('AuthCallback', 'handleCallback', {
            action: 'session_found',
            userId: session.user.id,
            note: 'Waiting for auth context to update with user'
          });
          // Don't navigate here - let the second useEffect handle it once user is set
        } else {
          // No session found
          logger.warn('AuthCallback', 'handleCallback', {
            action: 'no_session_found'
          });

          // Wait a bit in case auth is still loading
          await new Promise(resolve => setTimeout(resolve, 1000));

          // Check one more time if user appeared
          if (!user && !loading) {
            logger.warn('AuthCallback', 'handleCallback', {
              action: 'no_user_after_wait_redirect_to_landing'
            });
            setIsProcessing(false);
            hasNavigated.current = true;
            navigate('/', { replace: true });
          }
        }
      } catch (error) {
        logger.error('AuthCallback', 'handleCallback', {
          error: error.message
        });
        setIsProcessing(false);
        hasNavigated.current = true;
        navigate('/', { replace: true });
      }
    };

    // Only run once on mount
    if (!hasNavigated.current) {
      handleCallback();
    }
  }, [user, loading, navigate]);

  // Show loading state while processing
  return (
    <div style={styles.container}>
      <div style={styles.loader}>
        <div style={styles.spinner}></div>
        <p style={styles.text}>Completing sign in...</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    background: '#f9fafb',
  },
  loader: {
    textAlign: 'center',
  },
  spinner: {
    width: '48px',
    height: '48px',
    margin: '0 auto 16px',
    border: '4px solid #e5e7eb',
    borderTop: '4px solid #1e3a8a',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  text: {
    fontSize: '16px',
    color: '#6b7280',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
};

// Add CSS animation for spinner
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleSheet);

export default AuthCallback;
