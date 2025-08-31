
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArtistProfile } from '../types/index.ts';
import ArtistProfileCard from './ArtistProfileCard.tsx';
import { Button } from './ui/Button.tsx';

interface ArtistSpotlightCarouselProps {
  profiles: ArtistProfile[];
}

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const ArtistSpotlightCarousel: React.FC<ArtistSpotlightCarouselProps> = ({ profiles }) => {
  const [[page, direction], setPage] = useState([0, 0]);

  const profileIndex = ((page % profiles.length) + profiles.length) % profiles.length;

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      paginate(1);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, [page]);


  if (!profiles || profiles.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full max-w-4xl mx-auto pb-8">
      <div className="relative w-full overflow-hidden h-auto min-h-[550px] flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
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
            className="w-full h-full absolute flex items-center justify-center"
          >
            <ArtistProfileCard profile={profiles[profileIndex]} />
          </motion.div>
        </AnimatePresence>
      </div>

       <Button
          variant="outline"
          size="icon"
          onClick={() => paginate(-1)}
          className="absolute top-1/2 -translate-y-1/2 left-0 md:-left-10 z-20 rounded-full !w-12 !h-12 border-2 border-kompa-gold-600 bg-white/50 hover:bg-white text-konpa-gold-600 hover:text-konpa-blue"
          aria-label="Previous artist"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => paginate(1)}
          className="absolute top-1/2 -translate-y-1/2 right-0 md:-right-10 z-20 rounded-full !w-12 !h-12 border-2 border-kompa-gold-600 bg-white/50 hover:bg-white text-konpa-gold-600 hover:text-konpa-blue"
          aria-label="Next artist"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </Button>

      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
        {profiles.map((_, i) => (
          <button
            key={i}
            onClick={() => setPage([i, i > profileIndex ? 1 : -1])}
            className={`w-2 h-2 rounded-full transition-colors ${i === profileIndex ? 'bg-konpa-gold-500' : 'bg-gray-400 hover:bg-kompa-gold-400'}`}
            aria-label={`Go to artist ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ArtistSpotlightCarousel;