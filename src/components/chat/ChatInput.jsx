/**
 * ChatInput Component
 * Input field with send button for AI chat
 * Extracted from AIChat component to reduce file size
 */

import React from 'react';

/**
 * ChatInput - Input field with typing indicator and send button
 * @param {Object} props - Component props
 * @param {React.RefObject} props.inputRef - Reference to input element
 * @param {Object} props.classes - JSS style classes
 * @param {string} props.inputValue - Current input value
 * @param {Function} props.onChange - Input change handler
 * @param {Function} props.onFocus - Input focus handler
 * @param {Function} props.onKeyDown - Key press handler
 * @param {boolean} props.isTyping - Whether AI is typing
 * @param {boolean} props.showTypingIndicator - Whether to show typing animation
 * @param {boolean} props.showSendButton - Whether to show send button
 * @param {Function} props.onSend - Send message handler
 * @param {Function} props.onContainerClick - Container click handler
 * @returns {JSX.Element} Chat input component
 */
const ChatInput = ({
  inputRef,
  classes,
  inputValue,
  onChange,
  onFocus,
  onKeyDown,
  isTyping,
  showTypingIndicator,
  showSendButton,
  onSend,
  onContainerClick
}) => {
  return (
    <div
      className={classes.inputContainer}
      onClick={onContainerClick}
    >
      <input
        ref={inputRef}
        className={`${classes.input} ${classes.inputFocusedStyle}`}
        value={inputValue}
        onChange={onChange}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        placeholder={showTypingIndicator ? "" : "Ask me anything about ACT prep..."}
        disabled={isTyping}
      />

      {showTypingIndicator && inputValue === '' && (
        <div
          style={{
            position: 'absolute',
            left: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
            color: 'rgba(74, 144, 226, 0.7)',
            fontSize: '15px',
            zIndex: 1
          }}
        >
          Ask me anything about ACT prep...
          <span className={classes.typingIndicator}></span>
        </div>
      )}

      {/* Send button */}
      <button
        className={`${classes.sendButton} ${showSendButton ? 'visible' : ''}`}
        onClick={onSend}
        disabled={isTyping}
      >
        ↵
      </button>
    </div>
  );
};

export default ChatInput;
