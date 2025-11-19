/**
 * Section Icons
 * Professional SVG icons for ACT test sections
 */

import React from 'react';

export const EnglishIcon = ({ size = 24, color = "#08245b" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h16M4 18h12" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M14 18l3 3 5-5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const MathIcon = ({ size = 24, color = "#b91c1c" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M3 3L7 7M7 3L3 7" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M3 17h4M5 15v4" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <circle cx="17" cy="5" r="2" stroke={color} strokeWidth="2"/>
    <path d="M15 19h4M17 17v4" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <rect x="10" y="9" width="10" height="6" rx="1" stroke={color} strokeWidth="2"/>
  </svg>
);

export const ReadingIcon = ({ size = 24, color = "#713f12" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M4 19.5A2.5 2.5 0 016.5 17H20" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 7h7M9 11h5" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const ScienceIcon = ({ size = 24, color = "#10b981" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M9 3v8.4a4 4 0 01-1.172 2.828l-2.656 2.656A2 2 0 006 19.485V21h12v-1.515a2 2 0 00.828-2.601l-2.656-2.656A4 4 0 0115 11.4V3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 3h6" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const ClockIcon = ({ size = 24, color = "#6b7280" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2"/>
    <path d="M12 7v5l3 3" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const ChartIcon = ({ size = 24, color = "#3b82f6" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M3 3v18h18" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M7 16l4-4 3 3 5-7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="7" cy="16" r="1.5" fill={color}/>
    <circle cx="11" cy="12" r="1.5" fill={color}/>
    <circle cx="14" cy="15" r="1.5" fill={color}/>
    <circle cx="19" cy="8" r="1.5" fill={color}/>
  </svg>
);

export const CheckCircleIcon = ({ size = 24, color = "#10b981" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2"/>
    <path d="M8 12l2.5 2.5 5.5-5.5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const XCircleIcon = ({ size = 24, color = "#ef4444" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2"/>
    <path d="M15 9l-6 6M9 9l6 6" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const MinusCircleIcon = ({ size = 24, color = "#f59e0b" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2"/>
    <path d="M8 12h8" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);
