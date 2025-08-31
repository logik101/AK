
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext.tsx';
import { Button } from './ui/Button.tsx';

const COOKIE_CONSENT_KEY = 'haitian-konpa-cookie-consent';

const CookieConsent = () => {
    const { t } = useLanguage();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        try {
            const consentGiven = localStorage.getItem(COOKIE_CONSENT_KEY);
            if (!consentGiven) {
                setIsVisible(true);
            }
        } catch (error) {
            console.error("Could not access localStorage:", error);
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        try {
            localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
        } catch (error) {
            console.error("Could not write to localStorage:", error);
        }
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: '100%' }}
                    animate={{ y: '0%' }}
                    exit={{ y: '100%' }}
                    transition={{ type: 'tween', ease: 'easeInOut', duration: 0.5 }}
                    className="fixed bottom-0 left-0 right-0 z-[101] bg-white/90 backdrop-blur-md shadow-[0_-2px_10px_rgba(0,0,0,0.1)] border-t border-gray-200"
                    role="dialog"
                    aria-live="polite"
                    aria-label="Cookie consent"
                >
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <p className="text-sm text-gray-700 text-center sm:text-left">
                                {t('cookieConsentMessage')}{' '}
                                <Link to="/terms" className="font-semibold text-konpa-gold-600 hover:underline">
                                    {t('cookieConsentLink')}
                                </Link>.
                            </p>
                            <Button onClick={handleAccept} size="sm" className="bg-konpa-blue hover:bg-konpa-blue/90 text-white flex-shrink-0">
                                {t('cookieConsentAccept')}
                            </Button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CookieConsent;
