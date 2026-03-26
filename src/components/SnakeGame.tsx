import React from 'react';
import { useSnake } from '../hooks/useSnake';
import { motion } from 'motion/react';
import { RotateCcw } from 'lucide-react';

export function SnakeGame() {
  const { snake, food, isGameOver, score, isPaused, resetGame, gridSize, speed, setSpeed } = useSnake();

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto">
      <div className="flex justify-between w-full mb-4 px-2">
        <div className="text-yellow-400 font-pixel text-lg drop-shadow-[2px_2px_0_#d1d5db] hover:text-white transition-colors duration-300 cursor-default">
          SCORE:{score.toString().padStart(4, '0')}
        </div>
        <div className="text-gray-300 font-pixel text-lg drop-shadow-[2px_2px_0_#facc15] hover:text-white transition-colors duration-300 cursor-default">
          {isPaused ? 'PAUSED' : 'PLAYING'}
        </div>
      </div>
      
      <div 
        className="relative bg-black border-4 border-yellow-400 overflow-hidden hover:border-white transition-colors duration-300"
        style={{ 
          width: '100%', 
          aspectRatio: '1/1',
          display: 'grid',
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gridTemplateRows: `repeat(${gridSize}, 1fr)`,
          boxShadow: 'inset 0 0 20px rgba(253,224,71,0.2), 0 0 10px rgba(209,213,219,0.5)'
        }}
      >
        {/* Grid background */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" 
             style={{
               backgroundImage: 'linear-gradient(to right, #facc15 1px, transparent 1px), linear-gradient(to bottom, #d1d5db 1px, transparent 1px)',
               backgroundSize: `${100/gridSize}% ${100/gridSize}%`
             }}
        />

        {/* Food */}
        <div 
          className="bg-gray-300 animate-pulse"
          style={{
            gridColumnStart: food.x + 1,
            gridRowStart: food.y + 1,
            margin: '0px',
            boxShadow: '0 0 10px #d1d5db'
          }}
        />

        {/* Snake */}
        {snake.map((segment, index) => {
          const isHead = index === 0;
          return (
            <div
              key={`${segment.x}-${segment.y}-${index}`}
              className={`${isHead ? 'bg-white z-10' : 'bg-yellow-400'} rounded-sm`}
              style={{
                gridColumnStart: segment.x + 1,
                gridRowStart: segment.y + 1,
                margin: '0px',
                boxShadow: isHead ? '0 0 10px #ffffff' : '0 0 5px #facc15'
              }}
            />
          );
        })}

        {/* Game Over Overlay */}
        {isGameOver && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center z-10"
          >
            <div className="scanline" />
            <motion.div 
              initial={{ y: -200, opacity: 0, scale: 0 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ type: "spring", bounce: 0.6, duration: 1, delay: 0.2 }}
              className="relative mb-6 flex justify-center"
            >
              <div className="text-8xl drop-shadow-[0_0_30px_rgba(34,197,94,0.8)] z-10 relative">
                🐍
              </div>
              {/* Venom drops */}
              <motion.div 
                animate={{ y: [0, 30, 60], opacity: [0, 1, 0], scaleY: [1, 1.5, 2] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeIn" }}
                className="absolute bottom-2 left-[45%] w-2 h-6 bg-yellow-400 rounded-full blur-[1px] shadow-[0_0_15px_#facc15] z-0"
              />
              <motion.div 
                animate={{ y: [0, 40, 80], opacity: [0, 1, 0], scaleY: [1, 1.5, 2] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeIn", delay: 0.7 }}
                className="absolute bottom-4 left-[55%] w-1.5 h-4 bg-gray-300 rounded-full blur-[1px] shadow-[0_0_15px_#d1d5db] z-0"
              />
            </motion.div>
            <h2 
              className="text-4xl font-pixel text-yellow-400 mb-4 tracking-widest drop-shadow-[0_0_10px_#facc15] hover:text-white transition-colors duration-300 cursor-default"
            >
              GAME OVER
            </h2>
            <p className="text-gray-300 font-terminal text-2xl mb-6 drop-shadow-[0_0_5px_#d1d5db] hover:text-white transition-colors duration-300 cursor-default">FINAL SCORE: {score}</p>
            <button 
              onClick={resetGame}
              className="px-8 py-3 bg-black border-4 border-yellow-400 text-yellow-400 font-pixel text-sm uppercase transition-all duration-300 hover:bg-yellow-400 hover:text-black hover:border-white hover:shadow-[0_0_15px_#facc15] active:scale-95 flex items-center gap-2"
            >
              <RotateCcw size={16} />
              <span>[ PLAY AGAIN DUDE ]</span>
            </button>
          </motion.div>
        )}
      </div>
      
      <div className="mt-6 text-gray-400 font-terminal text-lg text-center uppercase tracking-widest">
        INPUT: <span className="text-yellow-400 font-bold hover:text-white transition-colors duration-300">WASD</span> / <span className="text-yellow-400 font-bold hover:text-white transition-colors duration-300">ARROWS</span><br/>
        HALT: <span className="text-gray-300 font-bold hover:text-white transition-colors duration-300">SPACE</span>
      </div>

      <div className="mt-8 flex flex-col items-center gap-2">
        <div className="text-yellow-400 font-pixel text-sm uppercase tracking-widest drop-shadow-[1px_1px_0_#d1d5db] hover:text-white transition-colors duration-300 cursor-default">
          SNAKE SPEED
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => setSpeed(180)}
            className={`px-4 py-2 font-pixel text-xs uppercase border-2 transition-all duration-300 ${speed === 180 ? 'bg-gray-300 text-black border-gray-300 shadow-[0_0_10px_#d1d5db]' : 'bg-black text-gray-300 border-gray-300 hover:bg-gray-300/20 hover:text-white hover:border-white'}`}
          >
            SLOW
          </button>
          <button 
            onClick={() => setSpeed(120)}
            className={`px-4 py-2 font-pixel text-xs uppercase border-2 transition-all duration-300 ${speed === 120 ? 'bg-yellow-400 text-black border-yellow-400 shadow-[0_0_10px_#facc15]' : 'bg-black text-yellow-400 border-yellow-400 hover:bg-yellow-400/20 hover:text-white hover:border-white'}`}
          >
            NORMAL
          </button>
          <button 
            onClick={() => setSpeed(60)}
            className={`px-4 py-2 font-pixel text-xs uppercase border-2 transition-all duration-300 ${speed === 60 ? 'bg-white text-black border-white shadow-[0_0_10px_#ffffff]' : 'bg-black text-white border-white hover:bg-white/20 hover:shadow-[0_0_10px_#ffffff]'}`}
          >
            FAST
          </button>
        </div>
      </div>
    </div>
  );
}
