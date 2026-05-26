'use client';

import { ChatMessage as ChatMessageType } from '@/types/chatbot';
import { User, Bot } from 'lucide-react';

interface Props {
  message: ChatMessageType;
}

export function ChatMessage({ message }: Props) {
  const isUser = message.isUser;
  
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-nest-rise`}>
      {!isUser && (
        <div className="flex-shrink-0 mr-2">
          <div className="w-8 h-8 bg-gradient-to-r from-accent to-accent-strong rounded-full flex items-center justify-center">
            <Bot size={16} className="text-white" />
          </div>
        </div>
      )}
      
      <div className={`max-w-[75%] ${isUser ? 'order-1' : 'order-2'}`}>
        <div
          className={`rounded-lg px-4 py-2 ${
            isUser
              ? 'bg-accent text-white rounded-br-none'
              : 'bg-white border border-gray-200 text-gray-700 rounded-bl-none shadow-sm'
          }`}
        >
          <p className="text-sm whitespace-pre-wrap">{message.text}</p>
        </div>
        <p className={`text-xs mt-1 ${isUser ? 'text-gray-400 text-right' : 'text-gray-400'}`}>
          {formatTime(message.timestamp)}
        </p>
      </div>
      
      {isUser && (
        <div className="flex-shrink-0 ml-2 order-2">
          <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
            <User size={16} className="text-white" />
          </div>
        </div>
      )}
    </div>
  );
}