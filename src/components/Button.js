import React from 'react';
import { createUseStyles } from 'react-jss';
import { gradients, buttonStyles, hoverEffects } from '../utils/sharedStyles';

const useStyles = createUseStyles({
  button: {
    ...buttonStyles.base,
    background: gradients.neutral,
    color: '#666',
    '&:hover': {
      background: gradients.neutralHover,
      ...hoverEffects.lift,
      color: '#333'
    }
  },
  small: buttonStyles.sizes.sm,
  medium: buttonStyles.sizes.md,
  large: buttonStyles.sizes.lg,
  primary: {
    background: '#1a1a1a',
    color: 'white',
    '&:hover': {
      background: '#333'
    }
  },
  danger: {
    background: '#dc3545',
    color: 'white',
    border: 'none',
    '&:hover': {
      background: '#c82333'
    }
  }
});

const Button = ({
  children,
  onClick,
  size = 'medium',
  variant = 'default',
  disabled = false,
  className = '',
  href,
  ...props
}) => {
  const classes = useStyles();

  const buttonClasses = [
    classes.button,
    classes[size],
    variant !== 'default' && classes[variant],
    className
  ].filter(Boolean).join(' ');

  if (href) {
    return (
      <a
        href={href}
        className={buttonClasses}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;