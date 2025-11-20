/**
 * Diagnostic Script: Check Calendar and List Views
 * Verifies all views are properly configured
 */

const fs = require('fs');

const file = '/Users/cadenchiang/Desktop/act-prep-react/src/components/app/CourseContent.jsx';
const content = fs.readFileSync(file, 'utf8');

console.log('=== CALENDAR & LIST VIEW DIAGNOSTIC ===\n');

// 1. Check if viewMode state exists
const viewModeState = content.match(/useState\(['"]calendar['"]\)/);
console.log('1. ViewMode State:', viewModeState ? '✓ Found (default: calendar)' : '✗ NOT FOUND');

// 2. Check calendar view rendering
const calendarCheck = content.match(/viewMode === 'calendar'/g);
console.log('2. Calendar View Checks:', calendarCheck ? `✓ Found ${calendarCheck.length} times` : '✗ NOT FOUND');

// 3. Check list view (should be in else block)
const listViewStart = content.indexOf('learningPath.map((week, weekIndex)');
console.log('3. List View Rendering:', listViewStart > 0 ? '✓ Found' : '✗ NOT FOUND');

// 4. Check if checkboxes exist in calendar view
const calendarSection = content.substring(
  content.indexOf('viewMode === \'calendar\''),
  content.indexOf('learningPath.length === 0')
);
const calendarCheckboxes = calendarSection.match(/width: '16px',\s+height: '16px',\s+borderRadius: '4px'/);
console.log('4. Calendar View Checkboxes:', calendarCheckboxes ? '✓ Found' : '✗ NOT FOUND');

// 5. Check if checkboxes exist in list view
const listSection = content.substring(listViewStart);
const listCheckboxes = listSection.match(/width: '20px',\s+height: '20px',\s+borderRadius: '5px'/);
console.log('5. List View Checkboxes:', listCheckboxes ? '✓ Found' : '✗ NOT FOUND');

// 6. Check text colors in calendar view
const calendarTextColors = calendarSection.match(/textColor = item\.isDiagnostic/);
console.log('6. Calendar Text Colors:', calendarTextColors ? '✓ Found' : '✗ NOT FOUND');

// 7. Check text colors in list view
const listTextColors = listSection.match(/textColor = item\.isDiagnostic/);
console.log('7. List View Text Colors:', listTextColors ? '✓ Found' : '✗ NOT FOUND');

// 8. Check handleCheckboxClick in calendar
const calendarCheckboxHandler = calendarSection.match(/const handleCheckboxClick/);
console.log('8. Calendar Checkbox Handler:', calendarCheckboxHandler ? '✓ Found' : '✗ NOT FOUND');

// 9. Check handleCheckboxClick in list
const listCheckboxHandler = listSection.match(/const handleCheckboxClick/);
console.log('9. List Checkbox Handler:', listCheckboxHandler ? '✓ Found' : '✗ NOT FOUND');

// 10. Check handleItemClick function
const handleItemClick = content.match(/const handleItemClick = \(item\) =>/);
console.log('10. handleItemClick Function:', handleItemClick ? '✓ Found' : '✗ NOT FOUND');

// 11. Check getItemIcon function
const getItemIcon = content.match(/const getItemIcon = \(type\) =>/);
console.log('11. getItemIcon Function:', getItemIcon ? '✓ Found' : '✗ NOT FOUND');

// 12. Check for old gradient backgrounds in calendar (should NOT exist)
const calendarGradients = calendarSection.match(/linear-gradient\(135deg, #3b82f6/g);
console.log('12. Calendar Old Gradients:', calendarGradients ? `✗ FOUND ${calendarGradients.length} (should remove!)` : '✓ None (good!)');

// 13. Check for old gradient backgrounds in list (should NOT exist)
const listGradients = listSection.substring(0, 2000).match(/linear-gradient\(135deg, #/g);
console.log('13. List Old Gradients:', listGradients ? `✗ FOUND ${listGradients.length} (should remove!)` : '✓ None (good!)');

// 14. Check onClick on checkboxes in calendar
const calendarCheckboxOnClick = calendarSection.match(/onClick={handleCheckboxClick}/);
console.log('14. Calendar Checkbox onClick:', calendarCheckboxOnClick ? '✓ Found' : '✗ NOT FOUND');

// 15. Check onClick on checkboxes in list
const listCheckboxOnClick = listSection.match(/onClick={handleCheckboxClick}/);
console.log('15. List Checkbox onClick:', listCheckboxOnClick ? '✓ Found' : '✗ NOT FOUND');

console.log('\n=== SUMMARY ===');
console.log('If any items show ✗, those need to be fixed!');
