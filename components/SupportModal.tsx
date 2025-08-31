import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSupportModal } from '../contexts/SupportModalContext.tsx';
import { useLanguage } from '../contexts/LanguageContext.tsx';
import { Button } from './ui/Button.tsx';

// FIX: Add a global declaration for the custom JSX element 'stripe-buy-button' to make TypeScript aware of it.
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'stripe-buy-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'buy-button-id': string;
        'publishable-key': string;
      };
    }
  }
}

const SupportModal = () => {
    const { isOpen, closeModal } = useSupportModal();
    const { t } = useLanguage();

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4" onClick={closeModal} role="dialog" aria-modal="true" aria-labelledby="support-modal-title">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.2 }}
                        className="bg-gray-50 rounded-xl shadow-xl w-full max-w-sm"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-6 md:p-8">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 id="support-modal-title" className="text-xl font-bold text-gray-900">{t('supportModalTitle')}</h2>
                                    <p className="text-gray-500 mt-1 text-sm">{t('supportModalSubtitle')}</p>
                                </div>
                                <Button type="button" variant="ghost" size="icon" onClick={closeModal} aria-label="Close" className="-mt-2 -mr-2 text-gray-400 hover:text-gray-900 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                </Button>
                            </div>
                            
                            <div className="mt-8 flex flex-col items-center space-y-4">
                                <div>
                                    <p className="text-sm text-gray-600 mb-2 text-center">{t('supportModalStripeInfo')}</p>
                                    <stripe-buy-button
                                        buy-button-id="buy_btn_1S24NTBu9g9qtsBljtISUYWh"
                                        publishable-key="pk_live_51S19m4Bu9g9qtsBltgB2xsSDw507P1BVDyMQwgjgpv83jr9644JvlbTM4P0Cy2SUJtTV4zx4sOhUcymowhidUbtZ00jfZYPRtM"
                                    />
                                </div>

                                <div className="flex items-center w-full">
                                    <div className="flex-grow border-t border-gray-300"></div>
                                    <span className="flex-shrink mx-4 text-xs text-gray-400 font-medium uppercase">{t('supportOr')}</span>
                                    <div className="flex-grow border-t border-gray-300"></div>
                                </div>
                                
                                <div className="text-center">
                                    <img src="https://logik101.github.io/iscograph/album_cover/album_default.png" alt="QR Code to donate" className="w-48 h-48 mx-auto rounded-lg shadow-md" />
                                    <p className="mt-2 text-sm text-gray-600">{t('supportScanToDonate')}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default SupportModal;