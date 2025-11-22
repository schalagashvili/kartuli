import React from 'react';

import { View } from 'react-native';

import {
  Button,
  Car,
  ChevronDown,
  Heart,
  MapPin,
  TrashIcon,
} from '@kartuli/ui';

const HelloWave = () => {
  const handleConfirm = () => {};
  const handleChange = () => {};
  const handleDismiss = () => {};
  const handleDelete = () => {};
  const handleConfirmDelete = () => {};
  const handleFavorite = () => {};
  const handleOpen = () => {};
  const toggleFilter = () => {};
  const handleSave = () => {};
  const isFilterActive = false;

  return (
    <View>
      <Button
        label="Delete"
        hierarchy="primary"
        tone="negative"
        size="large"
        widthMode="fixed"
        onPress={handleDelete}
      />
      <Button
        label="Delete"
        hierarchy="secondary"
        tone="negative"
        size="large"
        widthMode="fixed"
        onPress={handleDelete}
      />
      <Button
        label="Delete"
        hierarchy="secondary"
        tone="negative"
        size="medium"
        widthMode="intrinsic"
        shape="pill"
        onPress={handleDelete}
      />
      <Button
        label="Delete"
        hierarchy="secondary"
        tone="negative"
        size="small"
        widthMode="intrinsic"
        shape="pill"
        onPress={handleDelete}
      />

      <Button
        label=""
        hierarchy="secondary"
        tone="negative"
        shape="circle"
        size="large"
        leadingIcon={TrashIcon}
        accessibilityLabel="Add to favorites"
        onPress={handleFavorite}
      />

      <Button
        label="Change"
        hierarchy="tertiary"
        size="large"
        widthMode="fixed"
        onPress={handleChange}
      />

      <Button
        label=""
        hierarchy="secondary"
        tone="negative"
        shape="circle"
        size="small"
        leadingIcon={TrashIcon}
        accessibilityLabel="Add to favorites"
        onPress={handleFavorite}
      />

      <Button
        label="Confirm ride"
        hierarchy="primary"
        widthMode="fixed"
        size="large"
        onPress={handleConfirm}
      />

      <Button
        label="Change"
        hierarchy="tertiary"
        size="medium"
        onPress={handleChange}
      />

      <Button
        label="Confirm ride"
        hierarchy="secondary"
        size="large"
        widthMode="fixed"
        onPress={handleConfirm}
        leadingIcon={MapPin}
        trailingIcon={ChevronDown}
      />
      <Button
        label="Confirm ride hello world sandro chalagashvili testing everything"
        hierarchy="primary"
        size="small"
        widthMode="intrinsic"
        onPress={handleConfirm}
        leadingIcon={Car}
      />

      <Button label="Not now" hierarchy="tertiary" onPress={handleDismiss} />

      <Button
        label="Delete"
        hierarchy="secondary"
        tone="negative"
        onPress={handleDelete}
        shape="pill"
      />

      <Button
        label="Delete my account"
        hierarchy="primary"
        tone="negative"
        onPress={handleConfirmDelete}
      />

      <Button
        label=""
        hierarchy="secondary"
        shape="circle"
        leadingIcon={Heart}
        accessibilityLabel="Add to favorites"
        onPress={handleFavorite}
      />
      <Button
        disabled
        label="Loading..."
        hierarchy="primary"
        onPress={handleSave}
      />
      <Button
        label="Favorites"
        hierarchy="secondary"
        shape="pill"
        leadingIcon={Heart}
        trailingIcon={ChevronDown}
        onPress={handleOpen}
      />

      <Button
        disabled
        label="Loading..."
        hierarchy="primary"
        onPress={handleSave}
        widthMode="fixed"
      />

      <Button label="Saving..." loading onPress={handleSave} />

      <Button
        label="Filter"
        hierarchy="secondary"
        active={isFilterActive}
        onPress={toggleFilter}
      />
      <Button
        label="Saving..."
        size="large"
        widthMode="fixed"
        loading
        onPress={handleSave}
      />
    </View>
  );
};

export { HelloWave };

HelloWave.whyDidYouRender = true;
