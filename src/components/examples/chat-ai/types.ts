export type SenderType = 'user' | 'assistant';

export interface MessageType {
    role: SenderType;
    content: string;
}

export interface MessageItemProps {
    message: MessageType;
}

export interface MessagesComponentProps {
    chatHistory: Array<MessageType>;
    llmResponse: string;
    isGenerating: boolean;
}

export const ColorPalette = {
    primary: '#000000',
    seaBlueLight: '#007AFF',
    seaBlueMedium: '#0056B3',
    seaBlueDark: '#004080',
};