import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import MenuItemCard from './MenuItemCard';
import CourseSelector from './CourseSelector';
import { colors, spacing, fontSizes } from '../styles/globalStyles';
import { COURSES, ALL_COURSES } from '../utils/constants';
import { filterMenuItems, sortMenuItems } from '../utils/menuUtils';

const FILTER_OPTIONS = [ALL_COURSES, ...COURSES];

// Displays the menu with search, course filter, edit and delete.
// The search text and selected filter are local UI state; the items
// themselves come from App.js, so the list always reflects the latest data.
export default function ViewMenuScreen({ menuItems, onEditItem, onDeleteItem }) {
  const [searchText, setSearchText] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(ALL_COURSES);

  const visibleItems = useMemo(
    () => sortMenuItems(filterMenuItems(menuItems, searchText, selectedCourse)),
    [menuItems, searchText, selectedCourse]
  );

  const isFiltering = searchText.trim() !== '' || selectedCourse !== ALL_COURSES;

  const clearFilters = () => {
    setSearchText('');
    setSelectedCourse(ALL_COURSES);
  };

  const subtitle =
    menuItems.length === 0
      ? 'No menu items have been added yet.'
      : isFiltering
      ? `Showing ${visibleItems.length} of ${menuItems.length} item${menuItems.length === 1 ? '' : 's'}.`
      : `${menuItems.length} item${menuItems.length === 1 ? '' : 's'} on the menu.`;

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Current Menu</Text>
      <Text style={styles.sectionSubtitle}>{subtitle}</Text>

      {menuItems.length > 0 ? (
        <View style={styles.filters}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by dish name or description"
            placeholderTextColor={colors.textMuted}
            value={searchText}
            onChangeText={setSearchText}
            autoCorrect={false}
            returnKeyType="search"
          />
          <CourseSelector
            selectedCourse={selectedCourse}
            onSelectCourse={setSelectedCourse}
            options={FILTER_OPTIONS}
          />
        </View>
      ) : null}

      {menuItems.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateEmoji}>🍽️</Text>
          <Text style={styles.emptyStateText}>
            Your menu is empty. Go to the "Add Item" tab to add your first dish.
          </Text>
        </View>
      ) : visibleItems.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateEmoji}>🔍</Text>
          <Text style={styles.emptyStateText}>No dishes match your search or filter.</Text>
          <TouchableOpacity style={styles.clearButton} onPress={clearFilters} activeOpacity={0.8}>
            <Text style={styles.clearButtonText}>Clear search & filter</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={visibleItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MenuItemCard item={item} onEdit={onEditItem} onDelete={onDeleteItem} />
          )}
          contentContainerStyle={styles.listContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
  },
  sectionTitle: {
    fontSize: fontSizes.heading,
    fontWeight: '700',
    color: colors.textDark,
    marginBottom: spacing.xs,
  },
  sectionSubtitle: {
    fontSize: fontSizes.body,
    color: colors.textMuted,
    marginBottom: spacing.md,
  },
  filters: {
    marginBottom: spacing.md,
  },
  searchInput: {
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: fontSizes.body,
    color: colors.textDark,
    marginBottom: spacing.sm,
  },
  listContent: {
    paddingBottom: spacing.xl,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  emptyStateEmoji: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  emptyStateText: {
    fontSize: fontSizes.body,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 22,
  },
  clearButton: {
    marginTop: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  clearButtonText: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: fontSizes.body,
  },
});
