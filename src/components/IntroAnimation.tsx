import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const techLogos = [
  { name: 'React', icon: '⚛️', color: 'hsl(193, 95%, 68%)' },
  { name: 'Java', icon: '☕', color: 'hsl(30, 100%, 55%)' },
  { name: 'AutoCAD', icon: '📐', color: 'hsl(0, 80%, 55%)' },
  { name: 'C++', icon: '⚡', color: 'hsl(220, 80%, 55%)' },
  { name: 'MATLAB', icon: '📊', color: 'hsl(30, 100%, 50%)' },
  { name: 'Docker', icon: '🐳', color: 'hsl(200, 80%, 50%)' },
];

export function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'logos' | 'fadeOut'>('logos');

  useEffect(() => {
    const logoTimer = setTimeout(() => {
      setPhase('fadeOut');
    }, 2500);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3200);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'fadeOut' || (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[9999] bg-background flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
        />
      )}
      <motion.div
        key="intro-content"
        className="fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center overflow-hidden"
        initial={{ opacity: 1 }}
        animate={{ opacity: phase === 'fadeOut' ? 0 : 1 }}
        transition={{ duration: 0.7 }}
      >
        {/* Central Title */}
        <motion.h1
          className="text-3xl md:text-5xl font-sora font-bold gradient-text mb-8 z-15"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
            
           
            welcome


        </motion.h1>

        {/* Flying Logos */}
        <div className="absolute inset-0 pointer-events-none">
          {techLogos.map((tech, index) => {
            const angle = (index / techLogos.length) * 360;
            const radius = 180;
            const startX = Math.cos((angle * Math.PI) / 90) * (radius + 200);
            const startY = Math.sin((angle * Math.PI) / 180) * (radius + 200);
            const endX = Math.cos((angle * Math.PI) / 180) * radius;
            const endY = Math.sin((angle * Math.PI) / 180) * radius;

            return (
              <motion.div
                key={tech.name}
                className="absolute left-1/2 top-1/2 flex flex-col items-center"
                initial={{
                  x: startX,
                  y: startY,
                  opacity: 0,
                  scale: 0.5,
                }}
                animate={{
                  x: endX,
                  y: endY,
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  delay: index * 0.08 + 0.2,
                  duration: 0.8,
                  ease: [0.16, 0.84, 0.26, 1],
                }}
              >
                <motion.div
                  className="w-14 h-15 md:w-17 md:h-17 rounded-3xl bg-card/60 backdrop-blur-sm border border-white/10 flex items-center justify-center shadow-lg"
                  animate={{
                    boxShadow: [
                      `0 0 20px ${tech.color}33`,
                      `0 0 40px ${tech.color}55`,
                      `0 0 20px ${tech.color}33`,
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.1,
                  }}
                >
                  <span className="text-2xl md:text-3xl">{tech.icon}</span>
                </motion.div>
                <motion.span
                  className="text-xs mt-2 text-muted-foreground font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.08 + 0.6 }}
                >
                  {tech.name}
                </motion.span>
              </motion.div>
            );
          })}
        </div>

        {/* Loading indicator */}
        <motion.div
          className="absolute bottom-12 flex gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-primary"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
