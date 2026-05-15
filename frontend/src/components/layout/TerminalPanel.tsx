import { useState, useRef, useEffect } from 'react';
import { useWorkspaceStore } from '../../store/workspaceStore';
import { VscTerminal, VscClose } from 'react-icons/vsc';

export const TerminalPanel = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [history, setHistory] = useState<{ type: 'input' | 'output', text: string }[]>([
    { type: 'output', text: 'Welcome to the Portfolio Terminal v1.0.0' },
    { type: 'output', text: 'Type "help" to see available commands.' }
  ]);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  
  const { setActiveTab } = useWorkspaceStore();

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    
    if (trimmed === 'clear') {
      setHistory([]);
      return;
    }

    const newHistory = [...history, { type: 'input', text: cmd } as const];

    switch (trimmed) {
      case 'help':
        newHistory.push({ type: 'output', text: 'Available commands: help, clear, open dashboard, open projects' });
        break;
      case 'open dashboard':
        setActiveTab('dashboard');
        newHistory.push({ type: 'output', text: 'Opening Dashboard...' });
        break;
      case 'open projects':
        // For now just output, real navigation would need opening a specific project tab
        newHistory.push({ type: 'output', text: 'Use the Explorer on the left to open specific projects.' });
        break;
      case '':
        break;
      default:
        newHistory.push({ type: 'output', text: `Command not found: ${cmd}` });
    }
    
    setHistory(newHistory);
  };

  if (!isOpen) return null;

  return (
    <div className="h-48 border-t border-activity-bg bg-sidebar-bg flex flex-col shrink-0">
      <div className="flex items-center justify-between px-4 py-1 text-xs uppercase tracking-wider text-text-secondary border-b border-activity-bg">
        <div className="flex items-center gap-2">
          <VscTerminal />
          <span>Terminal</span>
        </div>
        <VscClose 
          className="cursor-pointer hover:text-text-primary" 
          onClick={() => setIsOpen(false)}
        />
      </div>
      
      <div 
        className="flex-1 overflow-y-auto p-2 font-mono text-xs flex flex-col gap-1"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((line, i) => (
          <div key={i} className="flex gap-2">
            {line.type === 'input' && <span className="text-green-500">➜</span>}
            <span className={line.type === 'output' ? 'text-text-secondary' : 'text-text-primary'}>
              {line.text}
            </span>
          </div>
        ))}
        
        <div className="flex gap-2 mt-1">
          <span className="text-green-500">➜</span>
          <span className="text-blue-400">~/portfolio</span>
          <span className="text-text-primary">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleCommand(input);
                setInput('');
              }
            }}
            className="flex-1 bg-transparent outline-none text-text-primary"
            autoFocus
          />
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  );
};
