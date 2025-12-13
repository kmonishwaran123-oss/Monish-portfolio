import { useEffect, useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { AboutMe } from '@/components/AboutMe';
import { Projects } from '@/components/Projects';
import { Events } from '@/components/Events';
import { Certificates } from '@/components/Certificates';
import { Skills } from '@/components/Skills';
import { Timeline } from '@/components/Timeline';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { ParticleBackground } from '@/components/ParticleBackground';
import { IntroAnimation } from '@/components/IntroAnimation';

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);
  
  useEffect(() => {
    document.title = "Monishwaran K |  Portfolio";
  }, []);

  if (showIntro) {
    return <IntroAnimation onComplete={() => setShowIntro(false)} />;
  }
  
  return (
    <div className="relative min-h-screen">
      {/* Film Grain Overlay */}
      <div className="film-grain" aria-hidden="true" />
      
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Main Content */}
      <div className="relative z-10">
        <Navbar />
        
        <main>
          <Hero />
          <AboutMe />
          <Projects />
          <Events />
          <Certificates />
          <Skills />
          <Timeline />
          <Contact />
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default Index;
