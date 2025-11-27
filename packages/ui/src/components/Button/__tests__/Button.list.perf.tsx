import React, { useCallback, useEffect, useRef, useState } from 'react';

import { StyleSheet, Text, View } from 'react-native';

import { FlashList } from '@shopify/flash-list';

import { Button } from '../Button';

// Item type
type ListItemType = {
  id: string;
  title: string;
  subtitle: string;
  hierarchy: 'primary' | 'secondary' | 'tertiary';
};

// Generate test data
const generateItems = (count: number): ListItemType[] => {
  return Array.from({ length: count }, (_, i) => {
    const hierarchy =
      i % 3 === 0 ? 'primary' : i % 3 === 1 ? 'secondary' : 'tertiary';
    return {
      id: `item-${i}`,
      title: `Item ${i + 1}`,
      subtitle: `Subtitle for item ${i + 1}`,
      hierarchy: hierarchy as 'primary' | 'secondary' | 'tertiary',
    };
  });
};

// List item component - CRITICAL: Must be memoized
const ListItem = React.memo(
  ({
    item,
    onPress,
  }: {
    item: ListItemType;
    onPress: (id: string) => void;
  }) => {
    const renderCount = useRef(0);

    useEffect(() => {
      renderCount.current += 1;
    });

    return (
      <View style={styles.listItem}>
        <View style={styles.itemContent}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
          <Text style={styles.renderCount}>Renders: {renderCount.current}</Text>
        </View>
        <Button
          label="Action"
          size="small"
          hierarchy={item.hierarchy}
          onPress={() => onPress(item.id)}
        />
      </View>
    );
  }
);

ListItem.displayName = 'ListItem';

export const ButtonListPerformanceTest = () => {
  const [itemCount, setItemCount] = useState(100);
  const [items, setItems] = useState(() => generateItems(100));
  const [pressCount, setPressCount] = useState(0);

  // Update items when count changes
  useEffect(() => {
    setItems(generateItems(itemCount));
  }, [itemCount]);

  // CRITICAL: Callbacks must be stable with useCallback
  const handleItemPress = useCallback((_id: string) => {
    setPressCount((prev) => prev + 1);
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: ListItemType }) => (
      <ListItem item={item} onPress={handleItemPress} />
    ),
    [handleItemPress]
  );

  const keyExtractor = useCallback((item: ListItemType) => item.id, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Button List Performance</Text>
        <Text style={styles.subtitle}>
          {itemCount} items • {pressCount} presses
        </Text>

        {/* Item count controls */}
        <View style={styles.controls}>
          <Button label="50" size="small" onPress={() => setItemCount(50)} />
          <Button label="100" size="small" onPress={() => setItemCount(100)} />
          <Button label="500" size="small" onPress={() => setItemCount(500)} />
          <Button
            label="1000"
            size="small"
            onPress={() => setItemCount(1000)}
          />
          <Button
            label="10000"
            size="small"
            onPress={() => setItemCount(10000)}
          />
        </View>
      </View>

      {/* FlashList */}
      <FlashList
        data={items}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: { fontSize: 20, fontWeight: 'bold' },
  subtitle: { fontSize: 14, color: '#666', marginTop: 4 },
  controls: { flexDirection: 'row', marginTop: 12, gap: 8 },
  listItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemContent: { flex: 1, marginRight: 12 },
  itemTitle: { fontSize: 16, fontWeight: '600' },
  itemSubtitle: { fontSize: 14, color: '#666' },
  renderCount: { fontSize: 11, color: '#999', marginTop: 4 },
});
