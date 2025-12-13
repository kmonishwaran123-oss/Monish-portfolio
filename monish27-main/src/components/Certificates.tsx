import { motion, useInView, type Variants, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { Award, ExternalLink, X, ChevronLeft, ChevronRight } from 'lucide-react';

const certificates = [
  {
    title: "Schema Design Optimization",
    issuer: "MangoDB",
    date: "2025",
    image:"https://miro.medium.com/v2/resize:fit:1200/1*ty8m8Y3dzgD6P5Xc17gbYw.jpeg",
    credentialUrl: "https://learn.mongodb.com/c/jPRqKMxoS32a2xCHBAxH8Q",
    skills: [ "MongoDB"]
  },
  {
    title: "IOT-Networt Specialist",
    issuer: ('NSDC & Reliance Foundation '),
    date: "2025",
    image: "data:image/png;base64,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",
    credentialUrl: "https://rfskillingacademy.com/certificate/group/500/236025",
    skills: ["IOT", "Embedded Systems", ]
  },
   {
    title: "Google Certification For Students",
    issuer: "Google",
    date: "2025",
    Image:"data:image/jpeg;base64,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",
    //image: "https://www.google.com/imgres?q=google%20icons&imgurl=https%3A%2F%2Fcdn-teams-slug.flaticon.com%2Fgoogle.jpg&imgrefurl=https%3A%2F%2Fwww.flaticon.com%2Fauthors%2Fgoogle&docid=KKReSPDy_9t4xM&tbnid=r7jpcM1WRW_P8M&vet=12ahUKEwjdopKBjbqRAxXIWHADHQtpMIEQM3oECBgQAA..i&w=300&h=300&hcb=2&ved=2ahUKEwjdopKBjbqRAxXIWHADHQtpMIEQM3oECBgQAA",
    credentialUrl: "https://edu.exceedlms.com/student/award/gXQ5bcu6DsWgq8LcFJwMKBmB",
    skills: ["AL"]
  },
  {
    title: "Python Programming ",
    issuer: ('NSDC & Reliance Foundation '),
    date: "2025",
    image: "data:image/png;base64,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",
    credentialUrl: "https://rfskillingacademy.com/certificate/group/300/235783",
    skills: ["PYTHON"]
  },
 
  {
    title: "Relational To Document Model",
    issuer: "MongoDB",
    date: "2025",
    image: "https://miro.medium.com/v2/resize:fit:1200/1*ty8m8Y3dzgD6P5Xc17gbYw.jpeg",
    credentialUrl: "https://learn.mongodb.com/c/j8yCqbZ2S9uU5yCHWgfz5w",
    skills: ["MongoDB", "NoSQL"]
  },
  {
    title: "Fundamentals of Machine Learning and Artificial Intelligence",
    issuer: "AWS",
    date: "2024",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
    credentialUrl: "",
    skills: ["AWS", "Cloud", "DevOps"]
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
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const }
  }
};

export function Certificates() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [selectedCert, setSelectedCert] = useState<typeof certificates[0] | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 340;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="certificates"
      className="relative py-24 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-primary/10 rounded-full blur-[150px]" />

      <div className="container mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="text-primary text-sm font-medium tracking-widest uppercase mb-4 block">
              Professional Growth
            </span>
            <h2 className="section-title">
              Certificates & <span className="gradient-text">Credentials</span>
            </h2>
          </motion.div>

          {/* Carousel Navigation */}
          <div className="relative">
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border border-white/10 flex items-center justify-center text-foreground hover:bg-primary/20 transition-colors hidden md:flex"
              aria-label="Scroll left"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border border-white/10 flex items-center justify-center text-foreground hover:bg-primary/20 transition-colors hidden md:flex"
              aria-label="Scroll right"
            >
              <ChevronRight size={24} />
            </button>

            {/* Carousel */}
            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 px-2 -mx-2 snap-x snap-mandatory"
            >
              {certificates.map((cert, index) => (
                <motion.div
                  key={cert.title}
                  variants={itemVariants}
                  className="flex-shrink-0 w-80 snap-center"
                >
                  <motion.div
                    className="glass-card rounded-2xl overflow-hidden cursor-pointer group"
                    whileHover={{ scale: 1.02, y: -5 }}
                    onClick={() => setSelectedCert(cert)}
                  >
                    {/* Image */}
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                      <div className="absolute top-3 right-3">
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/90 text-white">
                          {cert.date}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                          <Award className="text-primary" size={20} />
                        </div>
                        <div>
                          <h3 className="font-sora font-bold text-foreground line-clamp-1">{cert.title}</h3>
                          <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                        </div>
                      </div>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-2">
                        {cert.skills.map((skill) => (
                          <span key={skill} className="px-2 py-1 text-xs rounded-md bg-muted/50 text-muted-foreground">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card rounded-2xl max-w-2xl w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-background/50 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-destructive/20 transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              {/* Image */}
              <div className="relative h-64">
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-8 -mt-16 relative">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center">
                    <Award className="text-primary" size={28} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-sora font-bold">{selectedCert.title}</h3>
                    <p className="text-muted-foreground">{selectedCert.issuer} • {selectedCert.date}</p>
                  </div>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedCert.skills.map((skill) => (
                    <span key={skill} className="tag-chip">{skill}</span>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href={selectedCert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <ExternalLink size={18} />
                  View Credential
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
