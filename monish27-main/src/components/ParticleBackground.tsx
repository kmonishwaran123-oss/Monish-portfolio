import { useRef } from 'react';
import { useParticles } from '@/hooks/useParticles';

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useParticles(canvasRef);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
