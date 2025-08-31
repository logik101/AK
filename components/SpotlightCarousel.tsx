import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Album } from '../types/index.ts';
import { Link } from 'react-router-dom';

interface SpotlightCarouselProps {
  albums: Album[];
}

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0
  })
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => Math.abs(offset) * velocity;

const SpotlightCarousel: React.FC<SpotlightCarouselProps> = ({ albums }) => {
  const [[page, direction], setPage] = useState([0, 0]);

  const imageIndex = ((page % albums.length) + albums.length) % albums.length;

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(interval);
  }, [page]);

  if (!albums || albums.length === 0) {
    return null;
  }

  const currentAlbum = albums[imageIndex];
  const tracksList = currentAlbum.tracks
    .split(',')
    .map(track => track.trim().replace(/^\d+\.\s*/, ''))
    .filter(Boolean);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative aspect-[16/7] overflow-hidden rounded-xl shadow-2xl">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            className="absolute w-full h-full"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img 
                    src={currentAlbum.coverUrl} 
                    alt=""
                    className="w-full h-full object-cover blur-xl scale-125"
                />
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
            </div>
            
            {/* Content */}
            <div className="relative z-10 w-full h-full flex items-center p-6 text-white">
                <div className="w-2/5 aspect-square flex-shrink-0">
                    <Link to={`/?openAlbum=${currentAlbum.id}`}>
                        <img 
                            src={currentAlbum.coverUrl} 
                            alt={currentAlbum.album} 
                            className="w-full h-full object-cover rounded-lg shadow-lg hover:scale-105 transition-transform duration-300" 
                        />
                    </Link>
                </div>
                <div className="w-3/5 pl-6 flex flex-col h-full overflow-hidden">
                    <h3 className="text-2xl font-bold truncate">{currentAlbum.album}</h3>
                    <p className="text-lg text-gray-300 mb-3">{currentAlbum.artist}</p>
                    <div className="flex-grow overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-400/50 scrollbar-track-transparent">
                        <ol className="space-y-1 text-sm">
                            {tracksList.map((track, index) => (
                                <li key={index} className="flex items-baseline opacity-80">
                                    <span className="font-mono text-xs w-5 text-right mr-2 text-gray-400">{index + 1}.</span>
                                    <span className="flex-1 truncate">{track}</span>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      <div className="flex justify-center space-x-2 mt-4">
        {albums.map((_, i) => (
          <button
            key={i}
            onClick={() => setPage([i, i > imageIndex ? 1 : -1])}
            className={`w-2 h-2 rounded-full transition-colors ${i === imageIndex ? 'bg-kompa-gold-500' : 'bg-gray-400 hover:bg-kompa-gold-400'}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
       <style>{`
            .scrollbar-thin {
                scrollbar-width: thin;
            }
            .scrollbar-thin::-webkit-scrollbar {
                width: 5px;
            }
            .scrollbar-thumb-gray-400\\/50::-webkit-scrollbar-thumb {
                background-color: rgba(156, 163, 175, 0.5);
                border-radius: 10px;
            }
            .scrollbar-track-transparent::-webkit-scrollbar-track {
                background: transparent;
            }
        `}</style>
    </div>
  );
};

export default SpotlightCarousel;