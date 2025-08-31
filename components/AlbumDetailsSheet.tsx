import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Album } from '../types/index.ts';
import { useLanguage } from '../contexts/LanguageContext.tsx';
import { Button } from './ui/Button.tsx';

interface AlbumDetailsSheetProps {
  album: Album | null;
  onClose: () => void;
}

const Placeholder = () => (
    <div className="w-full h-auto aspect-square bg-gray-200 flex items-center justify-center rounded-lg">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
            <path d="M9 18V5l12-2v13"></path>
            <circle cx="6" cy="18" r="3"></circle>
            <circle cx="18" cy="16" r="3"></circle>
        </svg>
    </div>
);

const ShareIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="5" r="3"></circle>
        <circle cx="6" cy="12" r="3"></circle>
        <circle cx="18" cy="19" r="3"></circle>
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
    </svg>
);

const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);

const AlbumDetailsSheet: React.FC<AlbumDetailsSheetProps> = ({ album, onClose }) => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  
  useEffect(() => {
    setCopied(false);
    
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [album, onClose]);
  
  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!album) return;
    
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

  const tracksList = album?.tracks
    .split(',')
    .map(track => track.trim().replace(/^\d+\.\s*/, ''))
    .filter(Boolean) || [];

  return (
    <AnimatePresence>
      {album && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', ease: 'easeInOut', duration: 0.4 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
            aria-modal="true"
            role="dialog"
            aria-labelledby="album-details-title"
          >
            <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-start">
                    <div className="flex-1">
                        <h2 id="album-details-title" className="text-2xl font-bold text-gray-900 leading-tight">{album.album}</h2>
                        <p className="text-lg text-konpa-gold-700">{album.artist}</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close" className=" -mr-2 text-gray-500 hover:text-gray-900">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </Button>
                </div>
            </div>

            <div className="flex-grow overflow-y-auto p-6">
                <div className="relative mb-6">
                  {album.coverUrl ? (
                    <img src={album.coverUrl} alt={`Cover for ${album.album}`} className="rounded-lg w-full aspect-square object-cover shadow-lg" />
                  ) : (
                    <Placeholder />
                  )}
                </div>
                
                <div className="space-y-4">
                    <div className="flex justify-between text-sm text-gray-500 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <div className="text-center flex-1">
                            <div className="font-bold text-gray-800">{album.year || '----'}</div>
                            <div className="text-xs">Year</div>
                        </div>
                         <div className="text-center flex-1 border-x border-gray-200">
                            <div className="font-bold text-gray-800">{tracksList.length}</div>
                            <div className="text-xs">{t('tracks')}</div>
                        </div>
                        <div className="text-center flex-1">
                            <div className="font-bold text-gray-800 truncate px-1" title={album.label}>{album.label || 'N/A'}</div>
                            <div className="text-xs">Label</div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                        <Button variant="outline" onClick={handleShare} className="w-full">
                            {copied ? <CheckIcon className="mr-2" /> : <ShareIcon className="mr-2" />}
                            <span>{copied ? 'Link Copied!' : 'Share'}</span>
                        </Button>
                    </div>
                </div>

                {tracksList.length > 0 && (
                    <div className="mt-6">
                        <ol className="space-y-1 text-gray-700 text-sm">
                            {tracksList.map((track, index) => (
                                <li key={index} className="flex items-baseline p-3 rounded-md hover:bg-gray-100 transition-colors">
                                    <span className="text-gray-400 font-mono text-xs w-6 text-right mr-3">{index + 1}.</span>
                                    <span className="flex-1">{track}</span>
                                </li>
                            ))}
                        </ol>
                    </div>
                )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AlbumDetailsSheet;