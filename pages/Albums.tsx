
import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useData } from '../contexts/DataContext.tsx';
import AlbumCard from '../components/AlbumCard.tsx';
import AlbumDetailsSheet from '../components/AlbumDetailsSheet.tsx';
import { Album } from '../types/index.ts';
import { useLanguage } from '../contexts/LanguageContext.tsx';
import { Button } from '../components/ui/Button.tsx';
import { motion } from 'framer-motion';
import FilterBar from '../components/FilterBar.tsx';

const ALBUMS_PER_PAGE = 24;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const Albums = () => {
    const { albums, loading } = useData();
    const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
    const { t } = useLanguage();
    const [searchParams] = useSearchParams();
    const [visibleCount, setVisibleCount] = useState(ALBUMS_PER_PAGE);
    
    const filteredAlbums = useMemo(() => {
        const selectedArtists = searchParams.get('artists')?.split(',') || [];
        const selectedLabel = searchParams.get('label');
        const minYear = searchParams.get('minYear');
        const maxYear = searchParams.get('maxYear');

        return albums.filter(album => {
            const artistMatch = selectedArtists.length === 0 || selectedArtists.includes(album.artist);
            const labelMatch = !selectedLabel || album.label === selectedLabel;
            const yearMatch = (!minYear || (album.year && album.year >= Number(minYear))) &&
                              (!maxYear || (album.year && album.year <= Number(maxYear)));
            return artistMatch && labelMatch && yearMatch;
        });
    }, [albums, searchParams]);
    
    // Reset pagination when filters change
    useEffect(() => {
        setVisibleCount(ALBUMS_PER_PAGE);
    }, [searchParams]);

    const albumsToShow = useMemo(() => {
        return filteredAlbums.slice(0, visibleCount);
    }, [filteredAlbums, visibleCount]);

    if (loading) return <div className="text-center p-8">{t('loading')}</div>;

    return (
        <>
            <FilterBar />
            <div className="container mx-auto px-4 py-8">
                 <div className="text-left mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-konpa-blue tracking-tight">{t('navAlbums')}</h1>
                    <p className="mt-2 text-lg text-gray-600">{filteredAlbums.length} albums found</p>
                </div>

                {albumsToShow.length > 0 ? (
                    <motion.div 
                        key={searchParams.toString()} // Re-trigger animation on filter change
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {albumsToShow.map(album => (
                            <AlbumCard key={album.id} album={album} onSelect={setSelectedAlbum} />
                        ))}
                    </motion.div>
                ) : (
                    <p className="text-center py-10 text-gray-500">{t('noResults')}</p>
                )}

                {visibleCount < filteredAlbums.length && (
                    <div className="text-center mt-12">
                        <Button 
                            size="lg"
                            onClick={() => setVisibleCount(prev => prev + ALBUMS_PER_PAGE)}
                            className="bg-konpa-gold-500 hover:bg-konpa-gold-600 text-konpa-blue font-bold"
                        >
                            {t('loadMore')}
                        </Button>
                    </div>
                )}
                
                <AlbumDetailsSheet album={selectedAlbum} onClose={() => setSelectedAlbum(null)} />
            </div>
        </>
    );
};

export default Albums;
