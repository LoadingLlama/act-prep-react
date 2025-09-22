import React, { useState, useRef, useEffect } from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  chatContainer: {
    position: 'fixed',
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: 'auto',
    zIndex: 1000,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    pointerEvents: 'none',
    '& > *': {
      pointerEvents: 'auto'
    }
  },
  inputContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(16px)',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '12px',
    padding: '0',
    margin: '0 auto',
    width: '120px',
    height: '24px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    transform: 'scale(1)',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      transform: 'scale(1.05)',
      boxShadow: '0 6px 24px rgba(0, 0, 0, 0.2)',
      width: '140px',
      height: '28px',
      border: '1px solid rgba(0, 0, 0, 0.15)'
    },
    '&.focused': {
      backgroundColor: 'rgba(255, 255, 255, 0.98)',
      transform: 'scale(1)',
      width: '480px',
      height: '44px',
      borderRadius: '22px',
      padding: '12px 20px',
      border: '1px solid rgba(0, 0, 0, 0.2)',
      cursor: 'text',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)'
    }
  },
  input: {
    flex: 1,
    border: 'none',
    outline: 'none',
    fontSize: '16px',
    color: '#2d3748',
    backgroundColor: 'transparent',
    fontWeight: '400',
    transition: 'all 0.3s ease',
    textAlign: 'left',
    minWidth: 0,
    opacity: 0,
    width: 0,
    padding: 0,
    '&::placeholder': {
      color: 'rgba(107, 114, 128, 0.8)',
      fontWeight: '400',
      transition: 'all 0.3s ease'
    }
  },
  inputExpanded: {
    fontSize: '16px',
    textAlign: 'left',
    opacity: 1,
    width: 'auto',
    flex: 1,
    padding: 0,
    '&::placeholder': {
      textAlign: 'left'
    }
  },
  chatDropdown: {
    position: 'fixed',
    top: '60px',
    right: '20px',
    transform: 'translateY(-10px) scale(0.95)',
    width: '400px',
    maxWidth: '90vw',
    backgroundColor: 'rgba(255, 255, 255, 0.96)',
    backdropFilter: 'blur(24px)',
    border: '1px solid rgba(0, 0, 0, 0.08)',
    borderRadius: '20px',
    boxShadow: '0 24px 50px rgba(0, 0, 0, 0.15)',
    maxHeight: '500px',
    overflowY: 'auto',
    opacity: 0,
    visibility: 'hidden',
    transition: 'all 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)',
    zIndex: 1001,
    '&.open': {
      transform: 'translateY(0) scale(1)',
      opacity: 1,
      visibility: 'visible'
    }
  },
  messagesContainer: {
    padding: '20px 24px',
    maxHeight: '400px',
    overflowY: 'auto'
  },
  message: {
    marginBottom: '16px',
    '&:last-child': {
      marginBottom: 0
    }
  },
  userMessage: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  userBubble: {
    backgroundColor: '#000000',
    color: 'white',
    padding: '12px 16px',
    borderRadius: '18px 18px 4px 18px',
    fontSize: '15px',
    maxWidth: '80%',
    wordBreak: 'break-word',
    fontWeight: '400',
    lineHeight: '1.4'
  },
  aiMessage: {
    display: 'flex',
    justifyContent: 'flex-start'
  },
  aiBubble: {
    backgroundColor: 'rgba(247, 250, 252, 0.8)',
    color: '#374151',
    padding: '12px 16px',
    borderRadius: '18px 18px 18px 4px',
    fontSize: '15px',
    maxWidth: '80%',
    wordBreak: 'break-word',
    fontWeight: '400',
    lineHeight: '1.4',
    border: '1px solid rgba(0, 0, 0, 0.05)'
  },
  typing: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginBottom: '16px'
  },
  typingBubble: {
    backgroundColor: 'rgba(247, 250, 252, 0.8)',
    color: '#9ca3af',
    padding: '12px 16px',
    borderRadius: '18px 18px 18px 4px',
    fontSize: '15px',
    fontStyle: 'italic',
    border: '1px solid rgba(0, 0, 0, 0.05)'
  },
  sendButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#000000',
    fontSize: '15px',
    fontWeight: '500',
    cursor: 'pointer',
    padding: '6px 12px',
    borderRadius: '12px',
    marginLeft: '12px',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.05)'
    },
    '&:disabled': {
      color: '#9ca3af',
      cursor: 'not-allowed'
    }
  },
  closeButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#9ca3af',
    fontSize: '18px',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '50%',
    marginLeft: '8px',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      color: '#000000'
    }
  },
  dropdownHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 20px 0 20px',
    marginBottom: '8px'
  },
  dropdownTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#6b7280'
  }
});

const AIChat = ({ currentLesson, lessonContent }) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const dropdownRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Handle click outside to close chat
  useEffect(() => {
    const handleClickOutside = (event) => {
      const isClickInInput = chatContainerRef.current && chatContainerRef.current.contains(event.target);
      const isClickInDropdown = dropdownRef.current && dropdownRef.current.contains(event.target);

      if (!isClickInInput && !isClickInDropdown) {
        setIsOpen(false);
        setIsFocused(false);
        inputRef.current?.blur();
      }
    };

    if (isOpen || isFocused) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, isFocused]);

  const handleInputFocus = () => {
    setIsFocused(true);
    if (messages.length > 0) {
      setIsOpen(true);
    }
  };

  const handleInputClick = (e) => {
    e.stopPropagation(); // Prevent event from bubbling up
    setIsFocused(true);
    if (messages.length > 0) {
      setIsOpen(true);
    }
    inputRef.current?.focus();
  };

  const handleContainerClick = (e) => {
    e.stopPropagation(); // Prevent event from bubbling up
    setIsFocused(true);
    if (messages.length > 0) {
      setIsOpen(true);
    }
    inputRef.current?.focus();
  };

  const handleInputBlur = () => {
    // Click outside handler will manage closing
    // Just update focus state
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isTyping) return;

    const userMessage = {
      type: 'user',
      content: inputValue.trim(),
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    setIsOpen(true);

    // Call actual AI API
    try {
      const aiResponse = await callAIAPI(userMessage.content, currentLesson, lessonContent);
      setMessages(prev => [...prev, {
        type: 'ai',
        content: aiResponse,
        timestamp: Date.now()
      }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        type: 'ai',
        content: "I'm having trouble connecting right now. Please try again.",
        timestamp: Date.now()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const callAIAPI = async (question, lesson, content) => {
    // For now, using simulated responses - you can replace this with actual API calls
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200));

    // Context-aware responses based on current lesson
    const context = lesson ? `Current lesson: ${lesson}. ` : '';
    const prompt = `${context}User question: ${question}`;

    // Simulated intelligent responses (replace with actual API)
    const responses = {
      'backsolving': [
        "Backsolving is perfect when you see complex equations. Start with answer choice B or C (middle values) and plug them back into the original equation. Whichever makes the equation true is your answer.",
        "Use backsolving when traditional algebra would take too long. Just test each answer choice by substituting it into the equation until you find the one that works.",
        "The key to backsolving: don't solve for the variable algebraically. Instead, let the answer choices do the work by testing each one in the original equation."
      ],
      'substitution': [
        "With substitution, pick simple numbers for variables (like 2, 3, or 5) and avoid 0 and 1. Solve the problem with your chosen numbers, then test which answer choice gives the same result.",
        "Substitution turns abstract algebra into concrete arithmetic. Pick easy numbers that follow any rules given in the problem, solve with those numbers, then match your result to the answer choices.",
        "The beauty of substitution is it makes complex variable problems simple. Choose your numbers, work through the problem step by step, then see which answer choice matches your result."
      ]
    };

    if (lesson && responses[lesson]) {
      return responses[lesson][Math.floor(Math.random() * responses[lesson].length)];
    }

    // Generic helpful responses
    const fallbacks = [
      "I'd be happy to help! Can you be more specific about what you're struggling with?",
      "That's a great question. Let me think about the best way to explain this concept.",
      "I can help you understand this better. What specific part would you like me to clarify?"
    ];

    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      e.stopPropagation(); // Prevent the event from bubbling up to lesson handlers
      handleSendMessage();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      setIsOpen(false);
      setIsFocused(false);
      inputRef.current?.blur();
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsFocused(false);
    inputRef.current?.blur();
  };

  return (
    <>
      <div className={classes.chatContainer} ref={chatContainerRef} data-ai-chat>
        <div
          className={`${classes.inputContainer} ${isFocused ? 'focused' : ''}`}
          onClick={handleContainerClick}
          data-ai-chat
        >
          <input
            ref={inputRef}
            className={`${classes.input} ${isFocused ? classes.inputExpanded : ''}`}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onClick={handleInputClick}
            onKeyPress={handleKeyPress}
            placeholder={isFocused ? "Ask me anything about ACT prep..." : ""}
            disabled={isTyping}
          />
          {inputValue.trim() && (
            <button
              className={classes.sendButton}
              onClick={(e) => {
                e.stopPropagation();
                handleSendMessage();
              }}
              disabled={isTyping}
            >
              ↵
            </button>
          )}
          {(isOpen || isFocused) && (
            <button
              className={classes.closeButton}
              onClick={(e) => {
                e.stopPropagation();
                handleClose();
              }}
              title="Close chat (Esc)"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Dropdown positioned independently in right corner */}
      <div ref={dropdownRef} className={`${classes.chatDropdown} ${isOpen ? 'open' : ''}`} data-dropdown>
        <div className={classes.messagesContainer}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`${classes.message} ${
                message.type === 'user' ? classes.userMessage : classes.aiMessage
              }`}
            >
              <div className={message.type === 'user' ? classes.userBubble : classes.aiBubble}>
                {message.content}
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
      </div>
    </>
  );
};

export default AIChat;