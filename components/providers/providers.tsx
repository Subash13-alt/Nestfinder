// components/providers/Providers.tsx
'use client';

import { AuthProvider } from '@/context/AuthContext';
import { ChatbotProvider } from '@/context/ChatbotContext';
import { ToastProvider } from '@/context/ToastContext';
import { ChatbotWidget } from '@/components/chatbot/ChatbotWidget';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ToastProvider>
        <ChatbotProvider>
          {children}
          <ChatbotWidget />  {/* ← This adds the chat button to every page */}
        </ChatbotProvider>
      </ToastProvider>
    </AuthProvider>
  );
}