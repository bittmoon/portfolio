import { useState, useRef, useEffect } from 'react';
import { VscSend } from 'react-icons/vsc';
import { projects } from '../../data/projects';

// Simple inline markdown renderer (bold, bullets, newlines)
function renderMarkdown(text: string) {
  // Split by newlines and process each line
  return text.split('\n').map((line, i) => {
    // Process bold markers **text**
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    const rendered = parts.map((part, j) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={j}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });

    // Bullet point lines
    if (line.trimStart().startsWith('•') || line.trimStart().startsWith('-')) {
      return <div key={i} style={{ paddingLeft: '0.5rem' }}>{rendered}</div>;
    }

    return <span key={i}>{rendered}{i < text.split('\n').length - 1 && <br />}</span>;
  });
}

export const ChatPanel = () => {
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', text: string}[]>([
    { role: 'assistant', text: 'Hi! I am the portfolio assistant. Ask me anything about the developer\'s skills or projects.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsLoading(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, context: projects }),
      });
      
      const data = await response.json();
      
      if (data.reply) {
        setMessages(prev => [...prev, { role: 'assistant', text: data.reply }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', text: 'Sorry, I encountered an error.' }]);
      }
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'assistant', text: 'Could not connect to the assistant server.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-sidebar-bg">
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 text-sm">
        {messages.map((msg, i) => (
          <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            <span className="text-xs text-text-secondary mb-1">
              {msg.role === 'user' ? 'You' : 'Assistant'}
            </span>
            <div className={`p-3 rounded-lg max-w-[90%] ${
              msg.role === 'user' 
                ? 'bg-accent text-white rounded-br-none' 
                : 'bg-element-bg text-text-primary rounded-bl-none'
            }`}>
              {msg.role === 'assistant' ? renderMarkdown(msg.text) : msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex flex-col items-start">
            <span className="text-xs text-text-secondary mb-1">Assistant</span>
            <div className="p-3 rounded-lg bg-element-bg text-text-primary rounded-bl-none">
              <span className="animate-pulse">Thinking...</span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      
      <div className="p-4 border-t border-activity-bg">
        <div className="flex items-center gap-2 bg-workspace-bg p-2 rounded border border-transparent focus-within:border-accent">
          <input 
            type="text"
            className="flex-1 bg-transparent outline-none text-text-primary text-sm"
            placeholder="Ask a question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button 
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            className="p-1 text-text-secondary hover:text-accent disabled:opacity-50"
          >
            <VscSend />
          </button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {['What are your strongest skills?', 'Explain the job tracker project'].map((suggestion, i) => (
            <button
              key={i}
              onClick={() => setInput(suggestion)}
              className="text-xs px-2 py-1 bg-element-bg text-text-primary rounded hover:bg-element-hover"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
