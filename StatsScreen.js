import React, { useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { colors, spacing, fontSizes, getCourseColor } from '../styles/globalStyles';
import { calculateMenuStats, formatPrice } from '../utils/menuUtils';

// A small "number card" used in the overview grid.
function StatCard({ label, value }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

// Shows summary figures for the whole menu: total dishes, average / highest /
// lowest price, and the number of dishes and average price for each course.
export default function StatsScreen({ menuItems }) {
  const stats = useMemo(() => calculateMenuStats(menuItems), [menuItems]);

  if (stats.totalItems === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyEmoji}>📊</Text>
        <Text style={styles.emptyText}>
          No statistics yet. Add some dishes and the numbers will appear here.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.sectionTitle}>Menu Statistics</Text>
      <Text style={styles.sectionSubtitle}>A quick summary of your current menu.</Text>

      <View style={styles.grid}>
        <StatCard label="Total dishes" value={String(stats.totalItems)} />
        <StatCard label="Average price" value={formatPrice(stats.averagePrice)} />
        <StatCard label="Highest price" value={formatPrice(stats.highestPrice)} />
        <StatCard label="Lowest price" value={formatPrice(stats.lowestPrice)} />
      </View>

      <Text style={styles.groupTitle}>By course</Text>
      {stats.byCourse.map(({ course, count, averagePrice }) => (
        <View key={course} style={styles.courseRow}>
          <View style={[styles.courseDot, { backgroundColor: getCourseColor(course) }]} />
          <View style={styles.courseInfo}>
            <Text style={styles.courseName}>{course}</Text>
            <Text style={styles.courseCount}>
              {count} dish{count === 1 ? '' : 'es'}
            </Text>
          </View>
          <View style={styles.courseAverage}>
            <Text style={styles.courseAverageValue}>
              {count === 0 ? '—' : formatPrice(averagePrice)}
            </Text>
            <Text style={styles.courseAverageLabel}>average</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
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
    marginBottom: spacing.lg,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  statValue: {
    fontSize: fontSizes.heading,
    fontWeight: '700',
    color: colors.primary,
  },
  statLabel: {
    fontSize: fontSizes.small,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  groupTitle: {
    fontSize: fontSizes.subtitle,
    fontWeight: '700',
    color: colors.textDark,
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
  },
  courseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  courseDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: spacing.md,
  },
  courseInfo: {
    flex: 1,
  },
  courseName: {
    fontSize: fontSizes.body,
    fontWeight: '700',
    color: colors.textDark,
  },
  courseCount: {
    fontSize: fontSizes.small,
    color: colors.textMuted,
  },
  courseAverage: {
    alignItems: 'flex-end',
  },
  courseAverageValue: {
    fontSize: fontSizes.subtitle,
    fontWeight: '700',
    color: colors.textDark,
  },
  courseAverageLabel: {
    fontSize: fontSizes.small,
    color: colors.textMuted,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  emptyText: {
    fontSize: fontSizes.body,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 22,
  },
});
