import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext.tsx';
import { cn } from '../../lib/utils.ts';

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="relative bg-white text-[#1C1C1C] pt-28 pb-32 px-4 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-[-150px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-konpa-gold-500/10 rounded-full blur-[150px] z-0 animate-pulse-slow"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h1 
          className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-konpa-blue mb-6 tracking-tighter animate-fade-in-up"
        >
          {t('heroHeading')} <span className="bg-gradient-to-r from-konpa-gold-500 to-konpa-gold-700 text-transparent bg-clip-text">{t('heroHeadingSpan')}</span>
        </h1>
        <p 
          className="text-lg text-gray-700 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up"
          style={{ animationDelay: '0.2s' }}
        >
          {t('heroSubtitle')}
        </p>
        <div 
          className="flex justify-center gap-4 flex-wrap animate-fade-in-up"
          style={{ animationDelay: '0.4s' }}
        >
          <Link
            to="/albums"
            className={cn(
              "inline-flex items-center justify-center rounded-full text-base font-semibold transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-konpa-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:opacity-50 disabled:pointer-events-none",
              "bg-konpa-gold-600 text-white hover:bg-konpa-gold-700",
              "px-8 py-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            )}
          >
            {t('heroCtaTimeline')}
          </Link>
          <Link
            to="/artists"
            className={cn(
              "inline-flex items-center justify-center rounded-full text-base font-semibold transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kompa-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:opacity-50 disabled:pointer-events-none",
              "bg-white border-2 border-konpa-gold-500 text-konpa-gold-600 hover:bg-konpa-gold-500 hover:text-white",
               "px-8 py-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            )}
          >
            {t('heroCtaArtists')}
          </Link>
        </div>
      </div>
      <style>{`
        .animate-pulse-slow {
          animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          50% {
            opacity: .7;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;