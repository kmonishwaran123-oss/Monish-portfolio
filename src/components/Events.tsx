import { motion, useInView, type Variants } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, MapPin, Trophy, Users } from 'lucide-react';

const events = [
    {
    title: "SAE India H-Baja",
    type: "National Competition",
    date: "2025 - Present",
    location: "India",
    description: "Participating in the design and fabrication of off-road vehicles for SAE India H-Baja competition.",
    achievement: "Ongoing",
    icon: "🚗"
  },
  {
    title: "Hackintym'25 2.0",
    type: "Hackathon",
    date: "october,2025",
    location: "Chennai, India",
    description:"Participated in a national-level technical hackathon, developing innovative solutions for real-world engineering and technology challenges",
    achievement: "top 10 finalist",
    icon: "📜"
  },
  {
    title: "Guess Build Unlock",
    type: "Symposium",
    date: "October 2025",
    location: " Sri Sai Ram Engineering College",
    description: "The Event promoted innovation and creativity among engineering students through various competitions .",
    achievement: "winner",
    icon: "🏆"
  },
  {
    title: "Prompt-o-Mania",
    type: "Coding & prompt Competition",
    date: "April 2025",
    location: "Meenakshi Sundararajan Engineering College",
    description: "Competitive programming contest focusing on algorithms and data structures.",
    achievement: "Top 10",
    icon: "💻"
  },
  {
    title: "Drone Workshop",
    type: "Workshop",
    date: "April 2025",
    location: "Meenakshi Sundararajan Engineering College",
    description: "Hands-on workshop on autonomous robot navigation and control systems.",
    achievement: "Completed",
    icon: "🤖"
  },

];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" as const }
  }
};

export function Events() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="events"
      className="relative py-24 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[150px]" />
      
      <div className="container mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="text-accent text-sm font-medium tracking-widest uppercase mb-4 block">
              Achievements & Participation
            </span>
            <h2 className="section-title">
              Events & <span className="gradient-text">Hackathons</span>
            </h2>
          </motion.div>

          {/* Timeline */}
          <div className="relative max-w-4xl mx-auto">
            {/* Center Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary/20 -translate-x-1/2" />

            {events.map((event, index) => (
              <motion.div
                key={event.title}
                variants={itemVariants}
                className={`relative flex items-start gap-8 mb-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Node */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-background border-2 border-primary flex items-center justify-center z-10">
                  <span className="text-sm">{event.icon}</span>
                </div>

                {/* Card */}
                <motion.div
                  className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] glass-card p-6 rounded-2xl ${
                    index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'
                  }`}
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="tag-chip">{event.type}</span>
                    <span className="tag-chip-core flex items-center gap-1">
                      <Trophy size={12} />
                      {event.achievement}
                    </span>
                  </div>

                  <h3 className="text-xl font-sora font-bold mb-2">{event.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{event.description}</p>

                  <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} className="text-primary" />
                      {event.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={12} className="text-accent" />
                      {event.location}
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
