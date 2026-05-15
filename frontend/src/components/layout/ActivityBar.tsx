import { VscFiles, VscSearch, VscCommentDiscussion, VscSettingsGear, VscAccount, VscColorMode } from 'react-icons/vsc';
import { useWorkspaceStore } from '../../store/workspaceStore';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const ActivityIcon = ({ icon: Icon, isActive, onClick, title }: any) => {
  return (
    <div 
      className={twMerge(
        clsx(
          "w-full aspect-square flex items-center justify-center cursor-pointer text-text-secondary hover:text-text-primary transition-colors relative group",
          isActive && "text-text-primary"
        )
      )}
      onClick={onClick}
      title={title}
    >
      {isActive && (
        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-accent" />
      )}
      <Icon className="w-6 h-6" />
    </div>
  );
};

export const ActivityBar = () => {
  const { activeSidebar, setActiveSidebar, theme, toggleTheme } = useWorkspaceStore();

  const handleIconClick = (id: string) => {
    if (activeSidebar === id) {
      setActiveSidebar(null);
    } else {
      setActiveSidebar(id);
    }
  };

  return (
    <div className="w-12 h-full bg-activity-bg flex flex-col justify-between shrink-0 z-20">
      <div className="flex flex-col items-center pt-2 gap-2">
        <ActivityIcon 
          icon={VscFiles} 
          isActive={activeSidebar === 'explorer'} 
          onClick={() => handleIconClick('explorer')}
          title="Explorer"
        />
        <ActivityIcon 
          icon={VscSearch} 
          isActive={activeSidebar === 'search'} 
          onClick={() => handleIconClick('search')}
          title="Search"
        />
        <ActivityIcon 
          icon={VscCommentDiscussion} 
          isActive={activeSidebar === 'chat'} 
          onClick={() => handleIconClick('chat')}
          title="AI Assistant"
        />
      </div>
      
      <div className="flex flex-col items-center pb-4 gap-2">
        <ActivityIcon 
          icon={VscColorMode} 
          isActive={false} 
          onClick={toggleTheme}
          title={`Toggle Theme (${theme === 'dark' ? 'Light' : 'Dark'})`}
        />
        <ActivityIcon 
          icon={VscAccount} 
          isActive={activeSidebar === 'about'} 
          onClick={() => handleIconClick('about')}
          title="About Me"
        />
        <ActivityIcon 
          icon={VscSettingsGear} 
          isActive={activeSidebar === 'settings'} 
          onClick={() => handleIconClick('settings')}
          title="Settings"
        />
      </div>
    </div>
  );
};
