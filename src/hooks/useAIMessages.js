/**
 * useAIMessages Hook
 * Manages AI chat messages and typing state
 * Extracted from AIChat component to reduce file size
 */

import { useState, useCallback } from 'react';
import { callAIAPI } from '../services/ai/aiChat.service';

/**
 * Custom hook for managing AI chat messages
 * @param {string} currentLesson - Current lesson key
 * @param {Object} lessonContent - Lesson content object
 * @returns {Object} Messages state and handlers
 */
export const useAIMessages = (currentLesson, lessonContent) => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  /**
   * Send message to AI and get response
   * @param {string} inputValue - User's input message
   * @returns {Promise<boolean>} Whether message was sent successfully
   */
  const sendMessage = useCallback(async (inputValue) => {
    const trimmedInput = inputValue.trim();

    // Enhanced input validation
    if (!trimmedInput ||
        isTyping ||
        typeof trimmedInput !== 'string' ||
        trimmedInput.length > 1000) {
      return false;
    }

    const userMessage = {
      type: 'user',
      content: trimmedInput,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const aiResponse = await callAIAPI(trimmedInput, currentLesson, lessonContent);
      setMessages(prev => [...prev, {
        type: 'ai',
        content: aiResponse,
        timestamp: Date.now()
      }]);
      return true;
    } catch (error) {
      setMessages(prev => [...prev, {
        type: 'ai',
        content: "I'm having trouble connecting right now. Please try again.",
        timestamp: Date.now()
      }]);
      return false;
    } finally {
      setIsTyping(false);
    }
  }, [isTyping, currentLesson, lessonContent]);

  /**
   * Clear all messages
   */
  const clearMessages = useCallback(() => {
    setMessages([]);
    setIsTyping(false);
  }, []);

  return {
    messages,
    isTyping,
    sendMessage,
    clearMessages
  };
};
