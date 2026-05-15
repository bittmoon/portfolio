import { useEffect } from 'react';
import { useWorkspaceStore } from './store/workspaceStore';
import { ActivityBar } from './components/layout/ActivityBar';
import { SidebarPanel } from './components/layout/SidebarPanel';
import { TabBar } from './components/layout/TabBar';
import { MainContent } from './components/layout/MainContent';
import { TerminalPanel } from './components/layout/TerminalPanel';
import { CommandPalette } from './components/CommandPalette';

function App() {
  const { theme } = useWorkspaceStore();

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('theme-light');
    } else {
      document.documentElement.classList.remove('theme-light');
    }
  }, [theme]);

  return (
    <div className="flex h-screen w-full overflow-hidden text-sm">
      <CommandPalette />
      <ActivityBar />
      <SidebarPanel />
      
      <div className="flex flex-col flex-1 min-w-0 bg-workspace-bg">
        <TabBar />
        
        <div className="flex flex-col flex-1 overflow-hidden relative">
          <MainContent />
          <TerminalPanel />
        </div>
      </div>
    </div>
  );
}

export default App;
