import React from 'react';
import { useLanguage } from '../contexts/LanguageContext.tsx';

const TermsOfUse = () => {
    const { t } = useLanguage();

    return (
        <div className="bg-white py-16 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
                <div className="prose lg:prose-lg mx-auto text-gray-700">
                    <h1 className="text-konpa-gold-600 font-bold">{t('termsTitle')}</h1>
                    
                    <h2 className="text-konpa-blue font-bold">{t('terms1Title')}</h2>
                    <p>{t('terms1Text')}</p>

                    <h2 className="text-konpa-blue font-bold">{t('terms2Title')}</h2>
                    <p>{t('terms2Text')}</p>

                    <h2 className="text-konpa-blue font-bold">{t('terms3Title')}</h2>
                    <p>{t('terms3Text')}</p>

                    <h2 className="text-konpa-blue font-bold">{t('terms4Title')}</h2>
                    <p>{t('terms4Text')}</p>

                    <h2 className="text-konpa-blue font-bold">{t('terms5Title')}</h2>
                    <p>{t('terms5Text')}</p>

                    <h2 className="text-konpa-blue font-bold">{t('terms6Title')}</h2>
                    <p>{t('terms6Text')}</p>

                    <h2 className="text-konpa-blue font-bold">{t('terms7Title')}</h2>
                    <p>{t('terms7Text')}</p>
                </div>
                 <style>{`
                    .prose h2 { color: #1C2A5D; margin-top: 2em; margin-bottom: 1em; font-weight: 700;}
                    .prose h1.text-konpa-gold-600 { color: #D4A017 !important; }
                `}</style>
            </div>
        </div>
    );
};

export default TermsOfUse;