
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Album } from '../types/index.ts';
import { useLanguage } from '../contexts/LanguageContext.tsx';
import { Card } from './ui/Card.tsx';

const Placeholder = () => (
    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
            <path d="M9 18V5l12-2v13"></path>
            <circle cx="6" cy="18" r="3"></circle>
            <circle cx="18" cy="16" r="3"></circle>
        </svg>
    </div>
);

const ShareIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="5" r="3"></circle>
        <circle cx="6" cy="12" r="3"></circle>
        <circle cx="18" cy="19" r="3"></circle>
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
    </svg>
);

const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);

interface AlbumCardProps {
  album: Album;
  onSelect: (album: Album) => void;
}

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
};

const AlbumCard: React.FC<AlbumCardProps> = ({ album, onSelect }) => {
  const [hasError, setHasError] = useState(false);
  const [copied, setCopied] = useState(false);
  const { t } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);
  
  const imageUrl = album.coverUrl;

  const showPlaceholder = !imageUrl || hasError;

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}${window.location.pathname}#/?openAlbum=${album.id}`;
    const shareData = {
      title: `${album.album} by ${album.artist}`,
      text: `Check out ${album.album} by ${album.artist} on Konpa Discography.`,
      url: shareUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        console.error('Failed to copy:', error);
        alert('Failed to copy link.');
      }
    }
  };

  return (
    <motion.div
        ref={cardRef}
        variants={itemVariants}
    >
        <Card 
        className="overflow-hidden group cursor-pointer h-full flex flex-col transition-all duration-300 ease-in-out hover:shadow-2xl transform hover:-translate-y-2"
        onClick={() => onSelect(album)}
        tabIndex={0}
        onKeyPress={(e) => (e.key === 'Enter' || e.key === ' ') && onSelect(album)}
        >
        <div className="aspect-square relative">
            {showPlaceholder ? (
            <Placeholder />
            ) : (
            <img
                src={imageUrl}
                alt={`Cover for ${album.album}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
                onError={() => setHasError(true)}
                style={{ imageRendering: '-webkit-optimize-contrast' }}
            />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div 
              className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              title={copied ? "Link Copied!" : "Share"}
            >
              <button
                onClick={handleShare}
                className="p-2.5 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm transition-all focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Share album"
              >
                {copied ? <CheckIcon /> : <ShareIcon />}
              </button>
            </div>
            <div className="absolute bottom-0 left-0 p-4 text-white">
                <h3 className="font-bold truncate text-base leading-tight">{album.album}</h3>
                <p className="text-sm text-gray-300 truncate">{album.artist}</p>
            </div>
        </div>
        <div className="p-3 bg-gray-50 text-xs text-gray-500 flex justify-between items-center mt-auto border-t border-gray-100">
            <span className="truncate pr-2">{album.label || 'N/A'}</span>
            {album.tracksCount > 0 && <span className="flex-shrink-0">{album.tracksCount} {t('tracks')}</span>}
        </div>
        </Card>
    </motion.div>
  );
};

export default React.memo(AlbumCard);