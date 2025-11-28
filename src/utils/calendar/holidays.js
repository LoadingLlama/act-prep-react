/**
 * Holiday utilities for calendar display
 * Calculates US holidays for a given year
 */

// Helper to get nth weekday of month (e.g., 3rd Monday)
const getNthWeekdayOfMonth = (year, month, weekday, n) => {
  const date = new Date(year, month, 1);
  let count = 0;
  while (date.getMonth() === month) {
    if (date.getDay() === weekday) {
      count++;
      if (count === n) return new Date(date);
    }
    date.setDate(date.getDate() + 1);
  }
  return null;
};

// Helper to get last weekday of month
const getLastWeekdayOfMonth = (year, month, weekday) => {
  const date = new Date(year, month + 1, 0); // Last day of month
  while (date.getDay() !== weekday) {
    date.setDate(date.getDate() - 1);
  }
  return date;
};

/**
 * Get all US holidays for a given year
 * @param {number} year - The year to get holidays for
 * @returns {Object} Object with date strings as keys and holiday info as values
 */
export const getHolidays = (year) => {
  return {
    [`${year}-01-01`]: { name: "New Year's Day", emoji: '🎉', color: '#3b82f6' },
    [`${year}-02-14`]: { name: "Valentine's Day", emoji: '❤️', color: '#ec4899' },
    [getNthWeekdayOfMonth(year, 0, 1, 3).toISOString().split('T')[0]]: { name: 'MLK Jr. Day', emoji: '✊', color: '#6366f1' },
    [getNthWeekdayOfMonth(year, 1, 1, 3).toISOString().split('T')[0]]: { name: "Presidents' Day", emoji: '🇺🇸', color: '#dc2626' },
    [getLastWeekdayOfMonth(year, 4, 1).toISOString().split('T')[0]]: { name: 'Memorial Day', emoji: '🇺🇸', color: '#dc2626' },
    [`${year}-07-04`]: { name: 'Independence Day', emoji: '🎆', color: '#dc2626' },
    [getNthWeekdayOfMonth(year, 8, 1, 1).toISOString().split('T')[0]]: { name: 'Labor Day', emoji: '⚒️', color: '#f59e0b' },
    [`${year}-10-31`]: { name: 'Halloween', emoji: '🎃', color: '#f97316' },
    [getNthWeekdayOfMonth(year, 10, 4, 4).toISOString().split('T')[0]]: { name: 'Thanksgiving', emoji: '🦃', color: '#f59e0b' },
    [`${year}-12-25`]: { name: 'Christmas', emoji: '🎄', color: '#22c55e' },
    [`${year}-12-31`]: { name: "New Year's Eve", emoji: '🎊', color: '#3b82f6' }
  };
};
