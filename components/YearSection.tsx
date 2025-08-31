import React from 'react';
import { motion } from 'framer-motion';
import { Album } from '../types/index.ts';
import AlbumCard from './AlbumCard.tsx';

interface YearSectionProps {
  year: number | string;
  albums: Album[];
  onAlbumSelect: (album: Album) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const YearSection: React.FC<YearSectionProps> = ({ year, albums, onAlbumSelect }) => {
  return (
    <section>
      <h2 className="sticky top-[120px] md:top-[128px] z-30 text-6xl md:text-8xl font-black text-gray-900/10 py-4 px-4 md:px-8 backdrop-blur-sm select-none pointer-events-none">
        {year}
      </h2>
      <motion.div 
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 px-4 md:px-8 pb-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {albums.map(album => (
          <AlbumCard key={album.id} album={album} onSelect={onAlbumSelect} />
        ))}
      </motion.div>
    </section>
  );
};

export default YearSection;