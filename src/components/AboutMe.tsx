import { motion, useInView, type Variants } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, Briefcase, Heart, MapPin, Calendar } from 'lucide-react';
import profileClose from '@/assets/profile-close.jpeg';

const education = [
  {
    degree: "B.E. Mechanical Engineering",
    institution: "Meenakshi Sundararajan Engineering College  (Autonomous)",
    year: "2024 - 2028",
    description: "Mechanical engineering student with interest in design, web, and app development, supported by CAD skills. Developing MATLAB and programming abilities to enhance engineering analysis and contribute to real-world projects"
  }
];

const interests = [
  { icon: "💻", label: "Coding" },
  { icon: "🚴", label: "Cycling" },
  { icon: "📷", label: "Photography" },
  { icon: "🎮", label: "Gaming" },
  { icon: "📚", label: "Reading" },
  { icon: "🏋️", label: "Fitness" },
  { icon: "🎵", label: "Music" },
  { icon: "🌍", label: "Travel" },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const }
  }
};

export function AboutMe() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[150px] -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-[120px]" />

      <div className="container mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="text-primary text-sm font-medium tracking-widest uppercase mb-4 block">
              Get to Know Me
            </span>
            <h2 className="section-title">
              About <span className="gradient-text">Me</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Bio Card */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-2 glass-card p-8 rounded-2xl"
            >
              <div className="flex flex-col md:flex-row gap-8">
                <motion.div
                  className="shrink-0"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-2 border-primary/30 mx-auto md:mx-0">
                    <img
                      src={profileClose}
                      alt="Monishwaran K"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>

                <div className="flex-1">
                  <h3 className="text-2xl font-sora font-bold mb-2">
                    Monishwaran K
                  </h3>
                  <p className="text-primary font-medium mb-4 flex items-center gap-2">
                    <Briefcase size={16} />
                    Mechanical Engineer
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    I'm a passionate engineer who bridges the gap between mechanical systems and software development. 
                    With hands-on experience in CAD design, embedded systems, and full-stack web development, 
                    I bring a unique perspective to every project.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    My journey spans from designing mechanical components in SolidWorks and AutoCAD to building 
                    responsive web applications with React and Node.js. I thrive on solving complex problems 
                    and creating solutions that make a real impact.
                  </p>
                  
                  <div className="flex flex-wrap gap-4 mt-6 text-sm text-muted-foreground">
                    <span className="flex items-center gap-2">
                      <MapPin size={14} className="text-primary" />
                      Chennai, India
                    </span>
                    <span className="flex items-center gap-2">
                      <Calendar size={14} className="text-accent" />
                      Age 18
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Education Card */}
            <motion.div
              variants={itemVariants}
              className="glass-card p-8 rounded-2xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                  <GraduationCap className="text-primary" size={20} />
                </div>
                <h3 className="text-xl font-sora font-bold">Education</h3>
              </div>

              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  className="relative pl-6 border-l-2 border-primary/30"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary border-2 border-background" />
                  <h4 className="font-semibold text-foreground">{edu.degree}</h4>
                  <p className="text-primary text-sm font-medium">{edu.institution}</p>
                  <p className="text-muted-foreground text-sm mt-1">{edu.year}</p>
                  <p className="text-muted-foreground text-sm mt-2">{edu.description}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Interests Card */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-3 glass-card p-8 rounded-2xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                  <Heart className="text-accent" size={20} />
                </div>
                <h3 className="text-xl font-sora font-bold">Personal Interests</h3>
              </div>

              <div className="flex flex-wrap gap-4">
                {interests.map((interest, index) => (
                  <motion.div
                    key={interest.label}
                    className="px-5 py-3 rounded-xl bg-muted/50 border border-white/5 flex items-center gap-3 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 cursor-default"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ delay: 0.7 + index * 0.05 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <span className="text-xl">{interest.icon}</span>
                    <span className="font-medium text-foreground">{interest.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
