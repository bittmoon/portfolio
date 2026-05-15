import { useWorkspaceStore } from '../../store/workspaceStore';
import { VscClose, VscDashboard, VscCode, VscBook } from 'react-icons/vsc';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const getIconForType = (type: string) => {
  switch (type) {
    case 'dashboard': return <VscDashboard className="text-[#007acc]" />;
    case 'project': return <VscCode className="text-[#e3c74a]" />;
    case 'case-study': return <VscBook className="text-[#42a5f5]" />;
    default: return <VscCode />;
  }
};

export const TabBar = () => {
  const { tabs, activeTabId, setActiveTab, closeTab } = useWorkspaceStore();

  return (
    <div className="flex bg-tab-inactive overflow-x-auto select-none no-scrollbar">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={twMerge(
            clsx(
              "flex items-center gap-2 px-3 py-2 border-r border-workspace-bg cursor-pointer min-w-fit transition-colors group",
              activeTabId === tab.id 
                ? "bg-workspace-bg text-text-primary border-t-2 border-t-accent" 
                : "bg-tab-inactive text-text-secondary hover:bg-sidebar-bg border-t-2 border-t-transparent"
            )
          )}
        >
          {getIconForType(tab.type)}
          <span className="truncate max-w-[150px]">{tab.title}</span>
          <div 
            onClick={(e) => {
              e.stopPropagation();
              closeTab(tab.id);
            }}
            className={clsx(
              "p-0.5 rounded hover:bg-activity-bg transition-colors",
              activeTabId === tab.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            )}
          >
            <VscClose className="w-4 h-4" />
          </div>
        </div>
      ))}
    </div>
  );
};
