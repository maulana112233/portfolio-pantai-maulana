import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export type ScrollAnimationType =
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'zoom-in'
  | 'beach-bounce'
  | 'wave-slide';

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: ScrollAnimationType;
  delay?: number; // Delay in milliseconds
  duration?: number; // Duration in milliseconds
  className?: string;
  threshold?: number;
  triggerOnce?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 700,
  className = '',
  threshold = 0.12,
  triggerOnce = true,
}) => {
  const { ref, isRevealed } = useScrollReveal({ threshold, triggerOnce });

  const getInitialStyle = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      transitionProperty: 'opacity, transform, filter',
      transitionDuration: `${duration}ms`,
      transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      transitionDelay: `${delay}ms`,
      willChange: 'opacity, transform',
    };

    if (isRevealed) {
      return {
        ...base,
        opacity: 1,
        transform: 'translate3d(0, 0, 0) scale(1) rotate(0deg)',
        filter: 'blur(0px)',
      };
    }

    switch (animation) {
      case 'fade-up':
        return {
          ...base,
          opacity: 0,
          transform: 'translate3d(0, 40px, 0) scale(0.98)',
          filter: 'blur(4px)',
        };
      case 'fade-down':
        return {
          ...base,
          opacity: 0,
          transform: 'translate3d(0, -40px, 0)',
          filter: 'blur(4px)',
        };
      case 'fade-left':
        return {
          ...base,
          opacity: 0,
          transform: 'translate3d(-50px, 0, 0) scale(0.97)',
          filter: 'blur(4px)',
        };
      case 'fade-right':
        return {
          ...base,
          opacity: 0,
          transform: 'translate3d(50px, 0, 0) scale(0.97)',
          filter: 'blur(4px)',
        };
      case 'zoom-in':
        return {
          ...base,
          opacity: 0,
          transform: 'scale(0.85)',
          filter: 'blur(6px)',
        };
      case 'beach-bounce':
        return {
          ...base,
          opacity: 0,
          transform: 'translate3d(0, 50px, 0) rotate(-3deg) scale(0.92)',
        };
      case 'wave-slide':
        return {
          ...base,
          opacity: 0,
          transform: 'translate3d(-40px, 20px, 0) skewX(-2deg)',
          filter: 'blur(3px)',
        };
      default:
        return {
          ...base,
          opacity: 0,
          transform: 'translate3d(0, 30px, 0)',
        };
    }
  };

  return (
    <div ref={ref} style={getInitialStyle()} className={className}>
      {children}
    </div>
  );
};
