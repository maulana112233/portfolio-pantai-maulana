import React from 'react';

interface WavySectionDividerProps {
  variant?: 'sand-to-ocean' | 'ocean-to-sand' | 'ocean-deep' | 'sand-warm';
  flip?: boolean;
}

export const WavySectionDivider: React.FC<WavySectionDividerProps> = ({
  variant = 'sand-to-ocean',
  flip = false,
}) => {
  const getGradient = () => {
    switch (variant) {
      case 'sand-to-ocean':
        return {
          bg: 'bg-[#FFFDF7]',
          fill: '#BAE6FD',
          stroke: '#000000',
        };
      case 'ocean-to-sand':
        return {
          bg: 'bg-[#BAE6FD]',
          fill: '#FAF6EB',
          stroke: '#000000',
        };
      case 'ocean-deep':
        return {
          bg: 'bg-[#FAF6EB]',
          fill: '#7DD3FC',
          stroke: '#000000',
        };
      case 'sand-warm':
      default:
        return {
          bg: 'bg-[#FFFDF7]',
          fill: '#FAF6EB',
          stroke: '#000000',
        };
    }
  };

  const style = getGradient();

  return (
    <div
      className={`relative w-full overflow-hidden leading-none border-b-4 border-black ${style.bg} ${
        flip ? 'rotate-180' : ''
      }`}
      style={{ height: '36px' }}
    >
      <svg
        className="relative block w-full h-[36px]"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,60 L1200,120 L0,120 Z"
          fill={style.fill}
        ></path>
        <path
          d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,60"
          fill="none"
          stroke={style.stroke}
          strokeWidth="6"
        ></path>
      </svg>
    </div>
  );
};
