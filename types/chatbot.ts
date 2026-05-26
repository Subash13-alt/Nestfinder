// types/chatbot.ts

export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  suggestedQuestions?: string[];
}

export interface ChatbotResponse {
  response: string;
  suggestedQuestions?: string[];
  confidence?: 'high' | 'medium' | 'low';
}

export interface ChatbotContextType {
  messages: ChatMessage[];
  isOpen: boolean;
  isLoading: boolean;
  sendMessage: (message: string) => Promise<void>;
  toggleChat: () => void;
  clearMessages: () => void;
}