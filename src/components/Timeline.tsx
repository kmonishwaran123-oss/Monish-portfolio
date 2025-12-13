import { motion } from 'framer-motion';
import { timeline, certifications, events } from '@/data/projects';
import { Award, Calendar, Download } from 'lucide-react';

export function Timeline() {
  return (
    <section id="timeline" className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title mb-4">
            Journey & <span className="gradient-text">Achievements</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My path through education, work, and accomplishments.
          </p>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Career Timeline */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-bold font-sora mb-8 flex items-center gap-3"
            >
              <Calendar className="text-primary" />
              Timeline
            </motion.h3>
            
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent" />
              
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-12 pb-8 last:pb-0"
                >
                  {/* Dot */}
                  <div className="absolute left-2 top-1 w-4 h-4 rounded-full bg-primary border-4 border-background" />
                  
                  <div className="glass-card p-5">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                      {item.year}
                    </span>
                    <h4 className="text-lg font-semibold mt-1">{item.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{item.company}</p>
                    <p className="text-sm text-muted-foreground mt-2">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.a
              href="/Monishwaran_K_Resume.pdf"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="btn-outline inline-flex items-center gap-2 mt-6"
              whileHover={{ scale: 1.02 }}
            >
              <Download size={16} />
              Download Full Resume
            </motion.a>
          </div>
          
          {/* Events & Achievements */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-bold font-sora mb-8 flex items-center gap-3"
            >
              <Award className="text-accent" />
              Events & Achievements
            </motion.h3>
            
            <div className="space-y-4">
              {events.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card p-5 group hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-xs font-medium text-accent uppercase tracking-wider">
                        {event.date}
                      </span>
                      <h4 className="text-lg font-semibold mt-1">{event.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                    </div>
                    <span className="shrink-0 px-3 py-1 text-xs font-semibold rounded-full bg-accent/20 text-accent">
                      {event.achievement}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Certifications */}
            <motion.h4
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xl font-semibold mt-10 mb-4"
            >
              Certifications
            </motion.h4>
            
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                  className="glass-card p-4 min-w-[200px] shrink-0 cursor-pointer"
                >
                  <div className="w-full aspect-[4/3] rounded-lg bg-muted/30 mb-3 flex items-center justify-center">
                    <Award size={32} className="text-primary/50" />
                  </div>
                  <h5 className="text-sm font-semibold line-clamp-1">{cert.title}</h5>
                  <p className="text-xs text-muted-foreground mt-1">{cert.issuer}</p>
                  <p className="text-xs text-primary mt-1">{cert.date}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
