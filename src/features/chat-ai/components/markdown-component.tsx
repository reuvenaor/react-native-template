import { Platform } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

interface MarkdownComponentProps {
  text: string;
}

export default function MarkdownComponent({ text }: MarkdownComponentProps) {
  const theme = useTheme();
  const fontSize = Platform.OS === 'ios' ? 16 : 14;
  return (
    <Text
      variant="bodyMedium"
      style={{
        color: theme.colors.onSurface,
        fontSize: fontSize,
        lineHeight: 20,
      }}
    >
      {text}
    </Text>
  );
}
