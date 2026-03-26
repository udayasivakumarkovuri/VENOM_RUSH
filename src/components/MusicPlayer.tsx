import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Music } from 'lucide-react';

const TRACKS = [
  {
    id: 1,
    title: "Boom Boom",
    artist: "Synth Mind",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    color: "gold"
  },
  {
    id: 2,
    title: "Cybernetic Pulse (AI Generated)",
    artist: "Neural Network",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    color: "silver"
  },
  {
    id: 3,
    title: "Digital Dreams (AI Generated)",
    artist: "Algo-Rhythm",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    color: "white"
  }
] as const;

type ColorType = typeof TRACKS[number]['color'];

const COLOR_MAP: Record<ColorType, { bg: string, text: string, border: string, shadow: string, glow: string, progress: string }> = {
  gold: {
    bg: 'bg-yellow-400',
    text: 'text-yellow-400',
    border: 'border-yellow-400',
    shadow: 'shadow-[4px_4px_0_#d1d5db]',
    glow: 'shadow-[0_0_10px_#facc15]',
    progress: 'bg-yellow-400 shadow-[0_0_10px_#facc15]'
  },
  silver: {
    bg: 'bg-gray-300',
    text: 'text-gray-300',
    border: 'border-gray-300',
    shadow: 'shadow-[4px_4px_0_#facc15]',
    glow: 'shadow-[0_0_10px_#d1d5db]',
    progress: 'bg-gray-300 shadow-[0_0_10px_#d1d5db]'
  },
  white: {
    bg: 'bg-white',
    text: 'text-white',
    border: 'border-white',
    shadow: 'shadow-[4px_4px_0_#facc15]',
    glow: 'shadow-[0_0_10px_#ffffff]',
    progress: 'bg-white shadow-[0_0_10px_#ffffff]'
  }
};

export function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = TRACKS[currentTrackIndex];
  const styles = COLOR_MAP[currentTrack.color];

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play().catch(e => console.error("Audio play failed:", e));
    }
  }, [currentTrackIndex, isPlaying]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error("Audio play failed:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      if (duration) {
        setProgress((current / duration) * 100);
      }
    }
  };

  const handleEnded = () => {
    handleNext();
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-black border-2 border-gray-300 p-6 shadow-[8px_8px_0_#facc15] relative overflow-hidden transition-all duration-300 hover:border-white">
      {/* Decorative neon glow behind player */}
      <div className={`absolute -top-20 -right-20 w-40 h-40 ${styles.bg} rounded-none blur-[80px] opacity-30 pointer-events-none transition-colors duration-1000`} />
      
      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        loop={false}
      />

      <div className="flex items-center gap-4 mb-6">
        <div className={`w-12 h-12 bg-black flex items-center justify-center border-2 ${styles.border} ${styles.glow}`}>
          <Music className={styles.text} size={24} />
        </div>
        <div className="flex-1 overflow-hidden">
          <h3 className="text-white font-pixel text-xs truncate tracking-widest mb-2 uppercase">{currentTrack.title}</h3>
          <p className={`${styles.text} text-sm truncate font-terminal uppercase tracking-widest`}>{currentTrack.artist}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-2 w-full bg-gray-900 border border-gray-800 mb-6 overflow-hidden">
        <div 
          className={`h-full ${styles.progress} transition-all duration-100 ease-linear`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <button 
          onClick={toggleMute}
          className="text-gray-300 hover:text-white transition-colors p-2"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>

        <div className="flex items-center gap-4">
          <button 
            onClick={handlePrev}
            className="text-gray-300 hover:text-white transition-colors p-2"
          >
            <SkipBack size={24} />
          </button>
          
          <button 
            onClick={togglePlay}
            className={`w-12 h-12 flex items-center justify-center border-2 ${styles.border} bg-black ${styles.text} hover:bg-white hover:text-black hover:border-white transition-all ${styles.shadow} active:translate-x-1 active:translate-y-1 active:shadow-none`}
          >
            {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
          </button>
          
          <button 
            onClick={handleNext}
            className="text-gray-300 hover:text-white transition-colors p-2"
          >
            <SkipForward size={24} />
          </button>
        </div>

        <div className="w-9" /> {/* Spacer for balance */}
      </div>
    </div>
  );
}
