import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Send, 
  MapPin, 
  Github, 
  Linkedin, 
  Instagram, 
  Mail, 
  Clock,
  Download,
  ArrowUpRight,
  CheckCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing fields",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    
    toast({
      title: "Message sent!",
      description: "Thanks for reaching out. I'll get back to you soon.",
    });
    
    setTimeout(() => setIsSubmitted(false), 5000);
  };
  
  return (
    <section id="contact" className="py-24 relative">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
      
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
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? I'd love to hear from you.
          </p>
        </motion.div>
        
        {/* 4 Column Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Column 1: Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 glass-card p-6"
          >
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Mail size={20} className="text-primary" />
              Send a Message
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  placeholder="Your name"
                  disabled={isSubmitting}
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  placeholder="you@example.com"
                  disabled={isSubmitting}
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1.5">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                  placeholder="Tell me about your project..."
                  disabled={isSubmitting}
                />
              </div>
              
              <motion.button
                type="submit"
                className="btn-primary w-full flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="animate-pulse">Sending...</span>
                ) : isSubmitted ? (
                  <>
                    <CheckCircle size={18} />
                    Sent!
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
          
          {/* Column 2: Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6"
          >
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <MapPin size={20} className="text-primary" />
              Location
            </h3>
            
            <p className="text-muted-foreground mb-4">
              Chennai, Tamil Nadu<br />
              India
            </p>
            
            {/* Availability Badge */}
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-green-500/10 border border-green-500/20">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
              </span>
              <span className="text-sm text-green-400 font-medium">
                Open to work · Remote & Onsite
              </span>
            </div>
          </motion.div>
          
          {/* Column 3: Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6"
          >
            <h3 className="text-xl font-semibold mb-4">Socials</h3>
            
            <div className="space-y-3">
              {[
                { icon: Github, label: 'GitHub', href: 'https://github.com/kmonishwaran123-oss', username: 'Monishwaran K' },
                { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/monishwaran-k-b463a3363', username: 'Monishwaran' },
                { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/k._.monish/', username: '@k._.monish' },
                { icon: Mail, label: 'Email', href: 'https://www.k.monishwaran123@gmail.com', username: 'Monishwaran K'},
              ].map(({ icon: Icon, label, href, username }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors group"
                >
                  <Icon size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
                  <div className="flex-1">
                    <span className="text-sm font-medium">{label}</span>
                    <span className="block text-xs text-muted-foreground">{username}</span>
                  </div>
                  <ArrowUpRight size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Quick Access Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-6 grid sm:grid-cols-3 gap-4"
        >
          <a
            href="/Monishwaran_K_Resume.pdf"
            className="glass-card p-4 flex items-center gap-3 hover:border-primary/30 transition-colors group"
          >
            <Download size={18} className="text-primary" />
            <span className="text-sm font-medium">Download Resume</span>
          </a>
          
          <a
            href="#projects"
            className="glass-card p-4 flex items-center gap-3 hover:border-primary/30 transition-colors group"
          >
            <ArrowUpRight size={18} className="text-primary" />
            <span className="text-sm font-medium">See Projects</span>
          </a>
          
          <div className="glass-card p-4 flex items-center gap-3">
            <Clock size={18} className="text-accent" />
            <div>
              <span className="text-sm font-medium block">Working Hours</span>
              <span className="text-xs text-muted-foreground">Mon–Sat · 9:00–18:00 IST</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
