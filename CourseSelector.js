import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, fontSizes, getCourseColor } from '../styles/globalStyles';
import { COURSES } from '../utils/constants';

// A simple segmented control used to pick a course.
// Used on the form (choose a course) and, with the optional `options` prop,
// on the View Menu screen as a filter (e.g. ['All', ...COURSES]).
export default function CourseSelector({
  selectedCourse,
  onSelectCourse,
  options = COURSES,
}) {
  return (
    <View style={styles.container}>
      {options.map((course) => {
        const isSelected = selectedCourse === course;
        const courseColor = course === 'All' ? colors.textDark : getCourseColor(course);
        return (
          <TouchableOpacity
            key={course}
            style={[
              styles.option,
              isSelected && { backgroundColor: courseColor, borderColor: courseColor },
            ]}
            onPress={() => onSelectCourse(course)}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityState={{ selected: isSelected }}
          >
            <Text
              style={[styles.optionText, isSelected && styles.optionTextSelected]}
              numberOfLines={1}
            >
              {course}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
  },
  option: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingVertical: spacing.sm,
    marginHorizontal: spacing.xs / 2,
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
  },
  optionText: {
    fontSize: fontSizes.small,
    color: colors.textDark,
    fontWeight: '600',
  },
  optionTextSelected: {
    color: '#FFFFFF',
  },
});
