# Chef's Menu Manager — Part 3 (Final PoE)

A React Native (Expo) app that lets a restaurant chef manage a menu.
Builds on Part 2 (add + view) and completes the "Next steps" listed there.

## Features

**From Part 2**
- Capture a dish: Dish Name, Description, Course (Starter / Main Course / Dessert), Price
- Inline validation with clear messages, success alerts, empty-state message

**New in Part 3**
- **Edit** any dish (form is pre-filled; Save Changes / Cancel)
- **Delete** any dish, with a confirmation prompt
- **Search** by dish name or description (case-insensitive)
- **Filter by course** (All / Starter / Main Course / Dessert), combinable with search
- "Showing X of Y items" counter and a "Clear search & filter" button when nothing matches
- **Statistics tab**: total dishes, average / highest / lowest price, and dish count + average price per course
- Menu is displayed in menu order (Starter → Main → Dessert, then A–Z)
- Price accepts a comma decimal ("129,90") as well as a full stop

## Project structure

```
ChefMenuManager/
├── App.js                     # Root: state (items, active tab, item being edited) + add/update/delete handlers
├── components/
│   ├── AddMenuScreen.js       # One form used for both adding AND editing
│   ├── ViewMenuScreen.js      # Search box, course filter, list, empty states
│   ├── StatsScreen.js         # Menu statistics
│   ├── MenuItemCard.js        # Dish card with Edit / Delete buttons
│   ├── CourseSelector.js      # Segmented control (form + filter)
│   └── TabBar.js              # Reusable tab bar
├── utils/
│   ├── constants.js           # COURSES list
│   ├── validation.js          # Form validation + price parsing (pure functions)
│   └── menuUtils.js           # filter / sort / statistics / price formatting (pure functions)
└── styles/globalStyles.js     # Shared colours, spacing, font sizes
```

## Running the app

```
npm install
npx expo start
```
Scan the QR code with Expo Go, or press `a` for an Android emulator.

## Design notes / refactoring

- All menu data still lives in `App.js` (single source of truth) and flows down as props.
- Editing reuses the Add form via an `itemToEdit` prop instead of duplicating it.
  A `key` on the form resets its state when switching between "add" and "edit".
- Business logic (validation, filtering, sorting, statistics) was moved out of the
  components into `utils/` as plain functions, so the screens only deal with display.
- Search/filter text is local UI state in `ViewMenuScreen`; the filtered list is
  derived with `useMemo`, never stored, so it can't go out of sync with the data.
- Leaving the form tab while editing cancels the edit.
- Data is held in memory only, so it resets when the app is closed.
