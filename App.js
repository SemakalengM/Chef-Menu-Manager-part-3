import React, { useState } from 'react';
import { SafeAreaView, StatusBar, View, Text, Alert, StyleSheet } from 'react-native';
import AddMenuScreen from './components/AddMenuScreen';
import ViewMenuScreen from './components/ViewMenuScreen';
import StatsScreen from './components/StatsScreen';
import TabBar from './components/TabBar';
import { colors, spacing, fontSizes } from './styles/globalStyles';

// Root component of the Chef's Menu Manager app (Final PoE).
// Holds the single source of truth for all menu items in state and exposes
// add / update / delete handlers to the screens below it.
export default function App() {
  const [menuItems, setMenuItems] = useState([]);
  const [activeScreen, setActiveScreen] = useState('add'); // 'add' | 'view' | 'stats'
  const [editingItem, setEditingItem] = useState(null); // dish being edited, or null

  // ---- Create ----------------------------------------------------------
  const handleAddMenuItem = (newItem) => {
    const itemWithId = { ...newItem, id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}` };
    setMenuItems((previous) => [...previous, itemWithId]);
    setActiveScreen('view');
  };

  // ---- Update ----------------------------------------------------------
  const handleUpdateMenuItem = (changes) => {
    setMenuItems((previous) =>
      previous.map((item) => (item.id === editingItem.id ? { ...item, ...changes } : item))
    );
    setEditingItem(null);
    setActiveScreen('view');
  };

  // ---- Delete (asks for confirmation first) ----------------------------
  const handleDeleteMenuItem = (item) => {
    Alert.alert('Delete Menu Item', `Remove "${item.dishName}" from the menu?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => setMenuItems((previous) => previous.filter((i) => i.id !== item.id)),
      },
    ]);
  };

  // ---- Navigation ------------------------------------------------------
  const handleStartEdit = (item) => {
    setEditingItem(item);
    setActiveScreen('add'); // the form screen doubles as the edit screen
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
    setActiveScreen('view');
  };

  // Leaving the form tab abandons any edit that was in progress.
  const handleChangeTab = (key) => {
    if (key !== 'add') setEditingItem(null);
    setActiveScreen(key);
  };

  const tabs = [
    { key: 'add', label: editingItem ? 'Edit Item' : 'Add Item' },
    { key: 'view', label: `View Menu (${menuItems.length})` },
    { key: 'stats', label: 'Statistics' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />

      <View style={styles.appHeader}>
        <Text style={styles.appTitle}>Chef's Menu Manager</Text>
      </View>

      <TabBar tabs={tabs} activeKey={activeScreen} onChange={handleChangeTab} />

      {activeScreen === 'add' && (
        <AddMenuScreen
          // key forces a fresh form (and fresh state) when switching between
          // "add" and "edit <item>", so old text never leaks across.
          key={editingItem ? editingItem.id : 'new'}
          itemToEdit={editingItem}
          onSubmit={editingItem ? handleUpdateMenuItem : handleAddMenuItem}
          onCancel={handleCancelEdit}
        />
      )}
      {activeScreen === 'view' && (
        <ViewMenuScreen
          menuItems={menuItems}
          onEditItem={handleStartEdit}
          onDeleteItem={handleDeleteMenuItem}
        />
      )}
      {activeScreen === 'stats' && <StatsScreen menuItems={menuItems} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  appHeader: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  appTitle: {
    color: '#FFFFFF',
    fontSize: fontSizes.title,
    fontWeight: '700',
  },
});
