
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext.tsx';
import { hostProfiles } from '../assets/host_profiles.ts';
import HostProfileCard from '../components/HostProfileCard.tsx';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};


const Host = () => {
    const { t } = useLanguage();

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-konpa-blue tracking-tight">{t('navHost')}</h1>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">{t('hostPageSubtitle')}</p>
                </div>

                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {hostProfiles.map((host) => (
                       <motion.div key={host.name} variants={itemVariants}>
                           <HostProfileCard host={host} />
                       </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default Host;
