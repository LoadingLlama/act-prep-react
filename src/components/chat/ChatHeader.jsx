/**
 * ChatHeader Component
 * Header with drag handle and close button
 * Extracted from AIChat component to reduce file size
 */

import React from 'react';

/**
 * ChatHeader - Chat window header with controls
 * @param {Object} props - Component props
 * @param {Object} props.classes - JSS style classes
 * @param {boolean} props.showDragHandle - Whether to show drag handle
 * @param {boolean} props.showCloseButton - Whether to show close button
 * @param {Function} props.onDragStart - Drag start handler
 * @param {Function} props.onClose - Close button handler
 * @param {React.ReactNode} props.children - Children elements (e.g., input)
 * @returns {JSX.Element} Chat header component
 */
const ChatHeader = ({
  classes,
  showDragHandle,
  showCloseButton,
  onDragStart,
  onClose,
  children
}) => {
  return (
    <div className={classes.header}>
      {/* Drag handle - only show when chat is open */}
      {showDragHandle && (
        <div
          className={classes.dragHandle}
          onMouseDown={onDragStart}
          title="Drag to move"
        >
          ⋮⋮
        </div>
      )}

      {children}

      {/* Close button - only show when expanded */}
      {showCloseButton && (
        <button
          className={`${classes.closeButton} visible`}
          onClick={onClose}
        >
          ×
        </button>
      )}
    </div>
  );
};

export default ChatHeader;
