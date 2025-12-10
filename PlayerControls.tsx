import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Sparkles, Upload } from 'lucide-react';

interface PlayerControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  progress: number;
  duration: number;
  onSeek: (value: number) => void;
  volume: number;
  onVolumeChange: (value: number) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
  onUploadClick: () => void;
  isUploading: boolean;
}

const formatTime = (time: number) => {
  if (isNaN(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

export const PlayerControls: React.FC<PlayerControlsProps> = ({
  isPlaying, onPlayPause, onNext, onPrev, progress, duration, onSeek,
  volume, onVolumeChange, onAnalyze, isAnalyzing, onUploadClick, isUploading
}) => {
  
  return (
    <div className="w-full flex flex-col gap-4 md:gap-6 select-none max-w-full">
      {/* Progress Bar */}
      <div className="w-full group px-1">
        <input
          type="range"
          min={0}
          max={duration || 100}
          value={progress}
          onChange={(e) => onSeek(Number(e.target.value))}
          className="w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-0 [&::-webkit-slider-thumb]:h-0 hover:[&::-webkit-slider-thumb]:w-3 hover:[&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:transition-all transition-all"
          style={{
             backgroundImage: `linear-gradient(white, white)`,
             backgroundSize: `${(progress / (duration || 1)) * 100}% 100%`,
             backgroundRepeat: 'no-repeat'
          }}
        />
        <div className="flex justify-between text-[10px] md:text-xs font-medium text-white/50 mt-1.5 font-mono tracking-wide">
          <span>{formatTime(progress)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Main Controls */}
      <div className="flex items-center justify-between w-full px-2">
        <button 
          onClick={onUploadClick}
          disabled={isUploading}
          className={`text-white/40 hover:text-white transition-colors p-2 -ml-2 ${isUploading ? 'animate-pulse' : ''}`}
          title="Upload & Parse"
        >
          <Upload size={20} className="md:w-5 md:h-5 w-4 h-4" />
        </button>

        <div className="flex items-center gap-6 md:gap-10">
          <button onClick={onPrev} className="text-white/70 hover:text-white transition-transform active:scale-90 p-1">
            <SkipBack size={28} className="md:w-8 md:h-8" fill="currentColor" />
          </button>
          
          <button 
            onClick={onPlayPause} 
            className="text-white hover:scale-105 transition-transform active:scale-95 bg-white/5 rounded-full p-2 md:p-0 md:bg-transparent"
          >
            {isPlaying ? (
              <Pause size={40} className="md:w-12 md:h-12" fill="currentColor" />
            ) : (
              <Play size={40} className="md:w-12 md:h-12 ml-1 md:ml-0" fill="currentColor" />
            )}
          </button>
          
          <button onClick={onNext} className="text-white/70 hover:text-white transition-transform active:scale-90 p-1">
            <SkipForward size={28} className="md:w-8 md:h-8" fill="currentColor" />
          </button>
        </div>

        <button 
          onClick={onAnalyze}
          disabled={isAnalyzing}
          className={`text-white/40 hover:text-white transition-colors p-2 -mr-2 ${isAnalyzing ? 'animate-pulse text-indigo-400' : ''}`}
          title="Gemini Vibe Check"
        >
           <Sparkles size={20} className="md:w-5 md:h-5 w-4 h-4" />
        </button>
      </div>

      {/* Volume (Hidden on small mobile) */}
      <div className="hidden sm:flex items-center gap-3 mt-1 group px-2">
        <Volume2 size={16} className="text-white/40 group-hover:text-white/80 transition-colors" />
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => onVolumeChange(Number(e.target.value))}
          className="flex-1 h-1 bg-white/10 rounded-full appearance-none cursor-pointer outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:opacity-0 group-hover:[&::-webkit-slider-thumb]:opacity-100 transition-all"
        />
      </div>
    </div>
  );
};
