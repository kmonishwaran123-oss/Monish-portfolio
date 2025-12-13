import { useState } from 'react';
import { motion } from 'framer-motion';
import { projects, type Project } from '@/data/projects';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';

const filterTags = ['All', 'IT', 'Core'as const];

export function Projects() {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.tags.includes(activeFilter as any));
  
  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="section-title mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A collection of my work spanning web development, embedded systems, mechanical engineering, and CAD design.
          </p>
        </motion.div>
        
        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
          role="tablist"
          aria-label="Filter projects by category"
        >
          {filterTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveFilter(tag)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === tag
                  ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-neon'
                  : 'bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
              role="tab"
              aria-selected={activeFilter === tag}
              aria-controls="projects-grid"
            >
              {tag}
            </button>
          ))}
        </motion.div>
        
        {/* Projects Grid */}
        <div
          id="projects-grid"
          className="grid md:grid-cols-2 gap-6 lg:gap-8"
          role="tabpanel"
          aria-live="polite"
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
        
        {filteredProjects.length === 0 && (
          <p className="text-center text-muted-foreground py-12">
            No projects found in this category.
          </p>
        )}
      </div>
      
      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
