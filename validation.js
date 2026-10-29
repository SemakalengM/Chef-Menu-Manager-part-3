// validation.js
// Pure validation helpers (no React) so the rules are easy to read and test.
import { COURSES } from './constants';

// Converts the text typed in the price box to a number.
// Accepts a comma as the decimal separator (e.g. "129,90") because many
// South African keyboards use it. Returns NaN when the text is not a number.
export const parsePrice = (text) => {
  const cleaned = String(text).trim().replace(',', '.');
  if (cleaned === '') return NaN;
  return Number(cleaned);
};

// Checks every field and returns an object describing any problems found.
// An empty object means the form is valid.
export const validateMenuItem = ({ dishName, description, course, price }) => {
  const errors = {};

  if (!dishName.trim()) {
    errors.dishName = 'Please enter the dish name.';
  } else if (dishName.trim().length > 60) {
    errors.dishName = 'Dish name must be 60 characters or fewer.';
  }

  if (!description.trim()) {
    errors.description = 'Please enter a short description.';
  }

  if (!COURSES.includes(course)) {
    errors.course = 'Please select a course.';
  }

  if (!String(price).trim()) {
    errors.price = 'Please enter a price.';
  } else {
    const value = parsePrice(price);
    if (!Number.isFinite(value) || value <= 0) {
      errors.price = 'Price must be a valid number greater than 0.';
    }
  }

  return errors;
};
