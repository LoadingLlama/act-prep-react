import React, { useState, useRef, useEffect } from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  sidebarOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
    opacity: 0,
    visibility: 'hidden',
    transition: 'all 0.3s ease',
    '&.open': {
      opacity: 1,
      visibility: 'visible'
    }
  },
  sidebar: {
    position: 'fixed',
    top: 0,
    right: 0,
    width: '400px',
    height: '100vh',
    backgroundColor: '#ffffff',
    boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.15)',
    transform: 'translateX(100%)',
    transition: 'transform 0.3s ease',
    zIndex: 1001,
    display: 'flex',
    flexDirection: 'column',
    '&.open': {
      transform: 'translateX(0)'
    },
    '@media (max-width: 768px)': {
      width: '100%'
    }
  },
  header: {
    padding: '1.5rem',
    borderBottom: '1px solid #e2e8f0',
    backgroundColor: '#f8fafc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#2d3748',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  aiIcon: {
    width: '24px',
    height: '24px',
    backgroundColor: '#4299e1',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '0.8rem',
    fontWeight: '600'
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    color: '#a0aec0',
    cursor: 'pointer',
    padding: '0.25rem',
    borderRadius: '4px',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: '#e2e8f0',
      color: '#4a5568'
    }
  },
  contextInfo: {
    padding: '1rem 1.5rem',
    backgroundColor: '#edf2f7',
    borderBottom: '1px solid #e2e8f0',
    fontSize: '0.9rem',
    color: '#4a5568'
  },
  contextLabel: {
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: '0.25rem'
  },
  chatContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },
  messagesContainer: {
    flex: 1,
    overflowY: 'auto',
    padding: '1rem 1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  message: {
    maxWidth: '85%',
    padding: '0.75rem 1rem',
    borderRadius: '12px',
    fontSize: '0.95rem',
    lineHeight: '1.5'
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#4299e1',
    color: 'white'
  },
  aiMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f7fafc',
    color: '#2d3748',
    border: '1px solid #e2e8f0'
  },
  inputContainer: {
    padding: '1rem 1.5rem',
    borderTop: '1px solid #e2e8f0',
    backgroundColor: '#ffffff'
  },
  inputWrapper: {
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'flex-end'
  },
  input: {
    flex: 1,
    padding: '0.75rem 1rem',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '0.95rem',
    resize: 'none',
    minHeight: '40px',
    maxHeight: '120px',
    lineHeight: '1.4',
    fontFamily: 'inherit',
    '&:focus': {
      outline: 'none',
      borderColor: '#4299e1',
      boxShadow: '0 0 0 3px rgba(66, 153, 225, 0.1)'
    }
  },
  sendButton: {
    backgroundColor: '#4299e1',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '0.75rem 1rem',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    minWidth: '60px',
    '&:hover': {
      backgroundColor: '#3182ce'
    },
    '&:disabled': {
      backgroundColor: '#a0aec0',
      cursor: 'not-allowed'
    }
  },
  suggestedQuestions: {
    padding: '1rem 1.5rem',
    borderTop: '1px solid #e2e8f0',
    backgroundColor: '#f8fafc'
  },
  suggestedTitle: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#4a5568',
    marginBottom: '0.5rem'
  },
  suggestionButton: {
    display: 'block',
    width: '100%',
    textAlign: 'left',
    padding: '0.5rem 0.75rem',
    margin: '0.25rem 0',
    backgroundColor: 'transparent',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    fontSize: '0.85rem',
    color: '#4a5568',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: '#edf2f7',
      borderColor: '#cbd5e0'
    }
  },
  typing: {
    alignSelf: 'flex-start',
    padding: '0.75rem 1rem',
    backgroundColor: '#f7fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    fontSize: '0.9rem',
    color: '#4a5568',
    fontStyle: 'italic'
  }
});

const AISidebar = ({ isOpen, onClose, currentLesson, lessonContent, currentQuestionContext }) => {
  const classes = useStyles();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initial welcome message
      setMessages([{
        type: 'ai',
        content: `Hi! I'm your ACT prep AI assistant. I can help you understand the current lesson, answer questions about the material, or explain specific concepts. What would you like to know?`,
        timestamp: Date.now()
      }]);
    }
  }, [isOpen, messages.length]);

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

    // Simulate AI response (replace with actual AI API call)
    try {
      const aiResponse = await simulateAIResponse(userMessage.content, {
        currentLesson,
        lessonContent,
        currentQuestionContext,
        previousMessages: messages
      });

      setMessages(prev => [...prev, {
        type: 'ai',
        content: aiResponse,
        timestamp: Date.now()
      }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        type: 'ai',
        content: "I'm sorry, I'm having trouble processing your request right now. Please try again in a moment.",
        timestamp: Date.now()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const simulateAIResponse = async (question, context) => {
    // Simulate thinking time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    // Context-aware responses based on current lesson
    const contextResponses = {
      'backsolving': {
        keywords: ['backsolv', 'plug', 'answer choice', 'substitute'],
        response: `Great question about backsolving! This is one of the most powerful ACT strategies. Remember the key steps: start with B or C, plug the value back into the equation, and systematically work through the choices. Would you like me to walk through a specific example?`
      },
      'substitution': {
        keywords: ['substitution', 'substitute', 'variable', 'number'],
        response: `Substitution is perfect when you see lots of variables! Pick easy numbers (avoid 0 and 1), follow any rules in the problem, and test each answer choice. This turns abstract algebra into concrete arithmetic.`
      },
      'geometry': {
        keywords: ['angle', 'triangle', 'circle', 'area', 'volume'],
        response: `Geometry questions are all about recognizing patterns and applying formulas. Make sure you've memorized the key formulas since they won't be provided on the test.`
      }
    };

    // Check if question relates to current lesson
    if (context.currentLesson && contextResponses[context.currentLesson]) {
      const lessonContext = contextResponses[context.currentLesson];
      if (lessonContext.keywords.some(keyword =>
        question.toLowerCase().includes(keyword.toLowerCase())
      )) {
        return lessonContext.response;
      }
    }

    // Generic helpful responses
    const genericResponses = [
      `Based on what you're studying, let me help break this down. ${context.currentLesson ? `Since you're working on ${context.currentLesson}, ` : ''}the key is to understand the underlying concept first, then apply the strategy.`,
      `That's a great question! Let me explain this step by step based on the current lesson material.`,
      `I can help with that! This relates to the concepts we're covering in this section.`
    ];

    return genericResponses[Math.floor(Math.random() * genericResponses.length)];
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const suggestedQuestions = currentLesson === 'backsolving' ? [
    "How do I know when to use backsolving?",
    "What if none of the answer choices work?",
    "Can you walk through a backsolving example?"
  ] : [
    "Can you explain this concept differently?",
    "What's the best strategy for this type of question?",
    "How does this apply to the ACT test?"
  ];

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    inputRef.current?.focus();
  };

  const getCurrentContext = () => {
    if (currentQuestionContext) {
      return `Currently viewing: ${currentQuestionContext}`;
    }
    if (currentLesson) {
      return `Current lesson: ${currentLesson.charAt(0).toUpperCase() + currentLesson.slice(1)}`;
    }
    return "ACT Prep - General";
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className={`${classes.sidebarOverlay} ${isOpen ? 'open' : ''}`}
        onClick={onClose}
      />
      <div className={`${classes.sidebar} ${isOpen ? 'open' : ''}`}>
        <div className={classes.header}>
          <div className={classes.title}>
            <div className={classes.aiIcon}>AI</div>
            ACT Prep Assistant
          </div>
          <button className={classes.closeButton} onClick={onClose}>
            ×
          </button>
        </div>

        <div className={classes.contextInfo}>
          <div className={classes.contextLabel}>Context:</div>
          {getCurrentContext()}
        </div>

        <div className={classes.chatContainer}>
          <div className={classes.messagesContainer}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`${classes.message} ${
                  message.type === 'user' ? classes.userMessage : classes.aiMessage
                }`}
              >
                {message.content}
              </div>
            ))}
            {isTyping && (
              <div className={classes.typing}>
                AI is typing...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className={classes.suggestedQuestions}>
            <div className={classes.suggestedTitle}>Suggested questions:</div>
            {suggestedQuestions.map((suggestion, index) => (
              <button
                key={index}
                className={classes.suggestionButton}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>

          <div className={classes.inputContainer}>
            <div className={classes.inputWrapper}>
              <textarea
                ref={inputRef}
                className={classes.input}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about ACT prep..."
                disabled={isTyping}
              />
              <button
                className={classes.sendButton}
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AISidebar;