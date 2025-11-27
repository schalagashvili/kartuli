import React, { useCallback, useEffect, useRef, useState } from 'react';

import { Text, View } from 'react-native';

import { FlashList } from '@shopify/flash-list';
import { StyleSheet } from 'react-native-unistyles';

import { Button } from '../Button';

type ListItemType = {
  id: string;
  title: string;
  subtitle: string;
  hierarchy: 'primary' | 'secondary' | 'tertiary';
};

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

  useEffect(() => {
    setItems(generateItems(itemCount));
  }, [itemCount]);

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
      <View style={styles.header}>
        <Text style={styles.title}>Button List Performance</Text>
        <Text style={styles.subtitle}>
          {itemCount} items • {pressCount} presses
        </Text>

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

      <FlashList
        data={items}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundSecondary,
  },
  header: {
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
    borderBottomWidth: theme.borderWidths.thin,
    borderBottomColor: theme.colors.border,
  },
  title: {
    fontSize: theme.fontSizes['2xl'],
    fontWeight: theme.fontWeights.bold,
    fontFamily: theme.fontFamilies.sans,
    color: theme.colors.contentPrimary,
  },
  subtitle: {
    fontSize: theme.fontSizes.sm,
    fontFamily: theme.fontFamilies.sans,
    color: theme.colors.contentSecondary,
    marginTop: theme.spacing.xs,
  },
  controls: {
    flexDirection: 'row',
    marginTop: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  listItem: {
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
    marginHorizontal: theme.spacing.lg,
    marginVertical: theme.spacing.sm,
    borderRadius: theme.radius.lg,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemContent: {
    flex: 1,
    marginRight: theme.spacing.md,
  },
  itemTitle: {
    fontSize: theme.fontSizes.lg,
    fontWeight: theme.fontWeights.semibold,
    fontFamily: theme.fontFamilies.sans,
    color: theme.colors.contentPrimary,
  },
  itemSubtitle: {
    fontSize: theme.fontSizes.sm,
    fontFamily: theme.fontFamilies.sans,
    color: theme.colors.contentSecondary,
  },
  renderCount: {
    fontSize: theme.fontSizes.xs,
    fontFamily: theme.fontFamilies.sans,
    color: theme.colors.contentTertiary,
    marginTop: theme.spacing.xs,
  },
}));
