import React from 'react';
import TermDefinition from './TermDefinition';
import { sanitizeHTML } from '../utils/security';

/**
 * Component that processes lesson HTML content and adds hover tooltips
 * to blue underlined key terms
 */
const LessonContentWithTooltips = ({ htmlContent }) => {
  // Parse the HTML and replace blue underlined terms with TermDefinition components
  const processContent = (html) => {
    // Create a temporary div to parse HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // Find all strong tags with blue underlined styling
    const blueUnderlinedTerms = doc.querySelectorAll('strong[style*="color: #2563eb"][style*="text-decoration: underline"]');

    // Map to track which terms we've found
    const termsMap = new Map();

    blueUnderlinedTerms.forEach((element) => {
      const termText = element.textContent.trim();
      termsMap.set(termText, element);
    });

    // If no terms found, return original HTML
    if (termsMap.size === 0) {
      return <div dangerouslySetInnerHTML={{ __html: sanitizeHTML(html) }} />;
    }

    // Split content by blue underlined terms and create React elements
    return <ContentWithTerms htmlContent={html} />;
  };

  return processContent(htmlContent);
};

/**
 * Component that renders HTML with embedded TermDefinition components
 */
const ContentWithTerms = ({ htmlContent }) => {
  const [elements, setElements] = React.useState([]);

  React.useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const body = doc.body;

    // Process all nodes and convert blue underlined terms to React components
    const processNode = (node, key = 0) => {
      if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent;
      }

      if (node.nodeType === Node.ELEMENT_NODE) {
        const tagName = node.tagName.toLowerCase();
        const isBlueUnderlined = tagName === 'strong' &&
          node.style.color === 'rgb(37, 99, 235)' &&
          node.style.textDecoration.includes('underline');

        if (isBlueUnderlined) {
          const termText = node.textContent.trim();
          return (
            <TermDefinition key={`term-${key}`} term={termText}>
              <strong style={{
                color: '#2563eb',
                fontWeight: '600',
                textDecoration: 'underline'
              }}>
                {termText}
              </strong>
            </TermDefinition>
          );
        }

        // For other elements, recursively process children
        const children = Array.from(node.childNodes).map((child, i) =>
          processNode(child, `${key}-${i}`)
        );

        // Return the element with processed children
        const props = {
          key: `elem-${key}`,
          dangerouslySetInnerHTML: undefined
        };

        // Copy attributes
        Array.from(node.attributes).forEach(attr => {
          if (attr.name === 'style') {
            props.style = {};
            node.style.cssText.split(';').forEach(rule => {
              const [prop, value] = rule.split(':').map(s => s.trim());
              if (prop && value) {
                const camelProp = prop.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
                props.style[camelProp] = value;
              }
            });
          } else if (attr.name === 'class') {
            props.className = attr.value;
          } else {
            props[attr.name] = attr.value;
          }
        });

        return React.createElement(tagName, props, ...children);
      }

      return null;
    };

    const processedElements = Array.from(body.childNodes).map((node, i) =>
      processNode(node, i)
    );

    setElements(processedElements);
  }, [htmlContent]);

  return <div>{elements}</div>;
};

export default LessonContentWithTooltips;
