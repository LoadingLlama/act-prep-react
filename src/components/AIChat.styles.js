import { createUseStyles } from 'react-jss';

export const useAIChatStyles = createUseStyles({
  chatContainer: {
    position: 'fixed',
    top: '12px',
    right: '12px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    zIndex: 1001,
    userSelect: 'none',
    transformOrigin: 'top right', // Ensure expansions happen towards the left and down
    '@media (max-width: 768px)': {
      top: 'auto',
      right: '12px',
      bottom: '12px',
      transformOrigin: 'bottom right'
    }
  },
  chatBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '12px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    position: 'relative'
  },
  // State: Collapsed (initial state) - Right side optimized shape
  collapsed: {
    width: '48px',
    height: '48px',
    cursor: 'pointer',
    backgroundColor: 'rgba(192, 192, 192, 0.7)', // Silver grey
    border: '1px solid rgba(255, 255, 255, 0.5)', // Bright ethereal outline
    borderRadius: '12px 0 0 12px', // Right side friendly: sharp right edge, rounded left
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 12px rgba(192, 192, 192, 0.2), 0 0 15px rgba(255, 255, 255, 0.1)', // Subtle ethereal glow
    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
    '&:hover': {
      backgroundColor: 'rgba(192, 192, 192, 0.9)',
      transform: 'scale(1.05)',
      boxShadow: '0 6px 20px rgba(192, 192, 192, 0.3), 0 0 25px rgba(255, 255, 255, 0.2)', // Enhanced ethereal glow
      border: '1px solid rgba(255, 255, 255, 0.8)'
    }
  },
  // State: Input focused (expanded input) - right side optimized glassy translucent
  inputFocused: {
    width: '320px',
    height: '48px',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(25px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '16px 0 0 16px', // Right side friendly: sharp right edge
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    cursor: 'text',
    '@media (max-width: 768px)': {
      width: '280px',
      borderRadius: '16px 16px 0 0' // Rounded top on mobile
    }
  },
  // State: Chat open (with messages) - right side optimized glassy translucent
  chatOpen: {
    width: '360px',
    minHeight: '160px',
    height: 'auto',
    maxHeight: '480px',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    backdropFilter: 'blur(30px)',
    border: '1px solid rgba(255, 255, 255, 0.25)',
    borderRadius: '20px 0 0 20px', // Right side friendly: sharp right edge
    boxShadow: '0 12px 48px rgba(0, 0, 0, 0.15)',
    cursor: 'default',
    transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
    '@media (max-width: 768px)': {
      width: '100vw',
      maxWidth: '360px',
      borderRadius: '20px 20px 0 0', // Rounded top on mobile
      maxHeight: '60vh' // Limit height on mobile
    }
  },
  // State: Dragged away from center
  dragged: {
    transform: 'none',
    resize: 'both',
    minWidth: '300px',
    minHeight: '120px',
    maxWidth: '600px',
    maxHeight: '80vh'
  },
  // State: Currently being dragged
  dragging: {
    transition: 'none !important',
    cursor: 'grabbing !important',
    '& *': {
      cursor: 'grabbing !important'
    }
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    padding: '0',
    position: 'relative',
    minHeight: '32px',
    gap: '8px'
  },
  dragHandle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '100%',
    cursor: 'grab',
    color: '#999',
    fontSize: '14px',
    opacity: 1,
    transition: 'all 0.2s ease',
    userSelect: 'none',
    padding: '4px',
    borderRadius: '6px',
    '&:hover': {
      color: '#666',
      backgroundColor: 'rgba(0, 0, 0, 0.05)'
    },
    '&:active': {
      cursor: 'grabbing',
      backgroundColor: 'rgba(0, 0, 0, 0.1)'
    }
  },
  inputContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '0',
    position: 'relative',
    width: '100%'
  },
  input: {
    flex: 1,
    border: 'none',
    outline: 'none',
    background: 'transparent',
    fontSize: '14px',
    color: '#2d3748',
    fontWeight: '400',
    transition: 'all 0.2s ease',
    '&::placeholder': {
      color: 'rgba(45, 55, 72, 0.6)',
      transition: 'color 0.2s ease'
    }
  },
  inputCollapsed: {
    display: 'none', // Hide input completely when collapsed
    pointerEvents: 'none'
  },
  inputFocusedStyle: {
    textAlign: 'center',
    fontSize: '15px',
    fontWeight: '400',
    color: '#2d3748',
    pointerEvents: 'auto',
    backgroundColor: 'rgba(74, 144, 226, 0.015)',
    padding: '12px 20px',
    borderRadius: '16px',
    border: '1px solid rgba(74, 144, 226, 0.08)',
    outline: 'none',
    width: '100%',
    margin: '4px',
    transition: 'all 0.2s ease',
    position: 'relative',
    zIndex: 2,
    '&::placeholder': {
      color: 'rgba(74, 144, 226, 0.7)',
      textAlign: 'center',
      fontWeight: '400',
      fontSize: '15px'
    },
    '&:hover': {
      backgroundColor: 'rgba(74, 144, 226, 0.025)',
      border: '1px solid rgba(74, 144, 226, 0.12)'
    },
    '&:focus': {
      textAlign: 'left',
      backgroundColor: 'rgba(74, 144, 226, 0.02)',
      border: '1px solid rgba(74, 144, 226, 0.15)',
      '&::placeholder': {
        textAlign: 'left',
        color: 'rgba(74, 144, 226, 0.6)'
      }
    }
  },
  sendButton: {
    background: 'none',
    border: 'none',
    color: '#000',
    fontSize: '16px',
    cursor: 'pointer',
    padding: '4px 8px',
    borderRadius: '12px',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
    transform: 'scale(0.8)',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.05)'
    },
    '&.visible': {
      opacity: 1,
      transform: 'scale(1)'
    }
  },
  closeButton: {
    background: 'none',
    border: 'none',
    color: '#888',
    fontSize: '18px',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '50%',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
    transform: 'scale(0.8)',
    width: '32px',
    height: '32px',
    lineHeight: '1',
    fontWeight: '400',
    margin: '0',
    flexShrink: 0,
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      color: '#555'
    },
    '&.visible': {
      opacity: 0.8,
      transform: 'scale(1)'
    }
  },
  messagesContainer: {
    padding: '16px',
    paddingTop: '8px',
    maxHeight: '400px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    '&::-webkit-scrollbar': {
      width: '4px'
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent'
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'rgba(0, 0, 0, 0.2)',
      borderRadius: '2px'
    }
  },
  message: {
    display: 'flex',
    gap: '8px',
    '&.user': {
      justifyContent: 'flex-end'
    },
    '&.ai': {
      justifyContent: 'flex-start'
    }
  },
  messageBubble: {
    maxWidth: '85%',
    padding: '12px 16px',
    borderRadius: '18px',
    fontSize: '14px',
    lineHeight: '1.5',
    wordBreak: 'break-word',
    textAlign: 'left',
    margin: '0',
    '&.user': {
      backgroundColor: 'rgba(0, 0, 0, 0.15)',
      color: '#222',
      borderBottomRightRadius: '6px',
      fontWeight: '400',
      border: '1px solid rgba(0, 0, 0, 0.2)'
    },
    '&.ai': {
      backgroundColor: 'rgba(247, 250, 252, 0.15)',
      color: '#2d3748',
      border: '1px solid rgba(0, 0, 0, 0.1)',
      borderBottomLeftRadius: '6px',
      fontWeight: '400'
    }
  },
  typing: {
    display: 'flex',
    justifyContent: 'flex-start'
  },
  typingBubble: {
    backgroundColor: 'rgba(247, 250, 252, 0.9)',
    color: '#9ca3af',
    padding: '10px 14px',
    borderRadius: '16px 16px 16px 4px',
    fontSize: '14px',
    fontStyle: 'italic',
    border: '1px solid rgba(0, 0, 0, 0.05)'
  },
  resizeHandle: {
    position: 'absolute',
    bottom: '0',
    right: '0',
    width: '20px',
    height: '20px',
    cursor: 'nw-resize',
    background: 'linear-gradient(-45deg, transparent 0%, transparent 30%, rgba(0,0,0,0.1) 50%, transparent 70%, transparent 100%)',
    borderRadius: '0 0 20px 0',
    opacity: 0,
    transition: 'opacity 0.2s ease',
    '&.visible': {
      opacity: 1
    }
  },
  typingIndicator: {
    display: 'inline-block',
    width: '1px',
    height: '1.2em',
    backgroundColor: 'rgba(74, 144, 226, 0.7)',
    marginLeft: '2px',
    animation: '$blink 1s infinite'
  },
  '@keyframes blink': {
    '0%, 50%': {
      opacity: 1
    },
    '51%, 100%': {
      opacity: 0
    }
  },
  snapIndicator: {
    position: 'fixed',
    border: '2px dashed rgba(74, 144, 226, 0.4)',
    borderRadius: '20px',
    backgroundColor: 'rgba(74, 144, 226, 0.05)',
    pointerEvents: 'none',
    zIndex: 999,
    transition: 'all 0.2s ease',
    opacity: 0,
    '&.visible': {
      opacity: 1
    }
  }
});
