import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../contexts/DataContext.tsx';
import { Card } from './ui/Card.tsx';
import { artistProfiles } from '../assets/artist_profiles.ts';
import { useArtistProfile } from '../contexts/ArtistProfileContext.tsx';
import { motion } from 'framer-motion';

interface ArtistGridCardProps {
    artistName: string;
}

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
};

const Placeholder = () => (
    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
    </div>
);

const ArtistGridCard: React.FC<ArtistGridCardProps> = ({ artistName }) => {
    const { albums } = useData();
    const { getProfile } = useArtistProfile();
    const [imageHasError, setImageHasError] = useState(false);
    
    const staticProfile = useMemo(() => artistProfiles.find(p => p.artist === artistName), [artistName]);
    const dynamicProfile = getProfile(artistName);
    const profile = staticProfile || dynamicProfile;

    const artistAlbums = useMemo(() => albums.filter(album => album.artist === artistName), [albums, artistName]);
    
    const coverUrl = useMemo(() => {
        if (profile?.imageUrl && profile.imageUrl !== '') return profile.imageUrl;
        return artistAlbums.find(a => a.coverUrl)?.coverUrl;
    }, [profile, artistAlbums]);

    const showPlaceholder = !coverUrl || imageHasError;

    const albumCount = artistAlbums.length;

    return (
        <motion.div variants={itemVariants}>
            <Link to={`/artists/${encodeURIComponent(artistName)}`} className="block group">
                <Card className="overflow-hidden transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-konpa-blue/10">
                    <div className="aspect-square relative bg-gray-100">
                        {showPlaceholder ? <Placeholder /> : (
                            <img
                                src={coverUrl}
                                alt={artistName}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                onError={() => setImageHasError(true)}
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                         <div className="absolute bottom-0 left-0 p-4 text-white w-full">
                            <h2 className="font-bold text-lg text-white truncate group-hover:text-konpa-gold-300 transition-colors">{artistName}</h2>
                            {albumCount > 0 && (
                                <p className="text-sm text-gray-300">{albumCount} {albumCount > 1 ? 'albums' : 'album'}</p>
                            )}
                        </div>
                    </div>
                </Card>
            </Link>
        </motion.div>
    );
};
export default ArtistGridCard;