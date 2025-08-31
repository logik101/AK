import React, { useState, useMemo } from 'react';
import { useData } from '../contexts/DataContext.tsx';
import { useLanguage } from '../contexts/LanguageContext.tsx';
import { Button } from '../components/ui/Button.tsx';
import ArtistGridCard from '../components/ArtistGridCard.tsx';
import { motion } from 'framer-motion';

const ARTISTS_PER_PAGE = 24;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const Artists = () => {
    const { artists, loading } = useData();
    const { t } = useLanguage();
    const [filterLetter, setFilterLetter] = useState<string | null>(null);
    const [visibleCount, setVisibleCount] = useState(ARTISTS_PER_PAGE);

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    const filteredArtists = useMemo(() => {
        const list = filterLetter
            ? artists.filter(artist => artist.toUpperCase().startsWith(filterLetter))
            : artists;
        
        setVisibleCount(ARTISTS_PER_PAGE);
        return list;
    }, [artists, filterLetter]);
    
    const artistsToShow = useMemo(() => {
        return filteredArtists.slice(0, visibleCount);
    }, [filteredArtists, visibleCount]);

    const handleFilterClick = (letter: string | null) => {
        setFilterLetter(letter);
        setVisibleCount(ARTISTS_PER_PAGE);
    };

    if (loading) return <div className="text-center p-8">{t('loading')}</div>;

    const activeClasses = "bg-konpa-blue text-white border-konpa-blue hover:bg-konpa-blue/90";
    const inactiveClasses = "bg-white border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400";

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-extrabold text-konpa-blue mb-8 tracking-tight">{t('artistsPageTitle')}</h1>
            <div className="flex flex-wrap gap-1.5 mb-8 sticky top-28 md:top-16 bg-white/90 backdrop-blur-sm z-30 py-4 -mx-4 px-4 border-b border-gray-200">
                <Button
                    onClick={() => handleFilterClick(null)}
                    className={`rounded-full transition-all duration-200 ${!filterLetter ? activeClasses : inactiveClasses}`}
                >
                    All
                </Button>
                {alphabet.map(letter => (
                    <Button
                        key={letter}
                        onClick={() => handleFilterClick(letter)}
                        className={`w-10 h-10 p-0 rounded-full transition-all duration-200 ${filterLetter === letter ? activeClasses : inactiveClasses}`}
                    >
                        {letter}
                    </Button>
                ))}
            </div>

            <motion.div 
                key={filterLetter || 'all'}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {artistsToShow.map(artist => (
                    <ArtistGridCard key={artist} artistName={artist} />
                ))}
            </motion.div>
            
            {visibleCount < filteredArtists.length && (
                <div className="text-center mt-12">
                    <Button
                        size="lg"
                        onClick={() => setVisibleCount(prev => prev + ARTISTS_PER_PAGE)}
                        className="bg-konpa-gold-600 hover:bg-konpa-gold-700 text-white font-bold transition-all duration-300 transform hover:scale-105"
                    >
                        {t('loadMore')}
                    </Button>
                </div>
            )}
        </div>
    );
};

export default Artists;