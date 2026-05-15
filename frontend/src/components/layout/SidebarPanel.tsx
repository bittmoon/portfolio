import { useWorkspaceStore } from '../../store/workspaceStore';
import { Explorer } from '../features/Explorer';
import { ChatPanel } from '../features/ChatPanel';
import { SearchPanel } from '../features/SearchPanel';
import { motion, AnimatePresence } from 'framer-motion';

export const SidebarPanel = () => {
  const { activeSidebar } = useWorkspaceStore();

  return (
    <AnimatePresence>
      {activeSidebar && (
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 250, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="h-full bg-sidebar-bg border-r border-activity-bg flex flex-col shrink-0 overflow-hidden"
        >
          <div className="p-4 text-xs tracking-wider uppercase text-text-secondary font-semibold">
            {activeSidebar === 'explorer' && 'Explorer'}
            {activeSidebar === 'chat' && 'AI Assistant'}
            {activeSidebar === 'search' && 'Search'}
            {activeSidebar === 'about' && 'About'}
            {activeSidebar === 'settings' && 'Settings'}
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {activeSidebar === 'explorer' && <Explorer />}
            {activeSidebar === 'chat' && <ChatPanel />}
            {activeSidebar === 'search' && <SearchPanel />}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
