import React from 'react';
import { ArtistProfile } from '../types/index.ts';
import { useLanguage } from '../contexts/LanguageContext.tsx';
import { Card } from './ui/Card.tsx';

interface ArtistProfileCardProps {
    profile: ArtistProfile;
}

const SocialLink = ({ platform, url }: { platform: string, url: string }) => {
    const getIcon = (p: string) => {
        const lowerP = p.toLowerCase();
        if (lowerP.includes('spotify')) return '🎵';
        if (lowerP.includes('youtube')) return '▶️';
        if (lowerP.includes('instagram')) return '📸';
        return '🔗';
    }
    return (
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-sm text-konpa-blue hover:text-konpa-gold-600 flex items-center">
            <span className="mr-2">{getIcon(platform)}</span> {platform}
        </a>
    )
}

const ArtistProfileCard: React.FC<ArtistProfileCardProps> = ({ profile }) => {
    const { t } = useLanguage();
    
    return (
        <Card className="group p-6 md:p-8 w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 items-start bg-white/50 transition-all duration-300 ease-in-out border-2 border-kompa-gold-400 hover:shadow-2xl">
            <div className="md:col-span-1 flex flex-col items-center md:items-start">
                 <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl bg-gray-200 border-4 border-transparent group-hover:border-kompa-gold-400 transition-all duration-300 group-hover:scale-105 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2a5 5 0 0 0-5 5v6a5 5 0 0 0 10 0V7a5 5 0 0 0-5-5Z"/>
                        <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                        <line x1="12" y1="19" x2="12" y2="22"/>
                    </svg>
                </div>
                <div className="mt-4 space-y-1 text-sm text-gray-600 w-full">
                   {profile.fullName && <p><strong className="font-semibold text-gray-800">Full Name:</strong> {profile.fullName}</p>}
                   {profile.born && <p><strong className="font-semibold text-gray-800">Born:</strong> {profile.born}</p>}
                   {profile.origin && <p><strong className="font-semibold text-gray-800">Origin:</strong> {profile.origin}</p>}
                   {profile.genre && <p><strong className="font-semibold text-gray-800">Genre:</strong> {profile.genre}</p>}
                </div>
                {profile.following && profile.following.length > 0 && (
                    <div className="mt-4">
                        <h4 className="font-bold text-konpa-blue mb-2">{t('profileFollowing')}</h4>
                        <div className="space-y-1 text-sm">
                            {profile.following.map(item => (
                                <p key={item.platform} className="text-gray-600"><strong className="font-semibold text-gray-800">{item.platform}:</strong> {item.count}</p>
                            ))}
                        </div>
                    </div>
                )}
                 {profile.links && profile.links.length > 0 && (
                    <div className="mt-4">
                        <h4 className="font-bold text-konpa-blue mb-2">{t('profileLinks')}</h4>
                        <div className="space-y-1">
                            {profile.links.map(link => <SocialLink key={link.platform} {...link} />)}
                        </div>
                    </div>
                )}
            </div>
            <div className="md:col-span-3">
                <h2 className="text-3xl font-bold text-konpa-blue">{profile.artist}</h2>
                
                <div className="mt-4">
                    <h3 className="font-bold text-lg text-konpa-gold-700 mb-2 border-b border-konpa-gold-200 pb-1">{t('profileOverview')}</h3>
                    <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{profile.overview}</p>
                </div>

                {profile.popularSongs && profile.popularSongs.length > 0 && (
                    <div className="mt-6">
                         <h3 className="font-bold text-lg text-konpa-gold-700 mb-2 border-b border-konpa-gold-200 pb-1">{t('profilePopularSongs')}</h3>
                         <ul className="list-disc list-inside text-gray-700 space-y-1 mt-3">
                            {profile.popularSongs.map(song => <li key={song}>{song}</li>)}
                         </ul>
                    </div>
                )}
            </div>
        </Card>
    );
};

export default ArtistProfileCard;