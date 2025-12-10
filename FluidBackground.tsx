import React, { useEffect, useState } from 'react';

interface FluidBackgroundProps {
  colors: string[];
  isPlaying: boolean;
}

export const FluidBackground: React.FC<FluidBackgroundProps> = ({ colors, isPlaying }) => {
  const [activeColors, setActiveColors] = useState(colors);

  useEffect(() => {
    // Ensure we always have at least 3 valid colors
    const validColors = [
        colors[0] || '#18181b',
        colors[1] || '#27272a',
        colors[2] || '#3f3f46'
    ];
    setActiveColors(validColors);
  }, [colors]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-[#0a0a0a] transition-colors duration-1000">
      {/* 
        Using 'overlay' or 'screen' with lower opacity creates a more 'comfortable' 
        and less harsh contrast compared to 'hard-light' 
      */}
      <div 
        className={`absolute inset-0 w-full h-full opacity-50 mix-blend-screen filter blur-[100px] sm:blur-[140px] transition-all duration-[3000ms] ease-in-out`}
        style={{
          background: `
            radial-gradient(circle at 10% 40%, ${activeColors[0]}, transparent 60%),
            radial-gradient(circle at 90% 20%, ${activeColors[1]}, transparent 50%),
            radial-gradient(circle at 50% 90%, ${activeColors[2]}, transparent 60%)
          `
        }}
      >
        <div 
          className="absolute top-[-10%] left-[-10%] w-[80%] h-[80%] rounded-full opacity-60 animate-blob mix-blend-plus-lighter"
          style={{ backgroundColor: activeColors[0], animationDuration: isPlaying ? '20s' : '40s' }}
        />
        <div 
          className="absolute top-[20%] right-[-20%] w-[70%] h-[70%] rounded-full opacity-60 animate-blob animation-delay-2000 mix-blend-plus-lighter"
          style={{ backgroundColor: activeColors[1], animationDuration: isPlaying ? '25s' : '45s' }}
        />
        <div 
          className="absolute bottom-[-20%] left-[30%] w-[90%] h-[90%] rounded-full opacity-50 animate-blob animation-delay-4000 mix-blend-plus-lighter"
          style={{ backgroundColor: activeColors[2], animationDuration: isPlaying ? '30s' : '50s' }}
        />
      </div>
      {/* Enhanced Grain Texture for "Paper-like" or "Film" quality */}
      <div className="absolute inset-0 opacity-[0.07] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none" />
    </div>
  );
};
