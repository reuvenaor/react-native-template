import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { useTheme } from 'react-native-paper';

// Define header styles based on theme
export const usesScreenOptions = () => {
  const theme = useTheme();
  return {
    headerShown: true,
    headerBackVisible: false,
    orientation: 'portrait' as const,
    headerStyle: {
      backgroundColor: theme.colors.surfaceVariant,
    },
    headerTintColor: theme.colors.onSurfaceVariant,
    headerTitleStyle: {
      fontWeight: '600' as const,
    },
    contentStyle: {
      backgroundColor: theme.colors.background,
    },
  } as NativeStackNavigationOptions;
};
