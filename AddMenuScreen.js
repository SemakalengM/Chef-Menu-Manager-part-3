import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import CourseSelector from './CourseSelector';
import { colors, spacing, fontSizes } from '../styles/globalStyles';
import { validateMenuItem, parsePrice } from '../utils/validation';

// Form screen used for BOTH adding a new dish and editing an existing one.
// - Add mode:  itemToEdit is null, the form starts empty.
// - Edit mode: itemToEdit is the dish being changed, the form is pre-filled
//              and a Cancel button is shown.
// Valid data is handed back up to App.js through onSubmit.
export default function AddMenuScreen({ itemToEdit, onSubmit, onCancel }) {
  const isEditing = Boolean(itemToEdit);

  const [dishName, setDishName] = useState(itemToEdit?.dishName ?? '');
  const [description, setDescription] = useState(itemToEdit?.description ?? '');
  const [course, setCourse] = useState(itemToEdit?.course ?? '');
  const [price, setPrice] = useState(itemToEdit ? String(itemToEdit.price) : '');
  const [errors, setErrors] = useState({});

  const resetForm = () => {
    setDishName('');
    setDescription('');
    setCourse('');
    setPrice('');
    setErrors({});
  };

  const handleSave = () => {
    const validationErrors = validateMenuItem({ dishName, description, course, price });
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return; // let the inline messages guide the chef
    }

    const cleanItem = {
      dishName: dishName.trim(),
      description: description.trim(),
      course,
      price: parsePrice(price),
    };

    onSubmit(cleanItem);
    if (!isEditing) resetForm();

    Alert.alert(
      isEditing ? 'Menu Item Updated' : 'Menu Item Added',
      `"${cleanItem.dishName}" was ${isEditing ? 'updated' : 'added to the menu'} successfully.`
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.sectionTitle}>
          {isEditing ? 'Edit Menu Item' : 'Add a New Menu Item'}
        </Text>
        <Text style={styles.sectionSubtitle}>
          {isEditing
            ? 'Change the details below, then save your changes.'
            : 'Fill in the details below to add a dish to the menu.'}
        </Text>

        {/* Dish Name */}
        <View style={styles.field}>
          <Text style={styles.label}>Dish Name</Text>
          <TextInput
            style={[styles.input, errors.dishName && styles.inputError]}
            placeholder="e.g. Grilled Salmon"
            placeholderTextColor={colors.textMuted}
            value={dishName}
            onChangeText={setDishName}
          />
          {errors.dishName ? <Text style={styles.errorText}>{errors.dishName}</Text> : null}
        </View>

        {/* Description */}
        <View style={styles.field}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea, errors.description && styles.inputError]}
            placeholder="Short description of the dish"
            placeholderTextColor={colors.textMuted}
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={3}
          />
          {errors.description ? <Text style={styles.errorText}>{errors.description}</Text> : null}
        </View>

        {/* Course */}
        <View style={styles.field}>
          <Text style={styles.label}>Course</Text>
          <CourseSelector selectedCourse={course} onSelectCourse={setCourse} />
          {errors.course ? <Text style={styles.errorText}>{errors.course}</Text> : null}
        </View>

        {/* Price */}
        <View style={styles.field}>
          <Text style={styles.label}>Price (R)</Text>
          <TextInput
            style={[styles.input, errors.price && styles.inputError]}
            placeholder="e.g. 129.90"
            placeholderTextColor={colors.textMuted}
            value={price}
            onChangeText={setPrice}
            keyboardType="decimal-pad"
          />
          {errors.price ? <Text style={styles.errorText}>{errors.price}</Text> : null}
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave} activeOpacity={0.85}>
          <Text style={styles.saveButtonText}>
            {isEditing ? 'Save Changes' : 'Save Menu Item'}
          </Text>
        </TouchableOpacity>

        {isEditing ? (
          <TouchableOpacity style={styles.cancelButton} onPress={onCancel} activeOpacity={0.85}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        ) : null}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
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
  field: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: fontSizes.label,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: spacing.xs,
  },
  input: {
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: fontSizes.body,
    color: colors.textDark,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: colors.error,
  },
  errorText: {
    color: colors.error,
    fontSize: fontSizes.small,
    marginTop: spacing.xs / 2,
  },
  saveButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginTop: spacing.md,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: fontSizes.subtitle,
    fontWeight: '700',
  },
  cancelButton: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.cardBackground,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  cancelButtonText: {
    color: colors.textDark,
    fontSize: fontSizes.subtitle,
    fontWeight: '600',
  },
});
