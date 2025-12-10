import React, { useEffect, useRef } from 'react';
import { LyricLine } from '../types';
import { TRANSLATIONS } from '../constants';

interface LyricsViewProps {
  lyrics: LyricLine[];
  currentTime: number;
  onLineClick: (time: number) => void;
  isExpanded: boolean;
  lang: 'en' | 'zh';
}

export const LyricsView: React.FC<LyricsViewProps> = ({ lyrics, currentTime, onLineClick, isExpanded, lang }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeLineRef = useRef<HTMLDivElement>(null);
  const t = TRANSLATIONS[lang];
  
  // Find active line index
  const activeIndex = lyrics.findIndex((line, index) => {
    const nextLine = lyrics[index + 1];
    return currentTime >= line.time && (!nextLine || currentTime < nextLine.time);
  });

  // Auto-scroll logic with smooth centering
  useEffect(() => {
    if (activeLineRef.current && containerRef.current) {
      activeLineRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [activeIndex]);

  if (!lyrics || lyrics.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center text-white/30 text-2xl font-medium tracking-tight">
        <p>{t.noLyrics}</p>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="w-full h-full overflow-y-auto no-scrollbar py-[50vh] pr-4 md:pr-8 text-left mask-gradient"
    >
      <div className="flex flex-col gap-8 md:gap-10">
        {lyrics.map((line, index) => {
          const isActive = index === activeIndex;
          
          return (
            <div
              key={index}
              ref={isActive ? activeLineRef : null}
              onClick={() => onLineClick(line.time)}
              className={`
                cursor-pointer transition-all duration-[600ms] ease-out origin-left
                ${isActive 
                  ? 'opacity-100 scale-100 blur-none text-white' 
                  : 'opacity-30 blur-[1px] scale-95 text-white/80 hover:opacity-60 hover:blur-none'}
              `}
            >
              <p className={`
                font-bold tracking-tight leading-[1.2] drop-shadow-lg transition-all duration-500
                ${isActive ? 'text-3xl md:text-5xl lg:text-6xl' : 'text-2xl md:text-4xl lg:text-5xl'}
              `}>
                {line.text}
              </p>
              {line.translation && isActive && (
                <p className="mt-2 font-medium text-lg md:text-2xl text-white/70 animate-in fade-in slide-in-from-bottom-1">
                  {line.translation}
                </p>
              )}
            </div>
          );
        })}
      </div>
      {/* Spacer for bottom scrolling */}
      <div className="h-[40vh]" />
    </div>
  );
};
