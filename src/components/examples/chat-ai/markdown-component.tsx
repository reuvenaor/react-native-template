import { Platform, Text } from 'react-native';
import { ColorPalette } from './types';

interface MarkdownComponentProps {
  text: string;
}

export default function MarkdownComponent({ text }: MarkdownComponentProps) {
  const fontSize = Platform.OS === 'ios' ? 16 : 14;
  return (
    <Text
      style={{
        color: ColorPalette.primary,
        fontFamily: 'regular',
        lineHeight: 19.6,
        fontSize: fontSize,
        alignSelf: 'flex-start',
        marginTop: 0,
        marginBottom: 0,
      }}
    >
      {text}
    </Text>
  );
}
