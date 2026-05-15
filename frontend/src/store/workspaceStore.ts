import { create } from 'zustand';
import type { Project, CaseStudy } from '../data/projects';

export type TabType = 'project' | 'case-study' | 'dashboard' | 'chat' | 'about';

export interface Tab {
  id: string;
  title: string;
  type: TabType;
  data?: Project | CaseStudy | any;
}

interface WorkspaceState {
  tabs: Tab[];
  activeTabId: string | null;
  activeSidebar: string | null;
  theme: 'dark' | 'light';
  
  // Actions
  openTab: (tab: Tab) => void;
  closeTab: (id: string) => void;
  setActiveTab: (id: string) => void;
  setActiveSidebar: (id: string | null) => void;
  toggleTheme: () => void;
}

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  tabs: [
    { id: 'dashboard', title: 'Dashboard', type: 'dashboard' }
  ],
  activeTabId: 'dashboard',
  activeSidebar: 'explorer',
  theme: 'dark',

  openTab: (newTab) => set((state) => {
    const existingTab = state.tabs.find(t => t.id === newTab.id);
    if (existingTab) {
      return { activeTabId: existingTab.id };
    }
    return {
      tabs: [...state.tabs, newTab],
      activeTabId: newTab.id,
    };
  }),

  closeTab: (id) => set((state) => {
    const newTabs = state.tabs.filter(t => t.id !== id);
    let newActiveId = state.activeTabId;
    if (state.activeTabId === id) {
      // If closing active tab, focus the previous one, or null
      const closedIndex = state.tabs.findIndex(t => t.id === id);
      if (newTabs.length > 0) {
        newActiveId = newTabs[Math.max(0, closedIndex - 1)].id;
      } else {
        newActiveId = null;
      }
    }
    return { tabs: newTabs, activeTabId: newActiveId };
  }),

  setActiveTab: (id) => set({ activeTabId: id }),
  
  setActiveSidebar: (id) => set({ activeSidebar: id }),

  toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
}));
