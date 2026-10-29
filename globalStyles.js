// globalStyles.js
// Central place for colours, spacing and font sizes so that every screen
// in the app looks and feels consistent.

export const colors = {
  primary: '#8B2E2E',      // Deep restaurant red - used for headers / primary buttons
  primaryDark: '#6E2323',
  accent: '#D4A24C',       // Warm gold accent
  background: '#FAF6F0',   // Soft cream background
  cardBackground: '#FFFFFF',
  textDark: '#2E2420',
  textMuted: '#7A6F68',
  border: '#E4DAD0',
  success: '#2F7D4F',
  successBackground: '#E6F4EA',
  error: '#B3261E',
  errorBackground: '#FCE8E6',
  starter: '#4A7B9D',
  main: '#8B2E2E',
  dessert: '#A15CA1',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const fontSizes = {
  small: 13,
  body: 15,
  label: 15,
  subtitle: 17,
  title: 20,
  heading: 22,
};

// Returns a colour for each course so items are easy to tell apart at a glance.
export const getCourseColor = (course) => {
  switch (course) {
    case 'Starter':
      return colors.starter;
    case 'Dessert':
      return colors.dessert;
    case 'Main Course':
    default:
      return colors.main;
  }
};
