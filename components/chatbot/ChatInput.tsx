'use client';

import { useState, KeyboardEvent } from 'react';
import { Send } from 'lucide-react';

interface Props {
  onSend: (message: string) => void;
  isLoading: boolean;
}

const suggestedQuestions = [
  "How to book a property?",
  "What documents are needed?",
  "Cancellation policy?",
  "Home loan options?",
];

export function ChatInput({ onSend, isLoading }: Props) {
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    if (input.trim() && !isLoading) {
      onSend(input.trim());
      setInput('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSuggestionClick = (question: string) => {
    if (!isLoading) {
      onSend(question);
    }
  };

  return (
    <div className="p-4 border-t bg-white rounded-b-xl">
      {/* Suggested Questions */}
      <div className="flex flex-wrap gap-2 mb-3">
        {suggestedQuestions.map((question, idx) => (
          <button
            key={idx}
            onClick={() => handleSuggestionClick(question)}
            disabled={isLoading}
            className="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full hover:bg-gray-200 transition disabled:opacity-50"
          >
            {question}
          </button>
        ))}
      </div>
      
      {/* Input Area */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask me anything..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          disabled={isLoading}
        />
        <button
          onClick={handleSubmit}
          disabled={!input.trim() || isLoading}
          className="bg-accent text-white p-2 rounded-lg hover:bg-accent-strong disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}