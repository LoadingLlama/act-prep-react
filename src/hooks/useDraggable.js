/**
 * useDraggable Hook
 * Provides drag and drop functionality with snap zones
 * Extracted from AIChat component to reduce file size
 */

import { useState, useCallback, useEffect } from 'react';

/**
 * Custom hook for draggable elements with snap-to zones
 * @param {Object} options - Configuration options
 * @param {boolean} options.enabled - Whether dragging is enabled
 * @param {Object} options.initialPosition - Initial position {x, y}
 * @returns {Object} Draggable state and handlers
 */
export const useDraggable = ({ enabled = true, initialPosition = { x: 0, y: 0 } } = {}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState(initialPosition);
  const [hasBeenDragged, setHasBeenDragged] = useState(false);
  const [savedPosition, setSavedPosition] = useState({ x: 0, y: 0 });
  const [savedHasBeenDragged, setSavedHasBeenDragged] = useState(false);

  /**
   * Get snap zones configuration
   * @returns {Array} Array of snap zone objects
   */
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

  /**
   * Find nearest snap zone to given position
   * @param {number} x - X coordinate
   * @param {number} y - Y coordinate
   * @returns {Object|null} Nearest snap zone or null
   */
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

  /**
   * Start dragging
   * @param {MouseEvent} e - Mouse event
   * @param {Object} containerRef - Reference to container element
   */
  const handleDragStart = useCallback((e, containerRef) => {
    if (e.button !== 0 || !enabled) return;

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
  }, [enabled, hasBeenDragged, position]);

  /**
   * Move draggable element
   * @param {MouseEvent} e - Mouse event
   */
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

  /**
   * End dragging and snap to zone if nearby
   * @param {MouseEvent} e - Mouse event
   */
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

  /**
   * Save current position for later restoration
   */
  const savePosition = useCallback(() => {
    if (hasBeenDragged) {
      setSavedPosition(position);
      setSavedHasBeenDragged(true);
    }
  }, [hasBeenDragged, position]);

  /**
   * Restore saved position
   */
  const restorePosition = useCallback(() => {
    if (savedHasBeenDragged) {
      setPosition(savedPosition);
      setHasBeenDragged(true);
    }
  }, [savedHasBeenDragged, savedPosition]);

  /**
   * Reset position to initial state
   */
  const resetPosition = useCallback(() => {
    setPosition(initialPosition);
    setHasBeenDragged(false);
    setIsDragging(false);
  }, [initialPosition]);

  // Add drag event listeners when dragging
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

  return {
    // State
    isDragging,
    position,
    hasBeenDragged,
    savedHasBeenDragged,
    savedPosition,

    // Handlers
    handleDragStart,
    handleDragMove,
    handleDragEnd,
    savePosition,
    restorePosition,
    resetPosition,

    // Setters (for external control)
    setPosition,
    setHasBeenDragged
  };
};
