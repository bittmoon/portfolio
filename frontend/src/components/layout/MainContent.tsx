import { useWorkspaceStore } from '../../store/workspaceStore';
import { Dashboard } from '../features/Dashboard';
import { ProjectView } from '../features/ProjectView';
import { CaseStudyView } from '../features/CaseStudyView';
import { AnimatePresence, motion } from 'framer-motion';

export const MainContent = () => {
  const { tabs, activeTabId } = useWorkspaceStore();
  const activeTab = tabs.find(t => t.id === activeTabId);

  return (
    <div className="flex-1 overflow-y-auto relative bg-workspace-bg">
      <AnimatePresence mode="wait">
        {activeTab ? (
          <motion.div
            key={activeTab.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {activeTab.type === 'dashboard' && <Dashboard />}
            {activeTab.type === 'project' && <ProjectView project={activeTab.data} />}
            {activeTab.type === 'case-study' && <CaseStudyView caseStudy={activeTab.data} />}
          </motion.div>
        ) : (
          <div className="flex items-center justify-center h-full text-text-secondary text-lg">
            <div className="flex flex-col items-center opacity-50">
              <span className="text-4xl mb-4">VS Code Style Portfolio</span>
              <span>Select a file from the explorer to open</span>
              <div className="mt-8 flex gap-4 text-sm">
                <span>Show All Commands</span>
                <kbd className="bg-[#333] px-2 py-1 rounded">Ctrl+K</kbd>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
