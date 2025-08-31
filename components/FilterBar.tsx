import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../contexts/DataContext.tsx';
import { useLanguage } from '../contexts/LanguageContext.tsx';
import { Button } from './ui/Button.tsx';
import { Slider } from './ui/Slider.tsx';

const FilterDrawer = ({
    isOpen,
    onClose,
    children
}: {
    isOpen: boolean,
    onClose: () => void,
    children: React.ReactNode
}) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 z-40"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="fixed top-0 left-0 h-full w-full max-w-xs bg-white z-50 p-6 overflow-y-auto"
                    >
                        {children}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
};


const FilterControls = ({ isMobile = false }: { isMobile?: boolean}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { artists, labels, stats } = useData();
    const { t } = useLanguage();
  
    const [selectedArtists, setSelectedArtists] = useState<string[]>(() => searchParams.get('artists')?.split(',').filter(Boolean) || []);
    const [selectedLabel, setSelectedLabel] = useState<string>(searchParams.get('label') || '');
    const [yearRange, setYearRange] = useState<[number, number]>(() => {
      const min = searchParams.get('minYear');
      const max = searchParams.get('maxYear');
      if (stats && (min || max)) {
          return [Number(min || stats.yearSpan[0]), Number(max || stats.yearSpan[1])];
      }
      return stats ? stats.yearSpan : [1950, new Date().getFullYear()];
    });
    
    const [isArtistDropdownOpen, setArtistDropdownOpen] = useState(false);
  
    useEffect(() => {
      if (stats) {
        setYearRange(prev => [
            Number(searchParams.get('minYear') || stats.yearSpan[0]),
            Number(searchParams.get('maxYear') || stats.yearSpan[1])
        ]);
      }
    }, [stats, searchParams]);
  
    useEffect(() => {
      const params = new URLSearchParams(searchParams);
      
      if (selectedArtists.length > 0) params.set('artists', selectedArtists.join(','));
      else params.delete('artists');
  
      if (selectedLabel) params.set('label', selectedLabel);
      else params.delete('label');
      
      if (stats && yearRange[0] !== stats.yearSpan[0]) params.set('minYear', String(yearRange[0]));
      else params.delete('minYear');
  
      if (stats && yearRange[1] !== stats.yearSpan[1]) params.set('maxYear', String(yearRange[1]));
      else params.delete('maxYear');
  
      // We remove the search query when filters are applied
      params.delete('q');
      
      setSearchParams(params, { replace: true });
    }, [selectedArtists, selectedLabel, yearRange, stats, setSearchParams]);
  
  
    const handleArtistToggle = (artist: string) => {
      setSelectedArtists(prev =>
        prev.includes(artist) ? prev.filter(a => a !== artist) : [...prev, artist]
      );
    };
  
    const handleReset = () => {
      setSelectedArtists([]);
      setSelectedLabel('');
      if (stats) setYearRange(stats.yearSpan);
      setSearchParams({}, { replace: true });
    };
    
    if (!stats) return null;

    return (
        <div className={isMobile ? "flex flex-col space-y-6" : "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center"}>
            <div className="relative col-span-1">
                <Button variant="outline" className="w-full justify-between" onClick={() => setArtistDropdownOpen(!isArtistDropdownOpen)}>
                    <span>{t('filterByArtist')} ({selectedArtists.length})</span>
                    <svg className={`w-4 h-4 transition-transform ${isArtistDropdownOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </Button>
                {isArtistDropdownOpen && (
                    <div className="absolute z-10 top-full mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                        {artists.map(artist => (
                            <label key={artist} className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer">
                                <input type="checkbox" checked={selectedArtists.includes(artist)} onChange={() => handleArtistToggle(artist)} className="mr-2 h-4 w-4 rounded bg-gray-100 border-gray-300 text-kompa-gold-600 focus:ring-kompa-gold-500 accent-kompa-gold-500" />
                                {artist}
                            </label>
                        ))}
                    </div>
                )}
            </div>

            <div className="lg:col-span-2 md:col-span-1">
                <p className="text-sm text-gray-500 mb-2">{t('filterByYear')}</p>
                <Slider
                    min={stats.yearSpan[0]}
                    max={stats.yearSpan[1]}
                    value={yearRange}
                    onChange={setYearRange}
                />
            </div>
            
            <div className={isMobile ? "flex flex-col space-y-2" : "flex items-center space-x-2"}>
                <select
                    value={selectedLabel}
                    onChange={e => setSelectedLabel(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kompa-gold-500 focus-visible:ring-offset-2"
                >
                    <option value="">{t('allLabels')}</option>
                    {labels.map(label => <option key={label} value={label}>{label}</option>)}
                </select>
                <Button onClick={handleReset} variant="ghost" className={isMobile ? "w-full" : ""}>{t('resetFilters')}</Button>
            </div>
        </div>
    )
}

const FilterBar = () => {
    const { t } = useLanguage();
    const [isDrawerOpen, setDrawerOpen] = useState(false);

    return (
        <div className="sticky top-16 z-40 bg-gray-50/80 backdrop-blur-sm p-4 border-b border-gray-200">
            <div className="container mx-auto">
                <div className="md:hidden">
                    <Button variant="outline" onClick={() => setDrawerOpen(true)} className="w-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 12.414V17a1 1 0 01-1.447.894l-2-1A1 1 0 018 16v-3.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                        </svg>
                        {t('filters')}
                    </Button>
                </div>
                <div className="hidden md:block">
                    <FilterControls />
                </div>
            </div>
            <FilterDrawer isOpen={isDrawerOpen} onClose={() => setDrawerOpen(false)}>
                <h2 className="text-xl font-bold text-gray-900 mb-6">{t('filters')}</h2>
                <FilterControls isMobile={true} />
            </FilterDrawer>
        </div>
    );
};

export default FilterBar;