
import React, { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useData } from '../contexts/DataContext.tsx';
import { Album, ArtistProfile } from '../types/index.ts';
import Hero from '../components/layout/Hero.tsx';
import AlbumDetailsSheet from '../components/AlbumDetailsSheet.tsx';
import { useLanguage } from '../contexts/LanguageContext.tsx';
import { artistProfiles } from '../assets/artist_profiles.ts';
import ArtistSpotlightCarousel from '../components/ArtistSpotlightCarousel.tsx';
import SpotlightCarousel from '../components/SpotlightCarousel.tsx';

const Home = () => {
  const { albums, loading, error } = useData();
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useLanguage();
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);

  const [randomProfiles, setRandomProfiles] = useState<ArtistProfile[]>([]);

  // Handle opening album from URL
  useEffect(() => {
    const albumIdToOpen = searchParams.get('openAlbum');
    if (albumIdToOpen && albums.length > 0) {
      const album = albums.find(a => a.id === albumIdToOpen);
      if (album) {
        setSelectedAlbum(album);
        searchParams.delete('openAlbum');
        setSearchParams(searchParams, { replace: true });
      }
    }
  }, [searchParams, albums, setSearchParams]);

  // Select random artist profiles on mount
  useEffect(() => {
    const shuffled = [...artistProfiles].sort(() => 0.5 - Math.random());
    setRandomProfiles(shuffled.slice(0, 10));
  }, []);

  const spotlightAlbums = useMemo(() => {
    if (!albums || albums.length === 0) return [];
    return albums
      .filter(a => a.coverUrl && a.year && a.year >= 1980 && a.year <= 2000 && a.tracksCount >= 8)
      .sort((a, b) => b.tracksCount - a.tracksCount)
      .slice(0, 7);
  }, [albums]);

  return (
    <div>
      <Hero />

      {/* Album Spotlight Section */}
      <section id="timeline" className="relative bg-konpa-bg-footer pb-24 pt-20" aria-label="Album Spotlight">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-konpa-gold-500/5 blur-[150px] rounded-full z-0"></div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-konpa-blue">
              {t('albumSpotlightTitle')}
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">{t('albumSpotlightSubtitle')}</p>
          </div>
          {loading && <p className="text-center py-10">{t('loading')}</p>}
          {error && <p className="text-center py-10 text-red-500">{error}</p>}
          {!loading && !error && spotlightAlbums.length > 0 ? (
            <SpotlightCarousel albums={spotlightAlbums} />
          ) : !loading && <p className="text-center py-10 text-gray-500">{t('noResults')}</p>}
        </div>
      </section>

      {/* Artist Spotlight Section */}
       <section className="relative bg-white py-24" aria-label="Artist Spotlight">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 animate-fade-in-up">
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-konpa-blue">
                    {t('artistSpotlightTitle')}
                </h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">{t('artistSpotlightSubtitle')}</p>
            </div>
            {loading && <p className="text-center py-10">{t('loading')}</p>}
            {error && <p className="text-center py-10 text-red-500">{error}</p>}
            {!loading && !error && randomProfiles.length > 0 ? (
                <ArtistSpotlightCarousel profiles={randomProfiles} />
            ) : !loading && <p className="text-center py-10 text-gray-500">{t('noResults')}</p>}
        </div>
      </section>

      <AlbumDetailsSheet album={selectedAlbum} onClose={() => setSelectedAlbum(null)} />
    </div>
  );
};

export default Home;