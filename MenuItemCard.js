import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, fontSizes, getCourseColor } from '../styles/globalStyles';
import { formatPrice } from '../utils/menuUtils';

// Displays a single menu item in a neat, readable card, with Edit and Delete
// buttons. Receives a plain "item" object: { id, dishName, description, course, price }
export default function MenuItemCard({ item, onEdit, onDelete }) {
  const courseColor = getCourseColor(item.course);

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.dishName} numberOfLines={1}>
          {item.dishName}
        </Text>
        <Text style={styles.price}>{formatPrice(item.price)}</Text>
      </View>

      <Text style={styles.description}>{item.description}</Text>

      <View style={styles.footer}>
        <View style={[styles.courseBadge, { backgroundColor: courseColor }]}>
          <Text style={styles.courseBadgeText}>{item.course}</Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.actionButton, styles.editButton]}
            onPress={() => onEdit(item)}
            activeOpacity={0.8}
            accessibilityLabel={`Edit ${item.dishName}`}
          >
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.deleteButton]}
            onPress={() => onDelete(item)}
            activeOpacity={0.8}
            accessibilityLabel={`Delete ${item.dishName}`}
          >
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 10,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  dishName: {
    fontSize: fontSizes.subtitle,
    fontWeight: '700',
    color: colors.textDark,
    flex: 1,
    marginRight: spacing.sm,
  },
  price: {
    fontSize: fontSizes.subtitle,
    fontWeight: '700',
    color: colors.primary,
  },
  description: {
    fontSize: fontSizes.body,
    color: colors.textMuted,
    marginBottom: spacing.sm,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  courseBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 12,
  },
  courseBadgeText: {
    color: '#FFFFFF',
    fontSize: fontSizes.small,
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
  },
  actionButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    borderRadius: 6,
    borderWidth: 1,
    marginLeft: spacing.sm,
  },
  editButton: {
    borderColor: colors.primary,
  },
  editText: {
    color: colors.primary,
    fontSize: fontSizes.small,
    fontWeight: '700',
  },
  deleteButton: {
    borderColor: colors.error,
    backgroundColor: colors.errorBackground,
  },
  deleteText: {
    color: colors.error,
    fontSize: fontSizes.small,
    fontWeight: '700',
  },
});
