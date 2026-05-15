import type { Project } from '../../data/projects';
import { VscGithubInverted, VscLinkExternal } from 'react-icons/vsc';

export const ProjectView = ({ project }: { project: Project }) => {
  return (
    <div className="p-8 max-w-4xl mx-auto font-sans">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-text-primary mb-4">{project.title}</h1>
        <p className="text-lg text-text-secondary leading-relaxed">{project.shortDescription}</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {project.technologies.map((tech, i) => (
          <span key={i} className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium border border-accent/20">
            {tech}
          </span>
        ))}
      </div>

      <div className="flex gap-4 mb-12">
        {project.liveDemoUrl && (
          <a 
            href={project.liveDemoUrl} 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-2 bg-accent hover:bg-accent/80 text-white px-6 py-2 rounded transition-colors"
          >
            <VscLinkExternal /> Live Demo
          </a>
        )}
        {project.githubUrl && (
          <a 
            href={project.githubUrl} 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-2 bg-element-bg hover:bg-element-hover text-text-primary px-6 py-2 rounded transition-colors"
          >
            <VscGithubInverted /> GitHub
          </a>
        )}
      </div>

      <div className="aspect-video w-full bg-sidebar-bg rounded-xl flex items-center justify-center border border-activity-bg overflow-hidden relative group">
        {project.image ? (
          <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        ) : (
          <div className="text-text-secondary flex flex-col items-center">
            <VscLinkExternal className="w-12 h-12 mb-4 opacity-50" />
            <p>Project Preview Image</p>
          </div>
        )}
      </div>
    </div>
  );
};
