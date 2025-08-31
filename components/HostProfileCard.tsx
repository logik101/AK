import React from 'react';
import { HostProfile } from '../types/index.ts';
import { Card } from './ui/Card.tsx';

interface HostProfileCardProps {
    host: HostProfile;
}

const SocialIcon = ({ platform }: { platform: string }) => {
    const lowerPlatform = platform.toLowerCase();

    if (lowerPlatform.includes('facebook')) {
        return (
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
            </svg>
        );
    }
    if (lowerPlatform.includes('instagram')) {
        return (
             <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" />
            </svg>
        );
    }
     if (lowerPlatform.includes('x') || lowerPlatform.includes('twitter')) {
        return (
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        );
    }
    return null;
};


const HostProfileCard: React.FC<HostProfileCardProps> = ({ host }) => {
    return (
        <Card className="h-full transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl overflow-hidden bg-gradient-to-br from-white to-gray-50/50">
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 p-6">
                <div className="w-24 h-24 md:w-28 md:h-28 flex-shrink-0 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden shadow-md">
                     <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a5 5 0 0 0-5 5v6a5 5 0 0 0 10 0V7a5 5 0 0 0-5-5Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>
                </div>
                <div className="flex-grow flex flex-col justify-between self-stretch text-center sm:text-left">
                    <div>
                        <h2 className="text-xl font-bold text-konpa-blue">{host.name}</h2>
                        <p className="text-gray-600 text-sm mt-1 line-clamp-4">{host.bio}</p>
                    </div>
                    {host.links && host.links.length > 0 && (
                        <div className="mt-4 flex justify-center sm:justify-start space-x-2">
                             {host.links.map((link) => (
                                <a 
                                    key={`${link.platform}-${host.name}`} 
                                    href={link.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="p-2.5 rounded-full bg-white border border-konpa-gold-600/50 text-konpa-gold-600 hover:bg-konpa-gold-600 hover:text-white transition-all transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-konpa-gold-500"
                                    aria-label={`Connect with ${host.name} on ${link.platform}`}
                                >
                                    <SocialIcon platform={link.platform} />
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Card>
    );
};

export default HostProfileCard;