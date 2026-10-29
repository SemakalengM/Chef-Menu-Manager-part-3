// menuUtils.js
// Pure functions for searching, filtering, sorting and summarising menu items.
import { COURSES, ALL_COURSES } from './constants';

// Returns the items that match the search text (dish name OR description)
// and the selected course. Both filters are optional.
export const filterMenuItems = (items, searchText = '', course = ALL_COURSES) => {
  const query = searchText.trim().toLowerCase();

  return items.filter((item) => {
    const matchesCourse = course === ALL_COURSES || item.course === course;
    const matchesSearch =
      query === '' ||
      item.dishName.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query);
    return matchesCourse && matchesSearch;
  });
};

// Sorts items the way a printed menu reads: by course, then alphabetically.
export const sortMenuItems = (items) =>
  [...items].sort((a, b) => {
    const byCourse = COURSES.indexOf(a.course) - COURSES.indexOf(b.course);
    return byCourse !== 0 ? byCourse : a.dishName.localeCompare(b.dishName);
  });

const average = (list) =>
  list.length === 0 ? 0 : list.reduce((sum, item) => sum + item.price, 0) / list.length;

// Builds every figure shown on the Statistics screen.
export const calculateMenuStats = (items) => {
  const prices = items.map((item) => item.price);

  return {
    totalItems: items.length,
    averagePrice: average(items),
    highestPrice: items.length ? Math.max(...prices) : 0,
    lowestPrice: items.length ? Math.min(...prices) : 0,
    byCourse: COURSES.map((course) => {
      const courseItems = items.filter((item) => item.course === course);
      return { course, count: courseItems.length, averagePrice: average(courseItems) };
    }),
  };
};

export const formatPrice = (value) => `R${Number(value).toFixed(2)}`;
