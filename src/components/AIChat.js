/**
 * AI Chat Component
 * Interactive AI assistant for ACT prep
 * Refactored to use hooks and sub-components for better maintainability
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useAIChatStyles } from './AIChat.styles';
import { useDraggable } from '../hooks/useDraggable';
import { useAIMessages } from '../hooks/useAIMessages';
import ChatHeader from './chat/ChatHeader';
import ChatInput from './chat/ChatInput';
import MessageList from './chat/MessageList';

const AIChat = ({ currentLesson, lessonContent }) => {
  const classes = useAIChatStyles();

  // Core states
  const [chatState, setChatState] = useState('collapsed'); // 'collapsed', 'inputFocused', 'chatOpen'
  const [inputValue, setInputValue] = useState('');
  const [showTypingIndicator, setShowTypingIndicator] = useState(false);
  const [showContent, setShowContent] = useState(false);

  // Refs
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const chatBoxRef = useRef(null);

  // Custom hooks
  const draggable = useDraggable({ enabled: true, initialPosition: { x: 0, y: 0 } });
  const { messages, isTyping, sendMessage } = useAIMessages(currentLesson, lessonContent);

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
          draggable.savePosition();
          draggable.resetPosition();
        } else if (chatState === 'chatOpen' && !draggable.isDragging) {
          // Only close chat if not currently dragging - preserve messages and position
          setChatState('collapsed');
          setInputValue('');
          setShowTypingIndicator(false);
          setShowContent(false);
          draggable.savePosition();
          draggable.resetPosition();
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
  }, [chatState, messages.length, draggable]);

  // Container click handler - restore previous state or start fresh
  const handleContainerClick = useCallback((e) => {
    if (chatState === 'collapsed' && !draggable.hasBeenDragged) {
      e.stopPropagation();

      // Set all states simultaneously for smooth restoration
      if (draggable.savedHasBeenDragged) {
        // Restore position and dragged state immediately, then change chat state
        draggable.restorePosition();

        // Use requestAnimationFrame to ensure position is set before state change
        requestAnimationFrame(() => {
          if (messages.length > 0) {
            setChatState('chatOpen');
            setTimeout(() => setShowContent(true), 150);
          } else {
            setChatState('inputFocused');
            setShowContent(true);
            setShowTypingIndicator(true);
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
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              inputRef.current?.focus();
            });
          });
        }
      }
    }
  }, [chatState, draggable, messages.length]);

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
    const success = await sendMessage(inputValue);
    if (success) {
      setInputValue('');
      setChatState('chatOpen');
    }
  }, [inputValue, sendMessage]);

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

  // Close chat - save progress and position, minimize to Dynamic Island
  const handleClose = useCallback((e) => {
    e?.stopPropagation();
    e?.preventDefault();

    draggable.savePosition();

    setChatState('collapsed');
    setInputValue('');
    setShowTypingIndicator(false);
    setShowContent(false);
    draggable.resetPosition();
    inputRef.current?.blur();
    // Note: We keep messages to preserve chat history
  }, [draggable]);

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
    if ((draggable.hasBeenDragged && chatState !== 'collapsed') ||
        (draggable.savedHasBeenDragged && chatState !== 'collapsed')) {
      classes_list.push(classes.dragged);
    }
    if (draggable.isDragging) classes_list.push(classes.dragging);

    return classes_list.join(' ');
  };

  const getContainerStyle = () => {
    const baseStyle = {};

    // If has been dragged OR we have a saved position and are restoring
    if ((draggable.hasBeenDragged && chatState !== 'collapsed') ||
        (draggable.savedHasBeenDragged && chatState !== 'collapsed')) {
      baseStyle.transform = `translate(${draggable.position.x}px, ${draggable.position.y}px)`;
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
  const showResizeHandle = draggable.hasBeenDragged && chatState === 'chatOpen';

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
        <ChatHeader
          classes={classes}
          showDragHandle={showDragHandle}
          showCloseButton={showCloseButton}
          onDragStart={(e) => draggable.handleDragStart(e, containerRef)}
          onClose={handleClose}
        >
          {/* Input container - only show when not collapsed and content is ready */}
          {chatState !== 'collapsed' && showContent && (
            <ChatInput
              inputRef={inputRef}
              classes={classes}
              inputValue={inputValue}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onKeyDown={handleInputKeyPress}
              isTyping={isTyping}
              showTypingIndicator={showTypingIndicator}
              showSendButton={showSendButton}
              onSend={handleSendMessage}
              onContainerClick={() => {
                requestAnimationFrame(() => {
                  inputRef.current?.focus();
                });
              }}
            />
          )}
        </ChatHeader>

        {/* Messages */}
        {showMessages && (
          <MessageList
            classes={classes}
            messages={messages}
            isTyping={isTyping}
            messagesEndRef={messagesEndRef}
          />
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
