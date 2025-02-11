/* eslint-disable react-native/no-inline-styles */

/*
    The react-native-safe-area-context library also exports a SafeAreaView component. \
    While it works on Android, it also has the same issues related to jumpy behavior when animating.
    So we recommend always using the useSafeAreaInsets hook instead and avoid using the SafeAreaView component.
*/
import React, { useMemo } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function AppSafeAreaView({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  const insets = useSafeAreaInsets();

  const styles: StyleProp<ViewStyle> = useMemo(
    () => [
      StyleSheet.absoluteFillObject,
      {
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      },
      style,
    ],
    [insets.bottom, insets.left, insets.right, insets.top, style],
  );

  return <View style={styles}>{children}</View>;
}
