// Shared style utilities to ensure consistency across components

// Common gradients
export const gradients = {
  neutral: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
  neutralHover: 'linear-gradient(135deg, #e9ecef 0%, #dee2e6 100%)',
  card: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
  cardHover: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
  success: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
  successFull: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
  warning: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
  warningFull: 'linear-gradient(135deg, #fefce8 0%, #fef3c7 100%)',
  warningLight: 'linear-gradient(135deg, #fffaf0 0%, #fef5e7 100%)',
  successLight: 'linear-gradient(135deg, #f0fff4 0%, #c6f6d5 100%)',
  light: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
  lightAlt: 'linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%)'
};

// Common spacing values
export const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '0.75rem',
  lg: '1rem',
  xl: '1.5rem',
  xxl: '2rem'
};

// Common border radius values
export const borderRadius = {
  sm: '3px',
  md: '6px',
  lg: '8px',
  xl: '12px',
  pill: '20px',
  circle: '50%'
};

// Common button styles
export const buttonStyles = {
  base: {
    border: '1px solid #dee2e6',
    borderRadius: borderRadius.md,
    cursor: 'pointer',
    fontSize: '0.95rem',
    fontWeight: 500,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    textDecoration: 'none',
    display: 'inline-block',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
  },
  sizes: {
    sm: {
      padding: `${spacing.sm} ${spacing.md}`,
      fontSize: '0.8rem'
    },
    md: {
      padding: `${spacing.md} ${spacing.xl}`,
      fontSize: '0.95rem'
    },
    lg: {
      padding: `${spacing.lg} ${spacing.xxl}`,
      fontSize: '1rem'
    }
  }
};

// Status indicator styles
export const statusStyles = {
  completed: {
    background: gradients.successFull,
    color: '#065f46',
    border: '1px solid #10b981'
  },
  inProgress: {
    background: gradients.warningFull,
    color: '#92400e',
    border: '1px solid #f59e0b'
  },
  notStarted: {
    background: gradients.light,
    color: '#64748b',
    border: '1px solid #cbd5e1'
  }
};

// Common icon styles
export const iconStyles = {
  base: {
    width: '24px',
    height: '24px',
    borderRadius: borderRadius.circle,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: 'bold',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
  }
};

// Hover effects
export const hoverEffects = {
  lift: {
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
  },
  liftMedium: {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 30px rgba(0,0,0,0.15)'
  }
};