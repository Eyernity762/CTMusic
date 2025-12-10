import React from 'react';
import { AnalysisResult } from '../types';
import { X, Music2 } from 'lucide-react';
import { TRANSLATIONS } from '../constants';

interface SongAnalysisProps {
  isOpen: boolean;
  onClose: () => void;
  analysis: AnalysisResult | null;
  isLoading: boolean;
  lang: 'en' | 'zh';
}

export const SongAnalysis: React.FC<SongAnalysisProps> = ({ isOpen, onClose, analysis, isLoading, lang }) => {
  if (!isOpen) return null;
  const t = TRANSLATIONS[lang];

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
      <div 
        className="relative w-full max-w-md bg-[#18181b] border border-white/10 rounded-3xl p-6 shadow-2xl text-white overflow-hidden ring-1 ring-white/10"
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors z-10"
        >
          <X size={20} />
        </button>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <div className="w-12 h-12 border-4 border-white/10 border-t-white rounded-full animate-spin"></div>
            <p className="text-white/70 animate-pulse font-medium">{t.listening}</p>
          </div>
        ) : analysis ? (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl shadow-lg">
                <Music2 size={24} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight">{t.geminiAnalysis}</h2>
            </div>
            
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-white/40 font-bold">{t.mood}</span>
              <p className="text-3xl font-light text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-white">
                {analysis.mood}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-white/40 font-bold">{t.vibe}</span>
              <p className="text-lg leading-relaxed text-white/90 font-serif italic border-l-2 border-white/20 pl-4">
                "{analysis.description}"
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-wider text-white/40 font-bold">{t.texture}</span>
              <div className="flex flex-wrap gap-2">
                {analysis.instruments.map((inst, i) => (
                  <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-white/80 shadow-sm">
                    {inst}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="pt-4 border-t border-white/10 flex justify-between items-center">
               <span className="text-[10px] text-white/30">{t.poweredBy}</span>
            </div>
          </div>
        ) : (
          <div className="py-8 text-center text-white/50">
            {t.noAnalysis}
          </div>
        )}
      </div>
    </div>
  );
};
