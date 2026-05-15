import { useState } from 'react';
import { useWorkspaceStore } from '../../store/workspaceStore';
import { projects, caseStudies } from '../../data/projects';
import { VscChevronRight, VscChevronDown, VscFolder, VscFileCode, VscMarkdown } from 'react-icons/vsc';

const TreeItem = ({ name, icon: Icon, onClick, depth = 0, isFolder, isOpen }: any) => {
  return (
    <div 
      className="flex items-center gap-1.5 px-2 py-1 hover:bg-element-bg cursor-pointer text-text-secondary hover:text-text-primary select-none"
      style={{ paddingLeft: `${depth * 12 + 8}px` }}
      onClick={onClick}
    >
      {isFolder ? (
        isOpen ? <VscChevronDown className="w-4 h-4 shrink-0" /> : <VscChevronRight className="w-4 h-4 shrink-0" />
      ) : (
        <div className="w-4 h-4 shrink-0" /> // spacer
      )}
      <Icon className={`w-4 h-4 shrink-0 ${isFolder ? 'text-[#e8a342]' : 'text-[#42a5f5]'}`} />
      <span className="truncate">{name}</span>
    </div>
  );
};

export const Explorer = () => {
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({
    portfolio: true,
    projects: true,
    caseStudies: false,
  });
  
  const { openTab } = useWorkspaceStore();

  const toggleFolder = (id: string) => {
    setOpenFolders(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="py-2 text-sm font-sans">
      <TreeItem 
        name="PORTFOLIO" 
        icon={VscFolder} 
        isOpen={openFolders['portfolio']} 
        isFolder 
        onClick={() => toggleFolder('portfolio')} 
      />
      
      {openFolders['portfolio'] && (
        <>
          <TreeItem 
            name="projects" 
            icon={VscFolder} 
            depth={1} 
            isOpen={openFolders['projects']} 
            isFolder 
            onClick={() => toggleFolder('projects')} 
          />
          {openFolders['projects'] && projects.map(p => (
            <TreeItem 
              key={p.id}
              name={`${p.id}.tsx`}
              icon={VscFileCode}
              depth={2}
              onClick={() => openTab({ id: p.id, title: p.title, type: 'project', data: p })}
            />
          ))}

          <TreeItem 
            name="case-studies" 
            icon={VscFolder} 
            depth={1} 
            isOpen={openFolders['caseStudies']} 
            isFolder 
            onClick={() => toggleFolder('caseStudies')} 
          />
          {openFolders['caseStudies'] && caseStudies.map(cs => (
            <TreeItem 
              key={cs.id}
              name={`${cs.id}.md`}
              icon={VscMarkdown}
              depth={2}
              onClick={() => openTab({ id: cs.id, title: `CS: ${projects.find(p=>p.id === cs.projectId)?.title}`, type: 'case-study', data: cs })}
            />
          ))}
        </>
      )}
    </div>
  );
};
