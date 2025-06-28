import { Platform } from 'react-native';
import { Text } from 'react-native-paper';
import { ColorPalette } from './types';

interface MarkdownComponentProps {
  text: string;
}

export default function MarkdownComponent({ text }: MarkdownComponentProps) {
  const fontSize = Platform.OS === 'ios' ? 16 : 14;
  return (
    <Text
      variant="bodyMedium"
      style={{
        color: ColorPalette.primary,
        fontSize: fontSize,
        lineHeight: 20,
      }}
    >
      {text}
    </Text>
  );
}
