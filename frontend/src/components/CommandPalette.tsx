import { useState, useEffect } from 'react';
import { useWorkspaceStore } from '../store/workspaceStore';
import { projects, caseStudies } from '../data/projects';
import { VscSearch } from 'react-icons/vsc';

export const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const { openTab } = useWorkspaceStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isOpen) return null;

  const items = [
    { title: 'Dashboard', type: 'dashboard', id: 'dashboard' },
    ...projects.map(p => ({ title: `Project: ${p.title}`, type: 'project', id: p.id, data: p })),
    ...caseStudies.map(cs => ({ title: `Case Study: ${projects.find(p=>p.id === cs.projectId)?.title}`, type: 'case-study', id: cs.id, data: cs }))
  ];

  const filtered = items.filter(item => item.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] bg-black/50">
      <div className="w-[500px] bg-sidebar-bg rounded shadow-2xl border border-activity-bg overflow-hidden flex flex-col">
        <div className="flex items-center px-4 border-b border-activity-bg">
          <VscSearch className="text-text-secondary w-5 h-5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects, case studies, or commands..."
            className="w-full bg-transparent p-3 outline-none text-text-primary text-sm"
            autoFocus
          />
        </div>
        
        <div className="max-h-[300px] overflow-y-auto py-2">
          {filtered.length === 0 && (
            <div className="px-4 py-2 text-text-secondary text-sm">No results found.</div>
          )}
          {filtered.map((item, idx) => (
            <div
              key={idx}
              className="px-4 py-2 hover:bg-accent hover:text-white cursor-pointer text-sm text-text-primary flex items-center"
              onClick={() => {
                openTab({ id: item.id, title: item.title, type: item.type as any, data: item.data });
                setIsOpen(false);
                setSearch('');
              }}
            >
              {item.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
