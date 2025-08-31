
import React, { useMemo, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useData } from '../contexts/DataContext.tsx';
import AlbumCard from '../components/AlbumCard.tsx';
import AlbumDetailsSheet from '../components/AlbumDetailsSheet.tsx';
import { Album, ArtistProfile } from '../types/index.ts';
import { useLanguage } from '../contexts/LanguageContext.tsx';
import { Button } from '../components/ui/Button.tsx';
import { SingleSlider } from '../components/ui/SingleSlider.tsx';
import { artistProfiles } from '../assets/artist_profiles.ts';
import ArtistProfileCard from '../components/ArtistProfileCard.tsx';
import { GoogleGenAI, Type } from "@google/genai";
import { useArtistProfile } from '../contexts/ArtistProfileContext.tsx';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const ArtistDetail = () => {
    const { name } = useParams<{ name: string }>();
    const { albums, loading } = useData();
    const { t } = useLanguage();
    const { getProfile, addGeneratedProfile } = useArtistProfile();
    const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
    const [selectedYear, setSelectedYear] = useState<string | null>(null);
    const [selectedYearIndex, setSelectedYearIndex] = useState(0);
    const [generatedProfile, setGeneratedProfile] = useState<ArtistProfile | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generationError, setGenerationError] = useState<string | null>(null);


    const artistName = decodeURIComponent(name || '');

    const staticProfile = useMemo(() => {
        return artistProfiles.find(p => p.artist.toLowerCase() === artistName.toLowerCase());
    }, [artistName]);
    
    const dynamicProfile = getProfile(artistName);

    const artistAlbums = useMemo(() => {
        return albums.filter(album => album.artist === artistName);
    }, [albums, artistName]);
    
    const albumsByYear = useMemo(() => {
        return artistAlbums.reduce((acc, album) => {
          const year = album.year || 'Unknown';
          if (!acc[year]) {
            acc[year] = [];
          }
          acc[year].push(album);
          return acc;
        }, {} as Record<string, Album[]>);
    }, [artistAlbums]);

    const sortedYears = useMemo(() => {
        return Object.keys(albumsByYear).sort((a, b) => {
            if (a === 'Unknown') return 1;
            if (b === 'Unknown') return -1;
            return Number(b) - Number(a);
        });
    }, [albumsByYear]);
    
    useEffect(() => {
        if (sortedYears.length > 0 && !selectedYear) {
            setSelectedYear(sortedYears[0]);
            setSelectedYearIndex(0);
        }
    }, [sortedYears, selectedYear]);

    useEffect(() => {
        const index = sortedYears.indexOf(selectedYear || '');
        if (index !== -1 && index !== selectedYearIndex) {
            setSelectedYearIndex(index);
        }
    }, [selectedYear, sortedYears, selectedYearIndex]);

    const handleSliderChange = (index: number) => {
        setSelectedYearIndex(index);
        if (sortedYears[index]) {
            setSelectedYear(sortedYears[index]);
        }
    };

    const handleGenerateProfile = async () => {
        // FIX: Per coding guidelines, the API_KEY is assumed to be present and valid.
        // The check for its existence has been removed.
        setIsGenerating(true);
        setGenerationError(null);
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            
            const prompt = `Generate a concise artist profile for the Haitian Konpa artist "${artistName}". Provide a brief overview of their career and influence, and a list of 5 of their most popular or representative songs. Format the output as a JSON object.`;

            const response = await ai.models.generateContent({
                // FIX: Per coding guidelines, use 'gemini-2.5-flash' for general text tasks.
                model: "gemini-2.5-flash",
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            overview: { type: Type.STRING, description: "A brief overview of the artist's career and influence." },
                            popularSongs: {
                              type: Type.ARRAY,
                              description: "A list of 5 popular or representative songs.",
                              items: { type: Type.STRING }
                            }
                        },
                        required: ['overview', 'popularSongs']
                    }
                }
            });

            // FIX: Per coding guidelines, trim whitespace from the response text before parsing JSON.
            const profileData = JSON.parse(response.text.trim());
            const newProfile: ArtistProfile = {
                artist: artistName,
                overview: profileData.overview,
                popularSongs: profileData.popularSongs,
                imageUrl: artistAlbums.find(a => a.coverUrl)?.coverUrl || ''
            };
            setGeneratedProfile(newProfile);
            addGeneratedProfile(newProfile);

        } catch (error) {
            console.error("Error generating AI profile:", error);
            setGenerationError("Failed to generate profile. Please try again.");
        } finally {
            setIsGenerating(false);
        }
    };

    const albumsForSelectedYear = useMemo(() => {
        return selectedYear ? albumsByYear[selectedYear] : [];
    }, [selectedYear, albumsByYear]);

    if (loading) return <div className="text-center p-8">{t('loading')}</div>;
    
    const displayProfile = staticProfile || dynamicProfile || generatedProfile;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <Link to="/artists" className="text-kompa-gold-600 hover:underline">&larr; {t('navArtists')}</Link>
                <h1 className="text-4xl font-bold text-gray-900 mt-2">{artistName}</h1>
            </div>
            
            {displayProfile ? (
                <div className="mb-12">
                    <ArtistProfileCard profile={displayProfile} />
                </div>
            ) : (
                <div className="mb-12 text-center p-8 bg-gray-50 rounded-lg">
                    <p className="text-gray-600 mb-4">No detailed profile available for this artist yet.</p>
                    <Button onClick={handleGenerateProfile} disabled={isGenerating}>
                        {isGenerating ? t('generating') : t('generateAIProfile')}
                    </Button>
                    {generationError && <p className="text-red-500 text-sm mt-2">{generationError}</p>}
                </div>
            )}
            
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Discography</h2>
             <p className="text-gray-500 mb-4">{artistAlbums.length} albums</p>

            {sortedYears.length > 1 && (
                <div className="mb-8 sticky top-16 bg-white/80 backdrop-blur-md z-30 py-4 -mx-4 px-4 border-b border-gray-200">
                    <div className="flex space-x-2 overflow-x-auto pb-2 hide-scrollbar">
                        {sortedYears.map(year => (
                            <Button
                                key={year}
                                variant={selectedYear === year ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setSelectedYear(year)}
                                className={`flex-shrink-0 !rounded-full ${selectedYear === year ? '!bg-kompa-gold-500 !text-konpa-blue border-2 border-konpa-blue' : ''}`}
                            >
                                {year}
                            </Button>
                        ))}
                    </div>
                     <div className="mt-4 pt-2 px-2">
                        <SingleSlider 
                           min={0}
                           max={sortedYears.length - 1}
                           value={selectedYearIndex}
                           onChange={handleSliderChange}
                           labels={sortedYears}
                        />
                    </div>
                </div>
            )}
            
            {selectedYear && (
                <section>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">{selectedYear}</h3>
                    <motion.div 
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        key={selectedYear}
                    >
                        {albumsForSelectedYear.map(album => (
                            <AlbumCard key={album.id} album={album} onSelect={setSelectedAlbum} />
                        ))}
                    </motion.div>
                </section>
            )}
            
            <AlbumDetailsSheet album={selectedAlbum} onClose={() => setSelectedAlbum(null)} />
        </div>
    );
};

export default ArtistDetail;
