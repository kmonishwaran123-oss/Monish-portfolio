import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { Project } from '@/data/projects';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [currentImage, setCurrentImage] = useState(0);
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);
  
  if (!project) return null;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-md z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.16, 0.84, 0.26, 1] }}
            className="fixed inset-4 md:inset-8 lg:inset-16 z-50 glass-card overflow-hidden flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
            
            <div className="flex-1 overflow-y-auto p-6 md:p-8">
              <div className="max-w-4xl mx-auto">
                {/* Image Carousel */}
                <div className="relative aspect-video rounded-xl overflow-hidden mb-6 bg-muted/30">
                  <img
                    src={project.images[currentImage]}
                    alt={`${project.title} screenshot ${currentImage + 1}`}
                    className="w-full h-full object-cover"
                  />
                  
                  {project.images.length > 1 && (
                    <>
                      <button
                        onClick={() => setCurrentImage((prev) => (prev - 1 + project.images.length) % project.images.length)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/70 transition-colors"
                        aria-label="Previous image"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={() => setCurrentImage((prev) => (prev + 1) % project.images.length)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/70 transition-colors"
                        aria-label="Next image"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </>
                  )}
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
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
                <h2 id="modal-title" className="text-3xl md:text-4xl font-bold font-sora mb-4">
                  {project.title}
                </h2>
                
                {/* Description */}
                <p className="text-lg text-muted-foreground mb-8">
                  {project.longDesc}
                </p>
                
                {/* Case Study */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="glass-card p-5">
                    <h3 className="text-sm font-semibold text-primary uppercase tracking-wide mb-2">Challenge</h3>
                    <p className="text-sm text-muted-foreground">{project.challenge}</p>
                  </div>
                  <div className="glass-card p-5">
                    <h3 className="text-sm font-semibold text-secondary uppercase tracking-wide mb-2">Approach</h3>
                    <p className="text-sm text-muted-foreground">{project.approach}</p>
                  </div>
                  <div className="glass-card p-5">
                    <h3 className="text-sm font-semibold text-accent uppercase tracking-wide mb-2">Result</h3>
                    <p className="text-sm text-muted-foreground">{project.result}</p>
                  </div>
                </div>
                
                {/* Tech Stack */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-3">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 text-sm rounded-lg bg-muted/50 text-muted-foreground border border-border"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* CTAs */}
                <div className="flex flex-wrap gap-4">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary inline-flex items-center gap-2"
                    >
                      <ExternalLink size={18} />
                      View Live
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline inline-flex items-center gap-2"
                    >
                      <Github size={18} />
                      View Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
