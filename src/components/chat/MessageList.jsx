/**
 * MessageList Component
 * Displays chat messages with typing indicator
 * Extracted from AIChat component to reduce file size
 */

import React from 'react';

/**
 * MessageList - Displays list of chat messages
 * @param {Object} props - Component props
 * @param {Object} props.classes - JSS style classes
 * @param {Array} props.messages - Array of message objects
 * @param {boolean} props.isTyping - Whether AI is typing
 * @param {React.RefObject} props.messagesEndRef - Reference to scroll anchor
 * @returns {JSX.Element} Message list component
 */
const MessageList = ({ classes, messages, isTyping, messagesEndRef }) => {
  return (
    <div className={classes.messagesContainer}>
      {messages.map((message, index) => (
        <div key={index} className={`${classes.message} ${message.type}`}>
          <div className={`${classes.messageBubble} ${message.type}`}>
            {/* Sanitize message content to prevent XSS */}
            {typeof message.content === 'string' ? message.content : ''}
          </div>
        </div>
      ))}

      {isTyping && (
        <div className={classes.typing}>
          <div className={classes.typingBubble}>
            Thinking...
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
