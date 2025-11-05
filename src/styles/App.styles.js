/**
 * App Component Styles
 * Combined styles from modular files for maintainability
 * Each module is < 300 lines for better code organization
 */

import { createUseStyles } from 'react-jss';
import { buttonStyles } from '../utils/sharedStyles';
import { layoutStyles } from './app/layout.styles';
import { headerStyles } from './app/header.styles';
import { lessonsGridStyles } from './app/lessons-grid.styles';
import { lessonsItemsStyles } from './app/lessons-items.styles';
import { modalStyles } from './app/modal.styles';

/**
 * Combines all app style modules into a single hook
 * Maintains backwards compatibility with existing imports
 */
export const useAppStyles = createUseStyles({
  ...layoutStyles,
  ...headerStyles,
  ...lessonsGridStyles,
  ...lessonsItemsStyles,
  ...modalStyles,
  btn: buttonStyles.primary
});
