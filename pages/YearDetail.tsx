import React, { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../contexts/DataContext.tsx';
import { Album } from '../types/index.ts';
import AlbumCard from '../components/AlbumCard.tsx';
import AlbumDetailsSheet from '../components/AlbumDetailsSheet.tsx';
import { useLanguage } from '../contexts/LanguageContext.tsx';

const YearDetail = () => {
    const { year } = useParams<{ year: string }>();
    const { albums, loading } = useData();
    const { t } = useLanguage();
    const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);

    const numericYear = Number(year);

    const yearAlbums = useMemo(() => {
        return albums.filter(album => album.year === numericYear);
    }, [albums, numericYear]);

    if (loading) return <div className="text-center p-8">{t('loading')}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <Link to="/years" className="text-kompa-gold-600 hover:underline">&larr; Back to Years</Link>
                <h1 className="text-4xl font-bold text-gray-900 mt-2">Albums from {year}</h1>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {yearAlbums.map(album => (
                    <AlbumCard key={album.id} album={album} onSelect={setSelectedAlbum} />
                ))}
            </div>

            <AlbumDetailsSheet album={selectedAlbum} onClose={() => setSelectedAlbum(null)} />
        </div>
    );
};

export default YearDetail;