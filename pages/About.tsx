import React from 'react';
import { useLanguage } from '../contexts/LanguageContext.tsx';
import { useSupportModal } from '../contexts/SupportModalContext.tsx';
import { Button } from '../components/ui/Button.tsx';

const FeatureCard = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
    <div className="text-center p-6 bg-gray-50 rounded-lg border border-gray-200 transition-all duration-300 hover:shadow-lg hover:border-kompa-gold-200 transform hover:-translate-y-1">
        <div className="flex justify-center items-center">
            {icon}
        </div>
        <h3 className="font-bold text-konpa-blue text-lg mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{children}</p>
    </div>
);


const About = () => {
    const { t } = useLanguage();
    const { openModal } = useSupportModal();

    const features = [
        {
            title: t('aboutListItem1Title'),
            text: t('aboutListItem1Text'),
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4 text-konpa-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            )
        },
        {
            title: t('aboutListItem2Title'),
            text: t('aboutListItem2Text'),
            icon: (
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4 text-konpa-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 6l12-3" />
                </svg>
            )
        },
        {
            title: t('aboutListItem3Title'),
            text: t('aboutListItem3Text'),
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4 text-konpa-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            )
        }
    ];

    return (
        <div className="bg-white py-16 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                <div className="prose lg:prose-lg mx-auto text-gray-700 text-center">
                    <h1 className="text-konpa-gold-600">{t('aboutTitle')}</h1>
                </div>

                <div className="max-w-3xl mx-auto text-center mt-4">
                    <p className="text-xl leading-8 text-gray-800">{t('aboutIntroCombined1')}</p>
                    <p className="mt-4 text-gray-600">{t('aboutIntroCombined2')}</p>
                </div>
                
                <div className="mt-16">
                    <h2 className="text-3xl font-extrabold text-konpa-blue text-center mb-10">{t('aboutHereYouWillFind')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 not-prose">
                        {features.map(feature => (
                             <FeatureCard key={feature.title} title={feature.title} icon={feature.icon}>
                                {feature.text}
                            </FeatureCard>
                        ))}
                    </div>
                </div>

                <div className="max-w-3xl mx-auto text-center mt-16 prose lg:prose-lg">
                    <p>{t('aboutGoalCombined1')}</p>
                    <p>{t('aboutGoalCombined2')}</p>
                    <p className="font-semibold text-gray-800">{t('aboutThanks')}</p>
                </div>

                <div className="mt-12 text-center">
                    <Button 
                        onClick={openModal} 
                        size="lg" 
                        className="bg-konpa-blue text-white hover:bg-konpa-blue/90 rounded-full px-8 py-3 transition-all duration-300 transform hover:scale-105"
                    >
                        <span className="font-bold text-xl mr-2">$</span>
                        {t('supportUs')}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default About;