/**
 * Social Browser Warning Component
 * Detects Instagram/TikTok in-app browsers and shows instructions
 * to open in real browser for OAuth to work
 */

import React, { useState, useEffect } from 'react';

const SocialBrowserWarning = () => {
  const [isInAppBrowser, setIsInAppBrowser] = useState(false);
  const [platform, setPlatform] = useState('');
  const [copied, setCopied] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Check if in Instagram in-app browser
    if (userAgent.includes('Instagram')) {
      setIsInAppBrowser(true);
      setPlatform('Instagram');
      return;
    }

    // Check if in TikTok in-app browser
    if (userAgent.includes('TikTok') || userAgent.includes('musical_ly') || userAgent.includes('Bytedance')) {
      setIsInAppBrowser(true);
      setPlatform('TikTok');
      return;
    }

    // Check if in Facebook in-app browser (also has OAuth issues)
    if (userAgent.includes('FBAN') || userAgent.includes('FBAV')) {
      setIsInAppBrowser(true);
      setPlatform('Facebook');
      return;
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCopyLink = async () => {
    const url = window.location.href;

    try {
      // Try modern clipboard API first
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      } else {
        // Fallback for older iOS versions
        const textArea = document.createElement('textarea');
        textArea.value = url;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
          document.execCommand('copy');
          textArea.remove();
          setCopied(true);
          setTimeout(() => setCopied(false), 3000);
        } catch (err) {
          console.error('Failed to copy:', err);
          textArea.remove();
        }
      }
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (!isInAppBrowser) {
    return null;
  }

  return (
    <div style={{
      ...styles.overlay,
      padding: isMobile ? '12px' : '20px',
    }}>
      <div style={styles.container}>
        <div style={{
          ...styles.card,
          padding: isMobile ? '20px 14px' : '40px 28px',
        }}>
          {/* Logo */}
          <div style={{
            ...styles.logo,
            marginBottom: isMobile ? '12px' : '24px',
          }}>
            <span style={{
              ...styles.logoText,
              fontSize: isMobile ? '20px' : '28px',
            }}>Nomi Academy</span>
          </div>

          {/* Icon */}
          <div style={{
            ...styles.iconContainer,
            marginBottom: isMobile ? '12px' : '24px',
          }}>
            <svg width={isMobile ? "40" : "64"} height={isMobile ? "40" : "64"} viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>

          {/* Message */}
          <h2 style={{
            ...styles.heading,
            fontSize: isMobile ? '15px' : '22px',
            marginBottom: isMobile ? '10px' : '16px',
          }}>
            Thanks for checking out Nomi Academy!
          </h2>

          <p style={{
            ...styles.message,
            fontSize: isMobile ? '13px' : '16px',
            marginBottom: isMobile ? '16px' : '32px',
          }}>
            <strong>{platform}</strong> does not support Google login, so please follow these instructions:
          </p>

          {/* Instructions */}
          <div style={{
            ...styles.instructions,
            padding: isMobile ? '14px 12px' : '24px 20px',
            gap: isMobile ? '12px' : '20px',
            marginBottom: isMobile ? '16px' : '32px',
          }}>
            <div style={styles.step}>
              <div style={{
                ...styles.stepNumber,
                width: isMobile ? '24px' : '32px',
                height: isMobile ? '24px' : '32px',
                fontSize: isMobile ? '13px' : '16px',
              }}>1</div>
              <div style={{
                ...styles.stepText,
                fontSize: isMobile ? '13px' : '15px',
                paddingTop: isMobile ? '2px' : '4px',
              }}>
                Tap the <strong>three dots</strong> in the top right
              </div>
            </div>

            <div style={styles.step}>
              <div style={{
                ...styles.stepNumber,
                width: isMobile ? '24px' : '32px',
                height: isMobile ? '24px' : '32px',
                fontSize: isMobile ? '13px' : '16px',
              }}>2</div>
              <div style={{
                ...styles.stepText,
                fontSize: isMobile ? '13px' : '15px',
                paddingTop: isMobile ? '2px' : '4px',
              }}>
                Select <strong>"Open in Browser"</strong>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{
            ...styles.divider,
            marginBottom: isMobile ? '12px' : '24px',
          }}>
            <span style={styles.dividerLine} />
            <span style={{
              ...styles.dividerText,
              fontSize: isMobile ? '12px' : '14px',
            }}>or</span>
            <span style={styles.dividerLine} />
          </div>

          {/* Alternative */}
          <p style={{
            ...styles.alternativeText,
            fontSize: isMobile ? '12px' : '14px',
            marginBottom: isMobile ? '10px' : '16px',
          }}>
            Copy this link and paste it into your browser:
          </p>

          {/* Copy Link Button */}
          <button
            onClick={handleCopyLink}
            style={{
              ...styles.copyButton,
              padding: isMobile ? '12px 16px' : '16px 24px',
              fontSize: isMobile ? '14px' : '16px',
              marginBottom: isMobile ? '10px' : '16px',
              ...(copied ? styles.copyButtonSuccess : {}),
            }}
          >
            {copied ? (
              <>
                <svg width={isMobile ? "16" : "20"} height={isMobile ? "16" : "20"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Link Copied!
              </>
            ) : (
              <>
                <svg width={isMobile ? "16" : "20"} height={isMobile ? "16" : "20"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                Copy Link
              </>
            )}
          </button>

          {/* URL Display */}
          <div style={{
            ...styles.urlBox,
            padding: isMobile ? '10px 12px' : '14px 16px',
          }}>
            <p style={{
              ...styles.url,
              fontSize: isMobile ? '11px' : '13px',
            }}>{window.location.href}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100vw',
    height: '100vh',
    background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%)',
    zIndex: 10000,
    overflow: 'auto',
    padding: '20px',
    boxSizing: 'border-box',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100%',
  },
  card: {
    width: '100%',
    maxWidth: '440px',
    background: '#ffffff',
    borderRadius: '20px',
    padding: '40px 28px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
    border: '1px solid #e2e8f0',
    boxSizing: 'border-box',
  },
  logo: {
    textAlign: 'center',
    marginBottom: '24px',
  },
  logoText: {
    fontSize: '28px',
    fontWeight: '800',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    color: '#1e3a8a',
    letterSpacing: '-0.02em',
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '24px',
  },
  heading: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: '16px',
    lineHeight: '1.3',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  message: {
    fontSize: '16px',
    fontWeight: '400',
    color: '#4b5563',
    textAlign: 'center',
    marginBottom: '32px',
    lineHeight: '1.6',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  instructions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    marginBottom: '32px',
    background: '#f9fafb',
    padding: '24px 20px',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
  },
  step: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px',
  },
  stepNumber: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    fontWeight: '700',
    flexShrink: 0,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  stepText: {
    fontSize: '15px',
    fontWeight: '400',
    color: '#1f2937',
    lineHeight: '1.6',
    paddingTop: '4px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '24px',
  },
  dividerLine: {
    flex: 1,
    height: '1px',
    background: '#e5e7eb',
  },
  dividerText: {
    fontSize: '14px',
    color: '#9ca3af',
    fontWeight: '500',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  alternativeText: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: '16px',
    lineHeight: '1.5',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  copyButton: {
    width: '100%',
    padding: '16px 24px',
    fontSize: '16px',
    fontWeight: '600',
    color: '#ffffff',
    background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    boxShadow: '0 4px 12px rgba(30, 58, 138, 0.3)',
    marginBottom: '16px',
  },
  copyButtonSuccess: {
    background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
    boxShadow: '0 4px 12px rgba(5, 150, 105, 0.3)',
  },
  urlBox: {
    padding: '14px 16px',
    background: '#f9fafb',
    border: '1px solid #e5e7eb',
    borderRadius: '10px',
    wordBreak: 'break-all',
    overflowWrap: 'break-word',
    maxHeight: '80px',
    overflow: 'auto',
  },
  url: {
    fontSize: '13px',
    color: '#6b7280',
    margin: 0,
    fontFamily: 'Monaco, Menlo, "Courier New", monospace',
    lineHeight: '1.4',
    wordBreak: 'break-all',
    overflowWrap: 'break-word',
  },
};

export default SocialBrowserWarning;
