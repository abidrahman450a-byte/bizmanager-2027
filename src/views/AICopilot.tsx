import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Send, Bot, User, BarChart } from 'lucide-react';
import { cn } from '../lib/utils';

interface Message {
  id: string;
  role: 'ai' | 'user';
  content: string;
  type?: 'text' | 'report';
}

export function AICopilot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'ai',
      content: 'Good morning, Alexander. I am your Executive AI Copilot. What would you like to analyze today?',
    }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: `Based on real-time data, ${userMsg.content.toLowerCase().includes('revenue') ? 'revenue is trending 12% higher than last week' : 'I am analyzing the latest metrics across all branches.'} Would you like me to generate a detailed executive report on this?`,
        type: userMsg.content.toLowerCase().includes('report') ? 'report' : 'text'
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 1000);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col bg-bg-card border border-white/5 rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
      {/* Header */}
      <div className="p-4 border-b border-white/5 bg-bg-surface/50 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-white font-medium tracking-tight">Executive Copilot</h2>
          <p className="text-xs text-success flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-success inline-block animate-pulse" />
            Online & monitoring business data
          </p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg, idx) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={cn(
              "flex gap-4 max-w-[80%]",
              msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
            )}
          >
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
              msg.role === 'ai' ? "bg-primary text-white" : "bg-white/10 text-white"
            )}>
              {msg.role === 'ai' ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
            </div>
            
            <div className={cn(
              "p-4 rounded-2xl",
              msg.role === 'user' 
                ? "bg-primary text-white rounded-tr-sm" 
                : "bg-bg-surface border border-white/5 text-white rounded-tl-sm"
            )}>
              {msg.type === 'report' ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-primary font-medium">
                    <BarChart className="w-5 h-5" />
                    Generated Executive Report
                  </div>
                  <p className="text-sm">Here is the detailed analysis you requested. North Hills branch requires immediate intervention due to a 5% drop in operating margins.</p>
                  <button className="bg-primary/10 text-primary hover:bg-primary/20 px-4 py-2 rounded-lg text-sm font-medium transition-colors w-full mt-2">
                    View Full PDF Report
                  </button>
                </div>
              ) : (
                <p className="text-sm leading-relaxed">{msg.content}</p>
              )}
            </div>
          </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-white/5 bg-bg-surface/50">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask Copilot to analyze revenue, generate a report, or predict next month..."
            className="flex-1 bg-bg-base border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-text-muted focus:outline-none focus:border-primary/50 transition-colors"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim()}
            className="bg-primary text-white p-3 rounded-xl hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {["What happened today?", "Why did profit increase?", "Generate board report"].map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => setInput(suggestion)}
              className="whitespace-nowrap text-xs text-text-muted bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full border border-white/5 transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
