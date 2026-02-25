import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Sparkles, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// Initialize Gemini API
// Note: In a real production app, you might want to proxy this through a backend to rate limit,
// but for this demo/preview, client-side is acceptable as per instructions.
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_PROMPT = `
You are the AI Assistant for Vocalify, an enterprise AI Voice & WhatsApp Automation platform for Indian businesses.
Your goal is to help visitors understand the product and encourage them to 'Book a Demo'.

Key Product Details:
- **Core Value**: Human-grade AI Voice Agents (sub-500ms latency) and Official WhatsApp Business API automation.
- **Target Audience**: Indian enterprises in EdTech, Fintech, E-commerce, and Healthcare.
- **Voice Features**: 
  - **Multilingual Mastery**: Fluent in **Hindi, Telugu, Tamil, Kannada, Malayalam, Marathi, Bengali**, and English (Indian accent).
  - Handles interruptions naturally. Context-aware.
- **WhatsApp Features**: Green tick verification, interactive flows, broadcasting (90% open rates), Razorpay integration.
- **Pricing**: 
  - Starter: ₹25,000 setup + ₹15,000/yr platform fee. Usage: ₹9/min for voice.
  - Enterprise: Custom pricing, unlimited concurrent calls, dedicated account manager.
  - Meta charges are at actuals (transparent billing).
- **Trust**: Used by 500+ businesses like Razorpay, Zoho, etc.

Guidelines:
- Keep responses concise (under 3 sentences where possible).
- Be professional but approachable.
- Use Indian context (₹ currency, local examples) when relevant.
- If asked about languages, explicitly mention support for Telugu, Hindi, Tamil, Kannada, etc.
- If the user asks a complex technical question you can't answer, suggest booking a demo.
- Always be polite and helpful.
`;

type Message = {
  id: string;
  role: 'user' | 'assistant';
  text: string;
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      text: 'Hi there! 👋 I can help you with pricing, features, or setting up a demo. What would you like to know?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Prepare history for the model
      const history = messages.map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.text }]
      }));

      const chat = ai.chats.create({
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction: SYSTEM_PROMPT,
        },
        history: history,
      });

      const result = await chat.sendMessage({ message: userMessage.text });
      const responseText = result.text;

      if (!responseText) {
        throw new Error("Empty response");
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: responseText
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: "I'm having trouble connecting right now. Please try again or book a demo directly!"
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-[350px] sm:w-[380px] h-[500px] bg-[#12121a] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden ring-1 ring-indigo-500/20"
          >
            {/* Header */}
            <div className="p-4 bg-[#0a0a0f] border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">Vocalify AI</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-zinc-400 text-xs">Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-zinc-400 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0a0a0f]/50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-indigo-600 text-white rounded-tr-none'
                        : 'bg-[#1a1a25] text-zinc-200 border border-white/5 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-[#1a1a25] p-3 rounded-2xl rounded-tl-none border border-white/5">
                    <Loader2 className="w-4 h-4 text-indigo-500 animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-[#0a0a0f] border-t border-white/5">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask about pricing, features..."
                  className="w-full bg-[#1a1a25] text-white text-sm rounded-xl pl-4 pr-10 py-3 border border-white/10 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 placeholder:text-zinc-600"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send size={14} />
                </button>
              </div>
              <div className="text-center mt-2">
                <span className="text-[10px] text-zinc-600">Powered by Gemini AI</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-lg shadow-indigo-500/30 flex items-center justify-center transition-colors ${
          isOpen ? 'bg-[#1a1a25] text-white border border-white/10' : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
        }`}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </motion.button>
    </div>
  );
}
