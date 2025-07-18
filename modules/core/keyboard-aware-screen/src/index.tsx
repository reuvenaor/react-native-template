import React from 'react';
import { StyleSheet } from 'react-native';
import {
  KeyboardAwareScrollView,
  type KeyboardAwareScrollViewProps,
} from 'react-native-keyboard-aware-scroll-view';

const KEYBOARD_VERTICAL_OFFSET = 100;

export function KeyboardAwareScreen(props: KeyboardAwareScrollViewProps) {
  return (
    <KeyboardAwareScrollView
      enableOnAndroid={true}
      viewIsInsideTabBar={true}
      pagingEnabled={true}
      extraScrollHeight={KEYBOARD_VERTICAL_OFFSET}
      style={[styles.container, props.style]}
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled
      contentContainerStyle={[
        styles.contentContainer,
        props.contentContainerStyle,
      ]}
      keyboardShouldPersistTaps="handled"
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
});
