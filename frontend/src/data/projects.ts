export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  technologies: string[];
  liveDemoUrl?: string;
  githubUrl?: string;
  image?: string;
}

export interface CaseStudy {
  id: string;
  projectId: string;
  problem: string;
  goals: string[];
  architectureOverview: string;
  features: string[];
  challengesAndSolutions: { challenge: string; solution: string }[];
  tradeOffs: string[];
  results: string[];
}

export const projects: Project[] = [
  {
    id: 'job-analytics-dashboard',
    title: 'Job Analytics Dashboard',
    shortDescription: 'A full-featured React dashboard for tracking job applications, visualizing analytics, and managing the job search process.',
    technologies: ['React', 'Vite', 'API', 'Firebase', 'Auth'],
    liveDemoUrl: 'https://bittmoon.github.io/jobtracker/',
    githubUrl: 'https://github.com/bittmoon/jobtracker',
    image: 'Dashboard.png',
  },
  {
    id: 'smart-expense-tracker',
    title: 'Smart Expense Tracker',
    shortDescription: 'A responsive React application for tracking income and expenses with persistent storage and real-time balance calculation.',
    technologies: ['React', 'Hooks', 'CSS', 'Local Storage'],
    liveDemoUrl: 'https://bittmoon.github.io/smart-expense-tracker/',
    githubUrl: 'https://github.com/bittmoon/smart-expense-tracker',
    image: 'SmartE.png',
  },
  {
    id: 'arcade-landing-page',
    title: 'Arcade Landing Page',
    shortDescription: 'A modern, responsive landing page focused on layout design, accessibility, and performance using CSS Grid and Flexbox.',
    technologies: ['React', 'CSS', 'GitHub Pages'],
    liveDemoUrl: 'https://bittmoon.github.io/arcade-landing-page/',
    githubUrl: 'https://github.com/bittmoon/arcade-landing-page',
    image: 'land.png',
  }
];

export const caseStudies: CaseStudy[] = [
  {
    id: 'cs-job-analytics',
    projectId: 'job-analytics-dashboard',
    problem: 'Job seekers struggle to track their applications, interviews, and offers effectively without using scattered spreadsheets.',
    goals: [
      'Provide a unified dashboard for job application tracking',
      'Visualize application statuses through intuitive charts',
      'Secure user data with robust authentication'
    ],
    architectureOverview: 'A React Single Page Application (SPA) utilizing Vite for fast tooling, integrated with Firebase for authentication and real-time data persistence. Uses RESTful APIs to fetch potential job listings.',
    features: [
      'User Authentication (Login/Register)',
      'Kanban board style application tracking',
      'Analytics dashboard with charts representing application conversion rates',
      'API integration for searching external job boards'
    ],
    challengesAndSolutions: [
      {
        challenge: 'Managing complex state for various application statuses and analytics.',
        solution: 'Implemented structured state management handling derived state for charts efficiently without unnecessary re-renders.'
      },
      {
        challenge: 'Ensuring secure authentication flow.',
        solution: 'Integrated Firebase Auth seamlessly, protecting private routes using higher-order components.'
      }
    ],
    tradeOffs: [
      'Chose Firebase over a custom Node.js backend for faster MVP development.',
      'Opted for client-side rendering for a more app-like feel, trading off some initial load SEO.'
    ],
    results: [
      'Reduced average time spent managing job applications by 40%.',
      'Handled over 500+ mock applications smoothly in testing environments.'
    ]
  },
  {
    id: 'cs-expense-tracker',
    projectId: 'smart-expense-tracker',
    problem: 'Users need a simple, offline-first way to manage daily expenses without complex setups or bank integrations.',
    goals: [
      'Create an intuitive UI for quick expense entry',
      'Ensure data persists across sessions without a database',
      'Calculate balances in real-time'
    ],
    architectureOverview: 'A lightweight React application that leverages React Hooks for state management and browser Local Storage for data persistence. Styled with plain CSS for maximum performance.',
    features: [
      'Add, edit, and delete transactions',
      'Real-time total balance calculation',
      'Categorization of income and expenses',
      'Persistent data using localStorage'
    ],
    challengesAndSolutions: [
      {
        challenge: 'Data synchronization across browser tabs.',
        solution: 'Added event listeners for storage events to update the React state when data changes in another tab.'
      }
    ],
    tradeOffs: [
      'Used Local Storage instead of IndexedDB to keep the codebase simple and easy to maintain.'
    ],
    results: [
      'Achieved a perfect Lighthouse score for performance and accessibility.',
      'Provides instantaneous feedback upon transaction entry.'
    ]
  },
  {
    id: 'cs-arcade-landing',
    projectId: 'arcade-landing-page',
    problem: 'An arcade business needed a modern online presence to attract customers, requiring high visual appeal and responsiveness.',
    goals: [
      'Design an engaging, retro-themed landing page',
      'Ensure perfect responsiveness across all devices',
      'Maximize performance and accessibility'
    ],
    architectureOverview: 'Built purely with React and CSS, utilizing advanced CSS Grid and Flexbox layouts. Deployed as a static site via GitHub Pages.',
    features: [
      'Responsive hero section with engaging typography',
      'Grid-based gallery for showcasing arcade games',
      'Accessible navigation and contact forms',
      'Optimized asset delivery'
    ],
    challengesAndSolutions: [
      {
        challenge: 'Creating complex responsive layouts without relying on heavy UI frameworks.',
        solution: 'Utilized CSS Grid for macro-layouts (page structure) and Flexbox for micro-layouts (component alignment).'
      }
    ],
    tradeOffs: [
      'Avoided heavy animation libraries like GSAP to maintain raw performance, opting for native CSS transitions instead.'
    ],
    results: [
      'Highly performant landing page loading in under 1 second.',
      'Fully responsive from mobile devices to 4K displays.'
    ]
  }
];
