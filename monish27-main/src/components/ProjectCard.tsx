import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { useTilt } from '@/hooks/useTilt';
import type { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: () => void;
}

export function ProjectCard({ project, index, onClick }: ProjectCardProps) {
  const cardRef = useTilt<HTMLDivElement>({ maxTilt: 6, scale: 1.02 });
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.16, 0.84, 0.26, 1]
      }}
      onClick={onClick}
      className="group relative glass-card p-6 cursor-pointer overflow-hidden"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      aria-label={`View project: ${project.title}`}
    >
      {/* Sheen Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>
      
      {/* Glow Border on Hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border border-primary/50 neon-glow" />
      
      {/* Project Image */}
      <div className="relative aspect-video rounded-xl overflow-hidden mb-4 bg-muted/30">
        <img
          src={project.images[0]}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
      </div>
      
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-3">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className={tag === 'Core' || tag === 'CAD' ? 'tag-chip-core' : 'tag-chip'}
          >
            {tag}
          </span>
        ))}
      </div>
      
      {/* Title */}
      <h3 className="text-xl font-semibold font-sora text-foreground mb-2 group-hover:gradient-text transition-all duration-300">
        {project.title}
      </h3>
      
      {/* Description */}
      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
        {project.shortDesc}
      </p>
      
      {/* Tech Stack Preview */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.tech.slice(0, 4).map((tech) => (
          <span
            key={tech}
            className="text-xs px-2 py-0.5 rounded-full bg-muted/50 text-muted-foreground"
          >
            {tech}
          </span>
        ))}
        {project.tech.length > 4 && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-muted/50 text-muted-foreground">
            +{project.tech.length - 4}
          </span>
        )}
      </div>
      
      {/* Actions */}
      <div className="flex gap-3">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-primary hover:text-primary-glow transition-colors"
            onClick={(e) => e.stopPropagation()}
            aria-label={`View live demo of ${project.title}`}
          >
            <ExternalLink size={14} />
            View
          </a>
        )}
        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            onClick={(e) => e.stopPropagation()}
            aria-label={`View source code of ${project.title} on GitHub`}
          >
            <Github size={14} />
            GitHub
          </a>
        )}
      </div>
    </motion.div>
  );
}
