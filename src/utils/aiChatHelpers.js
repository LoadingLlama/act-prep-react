export const formatAIMessage = (text) => {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/
/g, '<br />');
};
