import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Mic, Send, Bot, User, Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Initialize Gemini API
// We'll initialize this dynamically when needed to ensure we have the latest key
let ai: GoogleGenAI | null = null;

const SYSTEM_INSTRUCTION = `
You are Vocalify AI, an advanced AI voice and chat assistant designed for businesses.
Your goal is to demonstrate your capabilities to potential clients.
You are fluent in English, Hindi, Telugu, Tamil, and Kannada.
You can handle sales inquiries, support tickets, and appointment scheduling.
Be professional, concise, and helpful.
If asked about pricing, mention that setup fees and annual platform fees are currently being finalized and will be customized based on business requirements.
Emphasize your sub-500ms latency and human-like interaction.
`;

// Helper to get or initialize the AI instance
const getAI = async () => {
  if (ai) return ai;
  
  // Check if we have a key in env first (dev mode)
  let apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
  
  // If not, check if the user has selected one via the platform UI
  if (!apiKey && window.aistudio && window.aistudio.hasSelectedApiKey) {
    const hasKey = await window.aistudio.hasSelectedApiKey();
    if (!hasKey && window.aistudio.openSelectKey) {
      await window.aistudio.openSelectKey();
      // After selection, the key should be available in process.env.API_KEY 
      // (though in a real app we might need a reload or a callback, 
      // here we assume the platform handles the injection or we retry)
      apiKey = process.env.API_KEY; 
    }
  }

  if (!apiKey) {
    throw new Error("API Key not found. Please select an API key to continue.");
  }

  ai = new GoogleGenAI({ apiKey });
  return ai;
};

export default function ProductDemo() {
  const [activeTab, setActiveTab] = useState<'voice' | 'chat'>('voice');
  const [apiKeyError, setApiKeyError] = useState<string | null>(null);

  useEffect(() => {
    // Check for API key on mount
    getAI().catch(err => {
      console.error(err);
      setApiKeyError(err.message);
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white selection:bg-indigo-500/30 flex flex-col relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      
      <Navbar />
      <main className="flex-grow pt-24 pb-12 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Experience Vocalify AI</h1>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Interact with our advanced AI agents in real-time. Choose between our Voice Agent or Chat Assistant to see how we can transform your customer engagement.
            </p>
            {apiKeyError && (
              <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg inline-block text-red-400">
                {apiKeyError} <br/>
                <button 
                  onClick={() => window.aistudio?.openSelectKey?.()}
                  className="underline hover:text-red-300 mt-2"
                >
                  Select API Key
                </button>
              </div>
            )}
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-12">
            <div className="bg-white/5 p-1 rounded-full border border-white/10 flex">
              <button
                onClick={() => setActiveTab('voice')}
                className={`px-8 py-3 rounded-full text-sm font-medium transition-all ${
                  activeTab === 'voice'
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Voice Agent Demo
              </button>
              <button
                onClick={() => setActiveTab('chat')}
                className={`px-8 py-3 rounded-full text-sm font-medium transition-all ${
                  activeTab === 'chat'
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Chat Assistant Demo
              </button>
            </div>
          </div>

          {/* Demo Container */}
          <div className="bg-black/40 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-sm min-h-[600px] relative">
            {activeTab === 'voice' ? <VoiceDemo /> : <ChatDemo />}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function VoiceDemo() {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const recognitionRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-IN'; // Better for Indian accents

      recognitionRef.current.onresult = async (event: any) => {
        const text = event.results[0][0].transcript;
        setTranscript(text);
        setIsListening(false);
        await processAIResponse(text);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    } else {
      console.warn("Speech recognition not supported in this browser.");
    }
  }, []);

  const processAIResponse = async (text: string) => {
    try {
      const aiInstance = await getAI();
      const response = await aiInstance.models.generateContent({
        model: "gemini-2.5-flash",
        contents: text,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        }
      });
      const aiResponse = response.text;
      if (aiResponse) {
        setResponse(aiResponse);
        speak(aiResponse);
      }
    } catch (error) {
      console.error("Error generating AI response:", error);
      setResponse("I'm sorry, I encountered an error. Please check your API key.");
    }
  };

  const speak = async (text: string) => {
    try {
      setIsSpeaking(true);
      
      // Call our backend endpoint which securely holds the ElevenLabs API key
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });

      if (!response.ok) {
        throw new Error("Failed to fetch audio from ElevenLabs");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audioRef.current = audio;
      
      audio.onended = () => {
        setIsSpeaking(false);
        URL.revokeObjectURL(url);
        audioRef.current = null;
      };
      
      audio.onerror = () => {
        setIsSpeaking(false);
        URL.revokeObjectURL(url);
        audioRef.current = null;
      };

      await audio.play();
    } catch (error) {
      console.error("TTS Error:", error);
      
      // Fallback to browser's built-in speech synthesis if ElevenLabs fails or isn't configured
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = (e) => {
          console.error("Speech synthesis error", e);
          setIsSpeaking(false);
        };
        window.speechSynthesis.speak(utterance);
      } else {
        setIsSpeaking(false);
      }
    }
  };

  const toggleListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Speech recognition is only supported in Chrome/Edge.");
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      setTranscript('');
      setResponse('');
      
      // Stop speaking if currently speaking
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      
      try {
        recognitionRef.current?.start();
        setIsListening(true);
      } catch (e) {
        console.error("Error starting recognition:", e);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-12 text-center">
      <div className="relative mb-12">
        {/* Visualizer Circle */}
        <div className={`w-48 h-48 rounded-full border-4 flex items-center justify-center transition-all duration-300 ${
          isSpeaking 
            ? 'border-indigo-500 shadow-[0_0_50px_rgba(99,102,241,0.5)] scale-110' 
            : isListening 
              ? 'border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.3)] animate-pulse' 
              : 'border-zinc-700'
        }`}>
          <div className={`w-40 h-40 rounded-full bg-gradient-to-br transition-all duration-500 ${
            isSpeaking ? 'from-indigo-600 to-purple-600' : 'from-zinc-800 to-zinc-900'
          } flex items-center justify-center`}>
            {isSpeaking ? (
              <Volume2 size={64} className="text-white animate-pulse" />
            ) : (
              <Mic size={64} className={`transition-colors ${isListening ? 'text-red-500' : 'text-zinc-500'}`} />
            )}
          </div>
        </div>
        
        {/* Orbiting Particles */}
        {isSpeaking && (
          <>
            <div className="absolute inset-0 rounded-full border border-indigo-500/30 animate-[spin_3s_linear_infinite]" />
            <div className="absolute inset-[-20px] rounded-full border border-purple-500/20 animate-[spin_5s_linear_infinite_reverse]" />
          </>
        )}
      </div>

      <div className="space-y-6 max-w-2xl w-full">
        <div className="min-h-[80px]">
          {transcript && (
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-zinc-400 text-lg"
            >
              " {transcript} "
            </motion.p>
          )}
        </div>
        
        <div className="min-h-[100px]">
          {response && (
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-white text-xl font-medium leading-relaxed"
            >
              {response}
            </motion.p>
          )}
        </div>
      </div>

      <button
        onClick={toggleListening}
        className={`mt-12 px-8 py-4 rounded-full font-bold text-lg flex items-center gap-3 transition-all ${
          isListening 
            ? 'bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/30' 
            : 'bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/30'
        }`}
      >
        {isListening ? (
          <>
            <span className="w-3 h-3 bg-white rounded-full animate-pulse" />
            Listening...
          </>
        ) : (
          <>
            <Mic size={24} />
            Start Talking
          </>
        )}
      </button>
      
      <p className="mt-6 text-zinc-500 text-sm">
        Click to speak. Allow microphone access when prompted.
      </p>
    </div>
  );
}

function ChatDemo() {
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: "Hello! I'm Vocalify's AI assistant. How can I help you scale your business today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const aiInstance = await getAI();
      
      // Construct history for context
      // Note: The SDK's chat history format is specific. 
      // We'll use a new chat session for simplicity in this demo, 
      // or we could maintain the chat object state.
      // For this simple demo, we'll just send the message with the system instruction.
      
      const chat = aiInstance.chats.create({
        model: "gemini-2.5-flash",
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        },
        history: messages.slice(1).map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.text }]
        }))
      });

      const result = await chat.sendMessage({ message: userMessage });
      const response = result.text;

      if (response) {
        setMessages(prev => [...prev, { role: 'ai', text: response }]);
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'ai', text: "I'm having trouble connecting right now. Please check your API key." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px]">
      {/* Chat Header */}
      <div className="bg-zinc-900/50 p-4 border-b border-white/10 flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
          <Bot size={24} className="text-white" />
        </div>
        <div>
          <h3 className="font-bold text-white">Vocalify Assistant</h3>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs text-zinc-400">Online</span>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-grow overflow-y-auto p-6 space-y-4 custom-scrollbar bg-[#0b141a] relative">
        <div className="absolute inset-0 opacity-5 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat pointer-events-none"></div>
        
        {messages.map((msg, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} relative z-10`}
          >
            <div className={`max-w-[80%] p-3 rounded-lg shadow-sm ${
              msg.role === 'user' 
                ? 'bg-[#005c4b] text-white rounded-tr-none' 
                : 'bg-[#202c33] text-white rounded-tl-none'
            }`}>
              <div className="text-sm leading-relaxed">{msg.text}</div>
              <div className="text-[10px] text-zinc-400 text-right mt-1 flex items-center justify-end gap-1">
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                {msg.role === 'user' && <span className="text-blue-400">✓✓</span>}
              </div>
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-zinc-800 p-4 rounded-2xl rounded-tl-none border border-white/5 flex gap-2">
              <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" />
              <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-zinc-900/50 border-t border-white/10">
        <div className="flex gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-grow bg-zinc-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-xl transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
