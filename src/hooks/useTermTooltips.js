import { useEffect, useState } from 'react';
import TermDefinitionsService from '../services/api/termDefinitions.service';

// Cache for definitions to avoid repeated fetches
let definitionsCache = null;
let cachePromise = null;

const createTooltipHTML = (term, data) => {
  return `
    <div class="term-tooltip" style="
      position: absolute;
      bottom: calc(100% + 12px);
      left: 50%;
      transform: translateX(-50%);
      background-color: #ffffff;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      padding: 1rem 1.25rem;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.08);
      z-index: 10000;
      min-width: 280px;
      max-width: 360px;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.25s ease, transform 0.25s ease;
      white-space: normal;
    ">
      <div style="
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-top: 8px solid #ffffff;
        filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.08));
      "></div>

      <div style="
        font-size: 0.95rem;
        font-weight: 500;
        color: #2563eb;
        margin-bottom: 0.6rem;
        line-height: 1.3;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      ">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="flex-shrink: 0;">
          <path d="M4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H20" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M6.5 2H20V22H6.5C5.83696 22 5.20107 21.7366 4.73223 21.2678C4.26339 20.7989 4 20.163 4 19.5V4.5C4 3.83696 4.26339 3.20107 4.73223 2.73223C5.20107 2.26339 5.83696 2 6.5 2Z" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        ${term}
      </div>

      <div style="
        font-size: 0.9rem;
        font-weight: 400;
        line-height: 1.6;
        color: #374151;
      ">
        ${data.definition}
      </div>
    </div>
  `;
};

/**
 * Hook that adds hover tooltips to blue underlined key terms
 * Fetches definitions from Supabase
 */
export const useTermTooltips = (containerRef, lessonKey = null) => {
  const [definitions, setDefinitions] = useState(null);

  // Fetch definitions from Supabase
  useEffect(() => {
    const fetchDefinitions = async () => {
      // Return cached definitions if available
      if (definitionsCache) {
        setDefinitions(definitionsCache);
        return;
      }

      // If already fetching, wait for that promise
      if (cachePromise) {
        const defs = await cachePromise;
        setDefinitions(defs);
        return;
      }

      // Fetch new definitions
      console.log('useTermTooltips: Fetching definitions from Supabase...');
      cachePromise = lessonKey
        ? TermDefinitionsService.getDefinitionsByLesson(lessonKey)
        : TermDefinitionsService.getAllDefinitions();

      const defs = await cachePromise;
      definitionsCache = defs;
      cachePromise = null;
      setDefinitions(defs);
      console.log('useTermTooltips: Loaded', Object.keys(defs).length, 'definitions');
    };

    fetchDefinitions();
  }, [lessonKey]);

  useEffect(() => {
    if (!containerRef.current || !definitions) {
      console.log('useTermTooltips: containerRef or definitions not ready');
      return;
    }

    const container = containerRef.current;
    console.log('useTermTooltips: Container found, definitions loaded:', Object.keys(definitions).length);

    // Try multiple selectors to find blue underlined strong tags
    let blueUnderlinedTerms = container.querySelectorAll('strong[style*="color: rgb(37, 99, 235)"][style*="text-decoration: underline"]');
    console.log('useTermTooltips: Selector 1 (rgb) found:', blueUnderlinedTerms.length);

    if (blueUnderlinedTerms.length === 0) {
      blueUnderlinedTerms = container.querySelectorAll('strong[style*="color:#2563eb"][style*="text-decoration: underline"]');
      console.log('useTermTooltips: Selector 2 (#2563eb) found:', blueUnderlinedTerms.length);
    }

    if (blueUnderlinedTerms.length === 0) {
      blueUnderlinedTerms = container.querySelectorAll('strong[style*="2563eb"][style*="underline"]');
      console.log('useTermTooltips: Selector 3 (looser) found:', blueUnderlinedTerms.length);
    }

    // Log all strong tags to debug
    const allStrong = container.querySelectorAll('strong');
    console.log('useTermTooltips: Total strong tags:', allStrong.length);
    if (allStrong.length > 0 && allStrong.length < 10) {
      allStrong.forEach((s, i) => {
        console.log(`Strong ${i}:`, s.outerHTML.substring(0, 100));
      });
    }

    const cleanupFunctions = [];

    blueUnderlinedTerms.forEach((element) => {
      const termText = element.textContent.trim();
      const termData = definitions[termText];

      console.log('useTermTooltips: Processing term:', termText, 'Has data:', !!termData);

      if (!termData) return;

      // Wrap element in a positioned container if not already wrapped
      if (!element.parentElement.classList.contains('term-wrapper')) {
        const wrapper = document.createElement('span');
        wrapper.className = 'term-wrapper';
        wrapper.style.position = 'relative';
        wrapper.style.display = 'inline';
        wrapper.style.cursor = 'help';
        element.parentNode.insertBefore(wrapper, element);
        wrapper.appendChild(element);
      }

      const wrapper = element.parentElement;
      let tooltip = null;

      const showTooltip = () => {
        if (!tooltip) {
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = createTooltipHTML(termText, termData);
          tooltip = tempDiv.firstElementChild;
          wrapper.appendChild(tooltip);

          // Smart positioning to prevent going off-screen
          requestAnimationFrame(() => {
            const tooltipRect = tooltip.getBoundingClientRect();
            const wrapperRect = wrapper.getBoundingClientRect();
            const viewportWidth = window.innerWidth;

            // Check if tooltip goes off left edge
            if (tooltipRect.left < 10) {
              const offset = 10 - tooltipRect.left;
              tooltip.style.left = `calc(50% + ${offset}px)`;
            }
            // Check if tooltip goes off right edge
            else if (tooltipRect.right > viewportWidth - 10) {
              const offset = tooltipRect.right - (viewportWidth - 10);
              tooltip.style.left = `calc(50% - ${offset}px)`;
            }

            // Smooth fade in with slight upward movement
            tooltip.style.transform = 'translateX(-50%) translateY(4px)';

            setTimeout(() => {
              if (tooltip) {
                tooltip.style.opacity = '1';
                tooltip.style.transform = 'translateX(-50%) translateY(0)';
              }
            }, 10);
          });
        }
      };

      const hideTooltip = () => {
        if (tooltip) {
          tooltip.style.opacity = '0';
          tooltip.style.transform = 'translateX(-50%) translateY(4px)';

          setTimeout(() => {
            if (tooltip && tooltip.parentNode) {
              tooltip.parentNode.removeChild(tooltip);
              tooltip = null;
            }
          }, 150);
        }
      };

      wrapper.addEventListener('mouseenter', showTooltip);
      wrapper.addEventListener('mouseleave', hideTooltip);

      cleanupFunctions.push(() => {
        wrapper.removeEventListener('mouseenter', showTooltip);
        wrapper.removeEventListener('mouseleave', hideTooltip);
        if (tooltip && tooltip.parentNode) {
          tooltip.parentNode.removeChild(tooltip);
        }
      });
    });

    // Watch for content changes (TypewriterText adds content dynamically)
    const observer = new MutationObserver(() => {
      console.log('useTermTooltips: Content changed, re-scanning...');
      // Re-run the setup when content changes
      const newBlueTerms = container.querySelectorAll('strong[style*="2563eb"][style*="underline"]');
      console.log('useTermTooltips: Found', newBlueTerms.length, 'terms after mutation');

      newBlueTerms.forEach((element) => {
        // Skip if already processed
        if (element.parentElement && element.parentElement.classList.contains('term-wrapper')) {
          return;
        }

        const termText = element.textContent.trim();
        const termData = definitions[termText];

        if (!termData) return;

        // Wrap element
        const wrapper = document.createElement('span');
        wrapper.className = 'term-wrapper';
        wrapper.style.position = 'relative';
        wrapper.style.display = 'inline';
        wrapper.style.cursor = 'help';
        element.parentNode.insertBefore(wrapper, element);
        wrapper.appendChild(element);

        let tooltip = null;

        const showTooltip = () => {
          if (!tooltip) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = createTooltipHTML(termText, termData);
            tooltip = tempDiv.firstElementChild;
            wrapper.appendChild(tooltip);

            requestAnimationFrame(() => {
              const tooltipRect = tooltip.getBoundingClientRect();
              const viewportWidth = window.innerWidth;

              if (tooltipRect.left < 10) {
                const offset = 10 - tooltipRect.left;
                tooltip.style.left = `calc(50% + ${offset}px)`;
              } else if (tooltipRect.right > viewportWidth - 10) {
                const offset = tooltipRect.right - (viewportWidth - 10);
                tooltip.style.left = `calc(50% - ${offset}px)`;
              }

              tooltip.style.transform = 'translateX(-50%) translateY(4px)';
              setTimeout(() => {
                if (tooltip) {
                  tooltip.style.opacity = '1';
                  tooltip.style.transform = 'translateX(-50%) translateY(0)';
                }
              }, 10);
            });
          }
        };

        const hideTooltip = () => {
          if (tooltip) {
            tooltip.style.opacity = '0';
            tooltip.style.transform = 'translateX(-50%) translateY(4px)';
            setTimeout(() => {
              if (tooltip && tooltip.parentNode) {
                tooltip.parentNode.removeChild(tooltip);
                tooltip = null;
              }
            }, 150);
          }
        };

        wrapper.addEventListener('mouseenter', showTooltip);
        wrapper.addEventListener('mouseleave', hideTooltip);
      });
    });

    observer.observe(container, {
      childList: true,
      subtree: true,
      characterData: true
    });

    cleanupFunctions.push(() => observer.disconnect());

    return () => {
      cleanupFunctions.forEach(cleanup => cleanup());
    };
  }, [containerRef, definitions]);
};
