/**
 * Enhance lesson content with interactive functionality
 */

import logger from '../services/logging/logger';
import errorTracker from '../services/logging/errorTracker';

// Enhance lesson content with interactive functionality
export const enhanceLessonInteractivity = () => {
  try {
    logger.debug('LessonEnhancer', 'enhanceLessonInteractivity', { action: 'start' });
    let enhancementsCount = 0;

    // Add click handlers to practice question options
    const practiceOptions = document.querySelectorAll('.quick-options .option');

    practiceOptions.forEach((option) => {
      if (!option.dataset.enhanced) {
        option.dataset.enhanced = 'true';
        option.style.cursor = 'pointer';

        option.addEventListener('click', () => {
          const practiceContainer = option.closest('.practice-moment');
          const allOptions = practiceContainer.querySelectorAll('.option');

          // Remove previous selections
          allOptions.forEach((opt) => {
            opt.classList.remove('selected', 'show-feedback');
          });

          // Mark this option as selected
          option.classList.add('selected', 'show-feedback');

          // Show feedback for all options
          allOptions.forEach((opt) => {
            opt.classList.add('show-feedback');

            // Create feedback element if it doesn't exist
            let feedback = opt.querySelector('.option-feedback');
            if (!feedback) {
              feedback = document.createElement('div');
              feedback.className = 'option-feedback';
              feedback.style.cssText = `
              margin-top: 0.5rem;
              padding: 0.5rem;
              font-size: 0.85rem;
              border-radius: 4px;
              display: none;
            `;

              if (opt.classList.contains('correct')) {
                feedback.innerHTML = `✅ ${opt.dataset.explanation || 'Correct!'}`;
                feedback.style.background = '#d4edda';
                feedback.style.color = '#155724';
              } else if (opt.classList.contains('incorrect')) {
                feedback.innerHTML = `❌ ${opt.dataset.explanation || 'Not quite right.'}`;
                feedback.style.background = '#f8d7da';
                feedback.style.color = '#721c24';
              }

              opt.appendChild(feedback);
            }

            // Show feedback for the selected option
            if (opt === option) {
              feedback.style.display = 'block';
            }
          });

          // Disable further clicking
          allOptions.forEach((opt) => {
            opt.style.cursor = 'default';
            opt.onclick = null;
          });

          logger.debug('LessonEnhancer', 'practiceOptionClicked', {
            isCorrect: option.classList.contains('correct'),
          });
        });

        enhancementsCount++;
      }
    });

    // Add hover effects to visual elements
    const fanboycards = document.querySelectorAll('.fanboy-card');
    fanboycards.forEach((card) => {
      if (!card.dataset.enhanced) {
        card.dataset.enhanced = 'true';
        card.addEventListener('mouseenter', () => {
          card.style.transform = 'scale(1.05)';
        });
        card.addEventListener('mouseleave', () => {
          card.style.transform = 'scale(1)';
        });
        enhancementsCount++;
      }
    });

    // Add interactive highlighting to sentence parts
    const highlights = document.querySelectorAll(
      '.subject-highlight, .verb-highlight, .trigger-word'
    );
    highlights.forEach((highlight) => {
      if (!highlight.dataset.enhanced) {
        highlight.dataset.enhanced = 'true';
        highlight.style.cursor = 'pointer';
        highlight.title = `This is a ${highlight.className
          .replace('-highlight', '')
          .replace('-', ' ')}`;

        highlight.addEventListener('click', () => {
          // Create a tooltip effect
          const tooltip = document.createElement('div');
          tooltip.className = 'grammar-tooltip';
          tooltip.textContent = highlight.title;
          tooltip.style.cssText = `
          position: absolute;
          background: #333;
          color: white;
          padding: 0.5rem;
          border-radius: 4px;
          font-size: 0.8rem;
          z-index: 1000;
          pointer-events: none;
        `;

          document.body.appendChild(tooltip);

          const rect = highlight.getBoundingClientRect();
          tooltip.style.left = rect.left + 'px';
          tooltip.style.top = rect.top - 40 + 'px';

          setTimeout(() => {
            document.body.removeChild(tooltip);
          }, 2000);

          logger.debug('LessonEnhancer', 'highlightClicked', {
            type: highlight.className,
          });
        });

        enhancementsCount++;
      }
    });

    if (enhancementsCount > 0) {
      logger.info('LessonEnhancer', 'enhanceLessonInteractivity', {
        enhancementsCount,
        practiceOptions: practiceOptions.length,
        fanboycards: fanboycards.length,
        highlights: highlights.length,
      });
    }
  } catch (error) {
    errorTracker.trackError('LessonEnhancer', 'enhanceLessonInteractivity', {}, error);
  }
};

// Run enhancement when DOM is ready
export const initializeLessonEnhancements = () => {
  try {
    logger.info('LessonEnhancer', 'initializeLessonEnhancements', { action: 'start' });

    // Run immediately if DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', enhanceLessonInteractivity);
    } else {
      enhanceLessonInteractivity();
    }

    // Also run after any content updates (for React re-renders)
    // Use a debounced approach to prevent infinite loops
    let enhancementTimer;
    const observer = new MutationObserver(() => {
      clearTimeout(enhancementTimer);
      enhancementTimer = setTimeout(() => {
        enhanceLessonInteractivity();
      }, 200);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    logger.info('LessonEnhancer', 'initializeLessonEnhancements', {
      action: 'complete',
      observerAttached: true,
    });

    return observer; // Return observer so it can be cleaned up if needed
  } catch (error) {
    errorTracker.trackError('LessonEnhancer', 'initializeLessonEnhancements', {}, error);
    return null;
  }
};
