import { useEffect, useState } from 'react';
import { motion, type Transition } from 'framer-motion';
import { Download, Mail, Github, Instagram, Linkedin } from 'lucide-react';
import { useTilt } from '@/hooks/useTilt';
import profileImage from '@/assets/profile-main.jpg';

const roles = [
  "Full-Stack Developer",
  "Mechanical Engineer", 
  "Embedded Developer",
  "CAD /Solidworks Designer",
];

const smoothEase: Transition = { duration: 0.7, ease: "easeOut" };

export function Hero() {
  const [currentRole, setCurrentRole] = useState(0);
  const photoRef = useTilt<HTMLDivElement>({ maxTilt: 10, scale: 1.02 });
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  
  const headlineChars = "Hi, I'm Monishwaran K".split('');
  
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden"
    >
      {/* Background Gradient Orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-float" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-accent/15 rounded-full blur-[100px] animate-float" style={{ animationDelay: '-3s' }} />
      
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.06 } }
            }}
            className="order-2 lg:order-1 text-center lg:text-left"
          >
            {/* Headline */}
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-sora tracking-tight mb-6"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={smoothEase}
            >
              <span className="overflow-hidden inline-block">
                {headlineChars.map((char, i) => (
                  <motion.span
                    key={i}
                    className={char === 'M' ? 'gradient-text' : 'text-foreground'}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: i * 0.03,
                      ease: "easeOut"
                    }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </span>
            </motion.h1>
            
            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...smoothEase, delay: 0.3 }}
              className="text-lg md:text-xl text-muted-foreground mb-4 max-w-xl mx-auto lg:mx-0"
            >
              Building for Web, Machines, and Real-World Engineering
            </motion.p>
            
            {/* Rotating Roles */}
            <motion.div 
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...smoothEase, delay: 0.4 }}
              className="h-8 mb-8 overflow-hidden"
            >
              <motion.div
                key={currentRole}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="text-lg font-medium gradient-text"
              >
                {roles[currentRole]}
              </motion.div>
            </motion.div>
            
            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...smoothEase, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
            >
              <motion.a
                href="/Monishwaran_K_Resume.pdf"
                download
                className="btn-primary inline-flex items-center justify-center gap-2"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                aria-label="Download Monishwaran's resume (PDF)"
              >
                <Download size={18} />
                Download Resume
              </motion.a>
              <motion.a
                href="#contact"
                className="btn-outline inline-flex items-center justify-center gap-2"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                aria-label="Open contact form to discuss projects"
              >
                <Mail size={18} />
                Contact Me
              </motion.a>
            </motion.div>
            
            {/* Social Links */}
            <motion.div 
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...smoothEase, delay: 0.6 }}
              className="flex gap-4 justify-center lg:justify-start"
            >
              {[
                  { icon: Github, href: "https://github.com/kmonishwaran123-oss", label: "GitHub" },
                  { icon: Linkedin, href: "https://www.linkedin.com/in/monishwaran-k-b463a3363", label: "LinkedIn" },
                { icon: Instagram, href: "https://www.instagram.com/k._.monish/", label: "Instagram" },
                 { icon: Mail, label: 'Email', href: 'https://www.k.monishwaran123@gmail.com', username: 'Monishwaran K'},
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-muted/50 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={label}
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Right Content - Profile Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="order-1 lg:order-2 flex justify-center"
          >
            <div
              ref={photoRef}
              className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96"
            >
              {/* Glowing Ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-secondary to-accent p-1 animate-spin-slow opacity-60 blur-sm" />
              
              {/* Holographic Border */}
              <div className="absolute inset-1 rounded-full bg-gradient-to-br from-primary via-secondary to-accent p-0.5">
                <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden">
                  <img
                    src={profileImage}
                    alt="Monishwaran - Mechanical Engineer"
                    className="w-full h-full object-cover rounded-full"
                    loading="eager"
                  />
                </div>
              </div>
              
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-full neon-glow pointer-events-none" />
              
              {/* Floating Elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-12 h-12 rounded-xl bg-primary/20 backdrop-blur-sm border border-primary/30 flex items-center justify-center"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="text-xl">💻</span>
              </motion.div>
              
              <motion.div
                className="absolute -bottom-4 -left-4 w-12 h-12 rounded-xl bg-accent/20 backdrop-blur-sm border border-accent/30 flex items-center justify-center"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <span className="text-xl">⚙️</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
