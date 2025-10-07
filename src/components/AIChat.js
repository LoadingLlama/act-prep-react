import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createUseStyles } from 'react-jss';

import { useAIChatStyles } from './AIChat.styles';

const AIChat = ({ currentLesson, lessonContent }) => {
  const classes = useAIChatStyles();

  // Core states
  const [chatState, setChatState] = useState('collapsed'); // 'collapsed', 'inputFocused', 'chatOpen'
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showTypingIndicator, setShowTypingIndicator] = useState(false);
  const [showContent, setShowContent] = useState(false);

  // Dragging states
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hasBeenDragged, setHasBeenDragged] = useState(false);
  const [savedPosition, setSavedPosition] = useState({ x: 0, y: 0 });
  const [savedHasBeenDragged, setSavedHasBeenDragged] = useState(false);

  // Refs
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const chatBoxRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  // Handle clicks outside to close - preserve chat history and position
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside the container
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        // Check if we should close based on current state
        if (chatState === 'inputFocused' && messages.length === 0) {
          // Close if input focused but no messages - no history to preserve
          setChatState('collapsed');
          setInputValue('');
          setShowTypingIndicator(false);
          setShowContent(false);
          // Save position if dragged
          if (hasBeenDragged) {
            setSavedPosition(position);
            setSavedHasBeenDragged(true);
          }
          setHasBeenDragged(false);
          setPosition({ x: 0, y: 0 });
        } else if (chatState === 'chatOpen' && !isDragging) {
          // Only close chat if not currently dragging - preserve messages and position
          setChatState('collapsed');
          setInputValue('');
          setIsTyping(false);
          setShowTypingIndicator(false);
          setShowContent(false);
          // Save position if dragged
          if (hasBeenDragged) {
            setSavedPosition(position);
            setSavedHasBeenDragged(true);
          }
          setHasBeenDragged(false);
          setPosition({ x: 0, y: 0 });
          // Note: We keep messages to preserve chat history
        }
      }
    };

    // Only add listener when not collapsed
    if (chatState !== 'collapsed') {
      // Use a slight delay to avoid immediate closure issues
      const timeoutId = setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
      }, 100);

      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [chatState, messages.length, isDragging, hasBeenDragged, position]);

  // Container click handler - restore previous state or start fresh
  const handleContainerClick = useCallback((e) => {
    if (chatState === 'collapsed' && !hasBeenDragged) {
      e.stopPropagation();

      // Set all states simultaneously for smooth restoration
      if (savedHasBeenDragged) {
        // Restore position and dragged state immediately, then change chat state
        setPosition(savedPosition);
        setHasBeenDragged(true);

        // Use requestAnimationFrame to ensure position is set before state change
        requestAnimationFrame(() => {
          if (messages.length > 0) {
            setChatState('chatOpen');
            setTimeout(() => setShowContent(true), 150);
          } else {
            setChatState('inputFocused');
            setShowContent(true);
            setShowTypingIndicator(true);
            // Use requestAnimationFrame for reliable focus after DOM update
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                inputRef.current?.focus();
              });
            });
          }
        });
      } else {
        // No saved position, proceed normally
        if (messages.length > 0) {
          setChatState('chatOpen');
          setTimeout(() => setShowContent(true), 150);
        } else {
          setChatState('inputFocused');
          setShowContent(true);
          setShowTypingIndicator(true);
          // Use requestAnimationFrame for reliable focus after DOM update
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              inputRef.current?.focus();
            });
          });
        }
      }
    }
  }, [chatState, hasBeenDragged, messages.length, savedPosition, savedHasBeenDragged]);

  // Input handlers
  const handleInputFocus = useCallback(() => {
    if (chatState === 'collapsed') {
      setChatState('inputFocused');
    }
    // Hide typing indicator when input gets focus
    if (showTypingIndicator) {
      setShowTypingIndicator(false);
    }
  }, [chatState, showTypingIndicator]);

  const handleInputChange = useCallback((e) => {
    // Sanitize input to prevent potential security issues
    const value = e.target.value;

    // Basic input validation and sanitization
    if (typeof value === 'string' && value.length <= 1000) { // Limit input length
      setInputValue(value);
      // Hide typing indicator when user starts typing
      if (value.length > 0 && showTypingIndicator) {
        setShowTypingIndicator(false);
      }
    }
  }, [showTypingIndicator]);

  // Send message
  const handleSendMessage = useCallback(async () => {
    const trimmedInput = inputValue.trim();

    // Enhanced input validation
    if (!trimmedInput ||
        isTyping ||
        typeof trimmedInput !== 'string' ||
        trimmedInput.length > 1000) {
      return;
    }

    const userMessage = {
      type: 'user',
      content: trimmedInput,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    setChatState('chatOpen');

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
  }, [inputValue, isTyping, currentLesson, lessonContent]);

  const handleInputKeyPress = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey && inputValue.trim() && !isTyping) {
      e.preventDefault();
      e.stopPropagation(); // Prevent lesson navigation
      handleSendMessage();
    } else if (e.key === 'Enter' && !e.shiftKey) {
      // Even if empty, prevent Enter from affecting lesson
      e.preventDefault();
      e.stopPropagation();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      if (messages.length === 0) {
        setChatState('collapsed');
      }
      inputRef.current?.blur();
    }
  }, [inputValue, isTyping, messages.length, handleSendMessage]);

  // AI API simulation
  const callAIAPI = async (question, lesson, content) => {
    // Input validation for security
    if (typeof question !== 'string' || question.length > 1000) {
      throw new Error('Invalid question input');
    }

    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200));

    const responses = {
      'backsolving': [
        "Backsolving is perfect when you see complex equations. Start with answer choice B or C (middle values) and plug them back into the original equation. Whichever makes the equation true is your answer.",
        "Use backsolving when traditional algebra would take too long. Just test each answer choice by substituting it into the equation until you find the one that works."
      ],
      'substitution': [
        "With substitution, pick simple numbers for variables (like 2, 3, or 5) and avoid 0 and 1. Solve the problem with your chosen numbers, then test which answer choice gives the same result.",
        "Substitution turns abstract algebra into concrete arithmetic. Pick easy numbers that follow any rules given in the problem, solve with those numbers, then match your result to the answer choices."
      ]
    };

    // Prevent prototype pollution by using hasOwnProperty
    if (lesson && typeof lesson === 'string' && responses.hasOwnProperty(lesson)) {
      return responses[lesson][Math.floor(Math.random() * responses[lesson].length)];
    }

    const fallbacks = [
      "I'd be happy to help! Can you be more specific about what you're struggling with?",
      "That's a great question. Let me think about the best way to explain this concept.",
      "I can help you understand this better. What specific part would you like me to clarify?"
    ];

    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  };

  // Close chat - save progress and position, minimize to Dynamic Island
  const handleClose = useCallback((e) => {
    e?.stopPropagation();
    e?.preventDefault();

    // Save current position if dragged
    if (hasBeenDragged) {
      setSavedPosition(position);
      setSavedHasBeenDragged(true);
    }

    setChatState('collapsed');
    setInputValue('');
    setIsTyping(false);
    setShowTypingIndicator(false);
    setShowContent(false);
    setHasBeenDragged(false);
    setPosition({ x: 0, y: 0 });
    setIsDragging(false);
    inputRef.current?.blur();
    // Note: We keep messages to preserve chat history
  }, [hasBeenDragged, position]);

  // Drag handlers
  const handleDragStart = useCallback((e) => {
    if (e.button !== 0 || chatState === 'collapsed') return;

    e.preventDefault();
    e.stopPropagation();

    const rect = containerRef.current.getBoundingClientRect();

    // Calculate the offset from the mouse click to the element's current position
    if (hasBeenDragged) {
      // If already dragged, use current position
      setDragStartPos({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    } else {
      // If not dragged yet, calculate offset from center position
      setDragStartPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }

    setIsDragging(true);
  }, [chatState, hasBeenDragged, position]);

  // Snap zones configuration
  const getSnapZones = useCallback(() => {
    const margin = 50;
    const chatWidth = 420;
    const chatHeight = 160;

    return [
      // Center
      {
        x: (window.innerWidth - chatWidth) / 2,
        y: (window.innerHeight - chatHeight) / 2,
        width: chatWidth,
        height: chatHeight,
        type: 'center'
      },
      // Top left
      {
        x: margin,
        y: margin,
        width: chatWidth,
        height: chatHeight,
        type: 'corner'
      },
      // Top right
      {
        x: window.innerWidth - chatWidth - margin,
        y: margin,
        width: chatWidth,
        height: chatHeight,
        type: 'corner'
      },
      // Bottom left
      {
        x: margin,
        y: window.innerHeight - chatHeight - margin,
        width: chatWidth,
        height: chatHeight,
        type: 'corner'
      },
      // Bottom right
      {
        x: window.innerWidth - chatWidth - margin,
        y: window.innerHeight - chatHeight - margin,
        width: chatWidth,
        height: chatHeight,
        type: 'corner'
      }
    ];
  }, []);

  const findNearestSnapZone = useCallback((x, y) => {
    const snapZones = getSnapZones();
    const snapDistance = 80;

    for (const zone of snapZones) {
      const zoneCenterX = zone.x + zone.width / 2;
      const zoneCenterY = zone.y + zone.height / 2;
      const distance = Math.sqrt(
        Math.pow(x + 210 - zoneCenterX, 2) + // 210 is half of chat width
        Math.pow(y + 80 - zoneCenterY, 2)    // 80 is roughly half of chat height
      );

      if (distance < snapDistance) {
        return zone;
      }
    }
    return null;
  }, [getSnapZones]);

  const handleDragMove = useCallback((e) => {
    if (!isDragging) return;

    e.preventDefault();

    const newX = e.clientX - dragStartPos.x;
    const newY = e.clientY - dragStartPos.y;

    // Constrain to viewport with proper bounds
    const maxX = window.innerWidth - 300; // Min width constraint
    const maxY = window.innerHeight - 120; // Min height constraint

    let constrainedPosition = {
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY))
    };

    // Check for snap zones
    const nearestSnap = findNearestSnapZone(constrainedPosition.x, constrainedPosition.y);
    if (nearestSnap) {
      // Show visual feedback but don't snap yet (snap on release)
      constrainedPosition.snapZone = nearestSnap;
    }

    setPosition(constrainedPosition);

    if (!hasBeenDragged) {
      setHasBeenDragged(true);
    }
  }, [isDragging, dragStartPos, hasBeenDragged, findNearestSnapZone]);

  const handleDragEnd = useCallback((e) => {
    if (isDragging) {
      e?.preventDefault();
      e?.stopPropagation();

      // Snap to nearest zone if close enough
      const nearestSnap = findNearestSnapZone(position.x, position.y);
      if (nearestSnap) {
        setPosition({ x: nearestSnap.x, y: nearestSnap.y });
      }

      setIsDragging(false);
    }
  }, [isDragging, position, findNearestSnapZone]);


  // Drag event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleDragMove);
      document.addEventListener('mouseup', handleDragEnd);
      return () => {
        document.removeEventListener('mousemove', handleDragMove);
        document.removeEventListener('mouseup', handleDragEnd);
      };
    }
  }, [isDragging, handleDragMove, handleDragEnd]);

  // Prevent Enter key from reaching lesson when AI chat is active
  useEffect(() => {
    const handleChatKeyDown = (e) => {
      if (e.key === 'Enter' && chatState !== 'collapsed') {
        // If the AI chat is open/focused, prevent Enter from reaching lesson navigation
        const isFromChatArea = e.target.closest('[data-ai-chat]');
        if (isFromChatArea) {
          e.stopPropagation();
        }
      }
    };

    if (chatState !== 'collapsed') {
      document.addEventListener('keydown', handleChatKeyDown, true); // Use capture phase
      return () => {
        document.removeEventListener('keydown', handleChatKeyDown, true);
      };
    }
  }, [chatState]);

  // Force reset of resized dimensions when collapsing
  useEffect(() => {
    if (chatState === 'collapsed' && chatBoxRef.current) {
      // Use timeout to ensure this happens after any pending style updates
      setTimeout(() => {
        if (chatBoxRef.current && chatState === 'collapsed') {
          // Remove any inline width/height styles added by CSS resize
          chatBoxRef.current.style.width = '';
          chatBoxRef.current.style.height = '';
          chatBoxRef.current.style.resize = '';
          chatBoxRef.current.style.minWidth = '';
          chatBoxRef.current.style.minHeight = '';
          chatBoxRef.current.style.maxWidth = '';
          chatBoxRef.current.style.maxHeight = '';
        }
      }, 0);
    }
  }, [chatState]);

  // Determine current style classes
  const getStyleClasses = () => {
    let classes_list = [classes.chatBox];

    if (chatState === 'collapsed') classes_list.push(classes.collapsed);
    if (chatState === 'inputFocused') classes_list.push(classes.inputFocused);
    if (chatState === 'chatOpen') classes_list.push(classes.chatOpen);
    // Apply dragged class if currently dragged OR if we have saved position and are restoring
    if ((hasBeenDragged && chatState !== 'collapsed') || (savedHasBeenDragged && chatState !== 'collapsed')) {
      classes_list.push(classes.dragged);
    }
    if (isDragging) classes_list.push(classes.dragging);

    return classes_list.join(' ');
  };

  const getContainerStyle = () => {
    const baseStyle = {};

    // If has been dragged OR we have a saved position and are restoring
    if ((hasBeenDragged && chatState !== 'collapsed') || (savedHasBeenDragged && chatState !== 'collapsed')) {
      baseStyle.transform = `translate(${position.x}px, ${position.y}px)`;
      baseStyle.left = '0';
      baseStyle.top = '0';
    } else {
      // Always return to top right corner when collapsed and remove any custom sizing
      baseStyle.transform = 'none';
      baseStyle.right = '12px';
      baseStyle.top = '12px';
      baseStyle.left = 'auto';
      baseStyle.width = '';  // Empty string to remove inline width completely
      baseStyle.height = ''; // Empty string to remove inline height completely
      baseStyle.resize = 'none';
    }

    return baseStyle;
  };

  const showDragHandle = chatState === 'chatOpen';
  const showSendButton = inputValue.trim() && (chatState === 'inputFocused' || chatState === 'chatOpen');
  const showCloseButton = chatState === 'inputFocused' || chatState === 'chatOpen';
  const showMessages = chatState === 'chatOpen' && showContent;
  const showResizeHandle = hasBeenDragged && chatState === 'chatOpen';

  return (
    <div
      ref={containerRef}
      className={classes.chatContainer}
      style={getContainerStyle()}
      data-ai-chat
    >
      <div
        ref={chatBoxRef}
        className={getStyleClasses()}
        onClick={handleContainerClick}
      >
        {/* Header with input */}
        <div className={classes.header}>
          {/* Drag handle - only show when chat is open */}
          {showDragHandle && (
            <div
              className={classes.dragHandle}
              onMouseDown={handleDragStart}
              title="Drag to move"
            >
              ⋮⋮
            </div>
          )}

          {/* Input container - only show when not collapsed and content is ready */}
          {chatState !== 'collapsed' && showContent && (
            <div
              className={classes.inputContainer}
              onClick={() => {
                // Ensure input gets focus when container is clicked
                requestAnimationFrame(() => {
                  inputRef.current?.focus();
                });
              }}
            >
              <input
                ref={inputRef}
                className={`${classes.input} ${classes.inputFocusedStyle}`}
                value={inputValue}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                onKeyDown={handleInputKeyPress}
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
                onClick={handleSendMessage}
                disabled={isTyping}
              >
                ↵
              </button>
            </div>
          )}

          {/* Close button - only show when expanded */}
          {showCloseButton && (
            <button
              className={`${classes.closeButton} visible`}
              onClick={handleClose}
            >
              ×
            </button>
          )}
        </div>

        {/* Messages */}
        {showMessages && (
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
        )}

        {/* Resize handle */}
        <div
          className={`${classes.resizeHandle} ${showResizeHandle ? 'visible' : ''}`}
        />
      </div>
    </div>
  );
};

export default AIChat;