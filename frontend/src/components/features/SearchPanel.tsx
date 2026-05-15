import { useState } from 'react';
import { useWorkspaceStore } from '../../store/workspaceStore';
import { projects, caseStudies } from '../../data/projects';
import { VscSearch, VscFileCode, VscMarkdown } from 'react-icons/vsc';

export const SearchPanel = () => {
  const [query, setQuery] = useState('');
  const { openTab } = useWorkspaceStore();

  const searchResults = () => {
    if (!query.trim()) return [];
    
    const q = query.toLowerCase();
    
    const projectResults = projects.filter(p => 
      p.title.toLowerCase().includes(q) || 
      p.shortDescription.toLowerCase().includes(q) ||
      p.technologies.some(t => t.toLowerCase().includes(q))
    ).map(p => ({ ...p, resultType: 'project' as const }));

    const caseStudyResults = caseStudies.filter(cs => 
      cs.problem.toLowerCase().includes(q) ||
      cs.architectureOverview.toLowerCase().includes(q) ||
      projects.find(p => p.id === cs.projectId)?.title.toLowerCase().includes(q)
    ).map(cs => ({ ...cs, resultType: 'case-study' as const, title: `Case Study: ${projects.find(p => p.id === cs.projectId)?.title}` }));

    return [...projectResults, ...caseStudyResults];
  };

  const results = searchResults();

  return (
    <div className="flex flex-col h-full bg-sidebar-bg font-sans">
      <div className="p-4 border-b border-activity-bg">
        <div className="flex items-center gap-2 bg-workspace-bg p-2 rounded border border-transparent focus-within:border-accent">
          <input 
            type="text"
            className="flex-1 bg-transparent outline-none text-text-primary text-sm"
            placeholder="Search projects or skills..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2">
        {query && results.length === 0 && (
          <div className="p-2 text-text-secondary text-xs">No results found for '{query}'.</div>
        )}
        
        {results.map((result: any, i) => (
          <div 
            key={i}
            className="flex items-start gap-2 p-2 hover:bg-element-bg cursor-pointer rounded"
            onClick={() => {
              openTab({ 
                id: result.id, 
                title: result.title, 
                type: result.resultType, 
                data: result 
              });
            }}
          >
            {result.resultType === 'project' ? (
              <VscFileCode className="w-4 h-4 mt-0.5 text-[#e3c74a] shrink-0" />
            ) : (
              <VscMarkdown className="w-4 h-4 mt-0.5 text-[#42a5f5] shrink-0" />
            )}
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm text-text-primary truncate">{result.title}</span>
              <span className="text-xs text-text-secondary truncate">
                {result.resultType === 'project' ? result.shortDescription : result.problem}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
