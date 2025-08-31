

import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useData } from '../contexts/DataContext.tsx';
import { useLanguage } from '../contexts/LanguageContext.tsx';
import { Card } from '../components/ui/Card.tsx';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
};

const Years = () => {
    const { albums, loading } = useData();
    const { t } = useLanguage();

    const albumsByYear = useMemo(() => {
        return albums.reduce((acc, album) => {
            if (album.year) {
                if (!acc[album.year]) {
                    acc[album.year] = [];
                }
                acc[album.year].push(album);
            }
            return acc;
        }, {} as Record<number, any[]>);
    }, [albums]);

    const years = useMemo(() => {
        return Object.keys(albumsByYear).map(Number).sort((a, b) => b - a);
    }, [albumsByYear]);

    if (loading) return <div className="text-center p-8">{t('loading')}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-konpa-blue mb-2">{t('browseByYear')}</h1>
            <p className="text-gray-500 mb-8">Discover the discography year by year.</p>
            
            <motion.div 
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {years.map(year => {
                    const yearAlbums = albumsByYear[year];

                    return (
                        <motion.div key={year} variants={itemVariants}>
                            <Link to={`/years/${year}`} className="block group">
                                <Card className="relative overflow-hidden aspect-square p-4 flex flex-col justify-end text-left transition-all duration-300 bg-white border border-gray-200/80 group-hover:border-konpa-gold-500 group-hover:shadow-2xl group-hover:shadow-konpa-gold-500/20 transform group-hover:-translate-y-2 group-hover:scale-105">
                                    <div 
                                        aria-hidden="true" 
                                        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
                                    >
                                        <span className="text-[10rem] sm:text-[11rem] md:text-[12rem] font-black text-konpa-gold-100 transition-colors duration-300 group-hover:text-konpa-gold-200/80">
                                            {String(year).slice(-2)}
                                        </span>
                                    </div>
                                    
                                    <div className="relative z-10 transition-transform duration-300 group-hover:translate-y-1">
                                        <h2 className="font-extrabold text-4xl sm:text-5xl text-konpa-blue transition-colors">{year}</h2>
                                        <p className="text-sm text-gray-500 mt-1">{yearAlbums.length} {yearAlbums.length > 1 ? 'albums' : 'album'}</p>
                                    </div>
                                </Card>
                            </Link>
                        </motion.div>
                    )
                })}
            </motion.div>
        </div>
    );
};

export default Years;