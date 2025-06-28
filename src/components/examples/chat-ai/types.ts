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