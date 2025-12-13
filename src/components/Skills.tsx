import { motion } from 'framer-motion';
import { skills } from '@/data/projects';

interface SkillRingProps {
  name: string;
  level: number;
  delay: number;
}

function SkillRing({ name, level, delay }: SkillRingProps) {
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (level / 100) * circumference;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col items-center"
    >
      <div className="relative w-24 h-24">
        <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth="6"
          />
          {/* Progress circle */}
          <motion.circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="url(#skillGradient)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: delay + 0.3, ease: "easeOut" }}
          />
          <defs>
            <linearGradient id="skillGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="100%" stopColor="hsl(var(--accent))" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold">{level}%</span>
        </div>
      </div>
      <span className="mt-2 text-sm text-muted-foreground text-center">{name}</span>
    </motion.div>
  );
}

interface SkillCategoryProps {
  title: string;
  items: { name: string; level: number }[];
  delay: number;
}

function SkillCategory({ title, items, delay }: SkillCategoryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="glass-card p-6"
    >
      <h3 className="text-lg font-semibold font-sora mb-6 gradient-text">{title}</h3>
      <div className="grid grid-cols-2 gap-4">
        {items.map((skill, i) => (
          <SkillRing
            key={skill.name}
            name={skill.name}
            level={skill.level}
            delay={delay + i * 0.1}
          />
        ))}
      </div>
    </motion.div>
  );
}

export function Skills() {
  const allSkills = [
    ...skills.programming.map(s => s.name),
    ...skills.web.map(s => s.name),
    ...skills.embedded.map(s => s.name),
    ...skills.mechanical.map(s => s.name),
  ];
  
  return (
    <section id="skills" className="py-24 relative">
      {/* Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="section-title mb-4">
            Skills & <span className="gradient-text">Expertise</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            
          </p>
        </motion.div>
        
        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <SkillCategory title="Programming" items={skills.programming} delay={0.1} />
          <SkillCategory title="Web Development" items={skills.web} delay={0.2} />
          <SkillCategory title="Embedded Systems" items={skills.embedded} delay={0.3} />
          <SkillCategory title="Mechanical/CAD" items={skills.mechanical} delay={0.4} />
        </div>
        
        {/* Tag Cloud */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-2"
        >
          {allSkills.map((skill, i) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.02 }}
              whileHover={{ scale: 1.1 }}
              className="px-4 py-2 text-sm rounded-full bg-muted/30 text-muted-foreground hover:bg-primary/20 hover:text-primary transition-all duration-300 cursor-default"
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
