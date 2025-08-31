
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { NavLink, useNavigate, useSearchParams, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext.tsx';
import { cn } from '../../lib/utils.ts';
import { Input } from '../ui/Input.tsx';
import { Button } from '../ui/Button.tsx';
import { useData } from '../../contexts/DataContext.tsx';
import { useDebounce } from '../../hooks/useDebounce.ts';
import { Album } from '../../types/index.ts';
import { useSupportModal } from '../../contexts/SupportModalContext.tsx';

const SearchResults = ({ results, onLinkClick }: { results: { artists: Album['artist'][]; albums: Album[] }; onLinkClick: () => void }) => {
    const { t } = useLanguage();
    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-2 w-full md:w-80 bg-white border border-gray-200 rounded-lg shadow-xl z-50"
        >
            <div className="max-h-[60vh] overflow-y-auto rounded-lg">
                {results.artists.length === 0 && results.albums.length === 0 ? (
                    <p className="p-4 text-sm text-gray-500">{t('noResults')}</p>
                ) : (
                    <>
                        {results.artists.length > 0 && (
                            <div>
                                <h3 className="text-xs font-semibold text-gray-400 uppercase p-3 border-b border-gray-100">{t('navArtists')}</h3>
                                <ul>
                                    {results.artists.map(artist => (
                                        <li key={artist}>
                                            <Link to={`/artists/${encodeURIComponent(artist)}`} onClick={onLinkClick} className="block px-4 py-2.5 text-sm text-konpa-blue hover:bg-konpa-bg-search transition-colors duration-200">{artist}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {results.albums.length > 0 && (
                             <div>
                                <h3 className="text-xs font-semibold text-gray-400 uppercase p-3 border-t border-gray-100">{t('navAlbums')}</h3>
                                <ul>
                                    {results.albums.map(album => (
                                        <li key={album.id}>
                                            <Link to={`/?openAlbum=${album.id}`} onClick={onLinkClick} className="block px-4 py-2.5 text-sm text-konpa-blue hover:bg-konpa-bg-search transition-colors duration-200">
                                                <div className="font-semibold">{album.album}</div>
                                                <div className="text-xs text-gray-500">{album.artist}</div>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </>
                )}
            </div>
        </motion.div>
    )
}

const NavItem = ({ to, children, onClick }: { to: string; children: React.ReactNode, onClick?: () => void }) => {
    const commonClasses = "relative group transition duration-200 text-base md:text-sm";
    const activeClass = "text-konpa-gold-600 font-semibold";
    const inactiveClass = "text-konpa-blue hover:text-konpa-gold-600";
    
    return (
        <NavLink
            to={to}
            onClick={onClick}
            className={({ isActive }) => `${commonClasses} ${isActive ? activeClass : inactiveClass}`}
        >
            {children}
            <span className={cn(
                "absolute left-1/2 -bottom-1 h-[2px] bg-konpa-gold-600 rounded-full transition-all duration-300 transform -translate-x-1/2",
                "w-0 group-hover:w-full"
            )}></span>
             <NavLink to={to} className={({isActive}) => isActive ? "absolute left-0 -bottom-1 h-[2px] bg-konpa-gold-600 rounded-full w-full" : "hidden"} />
        </NavLink>
    );
};

const languageOptions = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'ht', name: 'Kreyòl', flag: '🇭🇹' },
];

const MobileMenu = ({ isOpen, closeMenu }: { isOpen: boolean, closeMenu: () => void }) => {
    const { t, language, setLanguage } = useLanguage();
    const { openModal } = useSupportModal();

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={closeMenu}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="fixed inset-0 bg-gray-50 z-50 flex flex-col items-center justify-center space-y-8 text-2xl font-bold"
                        onClick={(e) => e.stopPropagation()}
                    >
                         <Button
                            variant="ghost"
                            size="icon"
                            onClick={closeMenu}
                            className="absolute top-4 right-4 text-konpa-blue"
                        >
                             <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </Button>
                        <NavItem to="/" onClick={closeMenu}>{t('Home')}</NavItem>
                        <NavItem to="/artists" onClick={closeMenu}>{t('navArtists')}</NavItem>
                        <NavItem to="/albums" onClick={closeMenu}>{t('navAlbums')}</NavItem>
                        <NavItem to="/years" onClick={closeMenu}>{t('navYears')}</NavItem>
                        <NavItem to="/host" onClick={closeMenu}>{t('navHost')}</NavItem>
                        <NavItem to="/about" onClick={closeMenu}>{t('navAbout')}</NavItem>
                        <div className="pt-8 flex flex-col items-center space-y-4 w-full px-8">
                             <Button
                                onClick={() => { openModal(); closeMenu(); }}
                                size="lg"
                                className="w-full bg-konpa-blue text-white hover:bg-konpa-blue/90"
                            >
                                <span className="font-bold text-lg mr-2">$</span>
                                {t('supportUs')}
                            </Button>
                             <div className="w-full border-t border-gray-200 pt-4">
                                {languageOptions.map((option) => (
                                    <button
                                        key={option.code}
                                        onClick={() => {
                                            setLanguage(option.code as 'en' | 'fr' | 'ht');
                                            closeMenu();
                                        }}
                                        className={`w-full flex items-center justify-center p-3 my-1 rounded-md text-xl transition-colors ${
                                            language === option.code
                                                ? 'bg-konpa-gold-100 text-konpa-gold-700 font-bold'
                                                : 'text-konpa-blue hover:bg-gray-200'
                                        }`}
                                    >
                                        <span className="mr-3 text-2xl">{option.flag}</span>
                                        <span>{option.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const NavBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [isLangOpen, setLangOpen] = useState(false);
    const location = useLocation();
    const { language, setLanguage, t } = useLanguage();
    const { artists, albums } = useData();
    const { openModal } = useSupportModal();
    const debouncedSearchTerm = useDebounce(searchTerm, 300);
    const searchRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLElement>(null);
    const langRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsMenuOpen(false);
        setIsSearchVisible(false);
        setSearchTerm('');
    }, [location]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (searchRef.current && !searchRef.current.contains(target) && navRef.current && !navRef.current.contains(target)) {
                setIsSearchVisible(false);
            }
            if (langRef.current && !langRef.current.contains(target)) {
                setLangOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const searchResults = useMemo(() => {
        if (!debouncedSearchTerm) return null;

        const lowerCaseQuery = debouncedSearchTerm.toLowerCase();
        const filteredArtists = artists
            .filter(artist => artist.toLowerCase().includes(lowerCaseQuery))
            .slice(0, 5);
        
        const filteredAlbums = albums
            .filter(album => 
                album.album.toLowerCase().includes(lowerCaseQuery) || 
                album.artist.toLowerCase().includes(lowerCaseQuery) ||
                album.tracks.toLowerCase().includes(lowerCaseQuery)
            )
            .slice(0, 10);

        return { artists: filteredArtists, albums: filteredAlbums };
    }, [debouncedSearchTerm, artists, albums]);

    const currentLang = languageOptions.find(l => l.code === language);

    return (
        <header ref={navRef} className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                       <img src="https://logik101.github.io/iscograph/album_cover/music.png" alt="Ayiti Konpa Logo" className="h-8 w-8" />
                        <span className="text-lg sm:text-xl font-extrabold tracking-tight text-konpa-blue flex items-center">
                            Ayiti Konpa
                        </span>
                    </Link>
                    
                    <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
                       <NavItem to="/">{t('Home')}</NavItem>
                       <NavItem to="/artists">{t('navArtists')}</NavItem>
                       <NavItem to="/albums">{t('navAlbums')}</NavItem>
                       <NavItem to="/years">{t('navYears')}</NavItem>
                       <NavItem to="/host">{t('navHost')}</NavItem>
                       <NavItem to="/about">{t('navAbout')}</NavItem>
                    </nav>

                    <div className="flex items-center space-x-2">
                        <div className="relative hidden md:flex" ref={searchRef}>
                            <Input
                                type="search"
                                placeholder={t('searchPlaceholder')}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onFocus={() => setIsSearchVisible(true)}
                                className="px-4 py-1.5 text-sm rounded-full bg-konpa-bg-search border-gray-200 shadow-inner focus:outline-none text-konpa-blue placeholder:text-gray-500/80 w-40 lg:w-56"
                            />
                            <AnimatePresence>
                               {isSearchVisible && searchResults && <SearchResults results={searchResults} onLinkClick={() => setIsSearchVisible(false)} />}
                            </AnimatePresence>
                        </div>
                        <Button
                            onClick={openModal}
                            className="hidden md:inline-flex bg-konpa-blue text-white hover:bg-konpa-blue/90 rounded-full px-5 py-2 h-auto"
                        >
                            <span className="font-bold text-lg mr-2">$</span>
                            {t('supportUs')}
                        </Button>
                        <div className="relative hidden md:inline-flex" ref={langRef}>
                            <Button onClick={() => setLangOpen(!isLangOpen)} variant="ghost" className="items-center !rounded-full border border-gray-300 hover:bg-gray-100 transition text-konpa-blue px-3 h-10">
                                <span className="text-lg mr-2">{currentLang?.flag}</span>
                                <span className="text-sm font-bold">{currentLang?.code.toUpperCase()}</span>
                                <svg className={`w-4 h-4 ml-1.5 text-gray-500 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </Button>
                            <AnimatePresence>
                                {isLangOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -5, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -5, scale: 0.95 }}
                                        className="absolute top-full right-0 mt-2 w-44 bg-white border rounded-md shadow-lg z-50 overflow-hidden"
                                    >
                                        <ul>
                                            {languageOptions.map(option => (
                                                <li key={option.code}>
                                                    <button
                                                        onClick={() => { setLanguage(option.code as 'en' | 'fr' | 'ht'); setLangOpen(false); }}
                                                        className={`w-full text-left px-3 py-2 text-sm flex items-center transition-colors duration-150 ${language === option.code ? 'bg-konpa-bg-search text-konpa-blue font-semibold' : 'text-gray-700 hover:bg-gray-100'}`}
                                                    >
                                                        <span className="text-xl mr-3">{option.flag}</span>
                                                        {option.name}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        <button className="md:hidden text-konpa-blue focus:outline-none" aria-label="Toggle Menu" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
             <div className="md:hidden p-2 border-t border-gray-200/80" ref={searchRef}>
                <Input
                    type="search"
                    placeholder={t('searchPlaceholder')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setIsSearchVisible(true)}
                    className="w-full px-4 py-1.5 text-sm rounded-full bg-konpa-bg-search border-gray-200 shadow-inner focus:outline-none text-konpa-blue placeholder:text-gray-500/80"
                />
                <AnimatePresence>
                    {isSearchVisible && searchResults && <SearchResults results={searchResults} onLinkClick={() => {setIsSearchVisible(false); setIsMenuOpen(false);}} />}
                </AnimatePresence>
            </div>
            <MobileMenu isOpen={isMenuOpen} closeMenu={() => setIsMenuOpen(false)} />
        </header>
    );
};

export default NavBar;
