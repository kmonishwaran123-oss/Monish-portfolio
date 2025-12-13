import { useRef, useEffect, useCallback } from 'react';

interface TiltOptions {
  maxTilt?: number;
  perspective?: number;
  scale?: number;
  speed?: number;
  glare?: boolean;
  maxGlare?: number;
}

export function useTilt<T extends HTMLElement>(options: TiltOptions = {}) {
  const ref = useRef<T>(null);
  const { 
    maxTilt = 8, 
    perspective = 1000, 
    scale = 1.02, 
    speed = 400,
  } = options;
  
  const requestRef = useRef<number>();
  const currentTransform = useRef({ x: 0, y: 0, scale: 1 });
  
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;
    
    currentTransform.current = { x: rotateX, y: rotateY, scale };
    
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }
    
    requestRef.current = requestAnimationFrame(() => {
      if (ref.current) {
        ref.current.style.transform = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
      }
    });
  }, [maxTilt, perspective, scale]);
  
  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return;
    
    ref.current.style.transition = `transform ${speed}ms ease-out`;
    ref.current.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale(1)`;
    
    setTimeout(() => {
      if (ref.current) {
        ref.current.style.transition = '';
      }
    }, speed);
  }, [perspective, speed]);
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    
    element.style.transformStyle = 'preserve-3d';
    element.style.willChange = 'transform';
    
    element.addEventListener('mousemove', handleMouseMove, { passive: true });
    element.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    
    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [handleMouseMove, handleMouseLeave]);
  
  return ref;
}
