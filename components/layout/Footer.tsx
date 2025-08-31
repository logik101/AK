import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button.tsx';
import { Input } from '../ui/Input.tsx';
import { useData } from '../../contexts/DataContext.tsx';
import { useLanguage } from '../../contexts/LanguageContext.tsx';

const PasswordModal = ({
  isOpen,
  onClose,
  onSuccess,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '509090') {
      setError('');
      onSuccess();
    } else {
      setError(t('invalidPassword'));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm text-gray-800">
        <h2 className="text-xl font-bold text-gray-900 mb-4">{t('adminLogin')}</h2>
        <p className="text-gray-600 mb-4 text-sm">{t('enterPassword')}</p>
        <form onSubmit={handleSubmit}>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t('password')}
            autoFocus
          />
          {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
          <div className="mt-6 flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onClose}>{t('close')}</Button>
            <Button type="submit">{t('submit')}</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AdminModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const [csvText, setCsvText] = useState('');
    const { addCsvData } = useData();
    const { t } = useLanguage();

    const handleAppend = async () => {
        if (!csvText.trim()) return;
        try {
            await addCsvData(csvText);
            setCsvText('');
            onClose();
        } catch (error) {
            console.error("Failed to parse and add new data:", error);
            alert("Error parsing CSV data. Please check the format and try again.");
        }
    };
    
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl text-gray-800">
                <h2 className="text-xl font-bold text-gray-900 mb-4">{t('addData')}</h2>
                <p className="text-gray-600 mb-4 text-sm">{t('addDataInstruction')}</p>
                <textarea
                    value={csvText}
                    onChange={(e) => setCsvText(e.target.value)}
                    className="w-full h-64 p-2 rounded-md bg-gray-50 border border-gray-300 text-gray-800 font-mono text-xs focus:ring-2 focus:ring-kompa-gold-500 focus:outline-none"
                    placeholder="Artist	Album	Year	Label	Cover_URL	Tracks..."
                />
                <div className="mt-6 flex justify-end space-x-4">
                    <Button variant="outline" onClick={onClose}>{t('close')}</Button>
                    <Button onClick={handleAppend}>{t('appendData')}</Button>
                </div>
            </div>
        </div>
    );
};

const Footer = () => {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const { t } = useLanguage();

  const handleAdminSuccess = () => {
    setIsPasswordModalOpen(false);
    setIsAdminModalOpen(true);
  };

  return (
    <>
      <div className="bg-konpa-bg-connect">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-konpa-blue mb-4">{t('connectTitle')}</h3>
            <p className="text-gray-600 max-w-lg mx-auto mb-10 text-sm sm:text-base">{t('connectSubtitle')}</p>
            <div className="flex justify-center gap-4 flex-wrap">
                <a target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="p-3 rounded-full bg-white border-2 border-konpa-gold-600/50 text-konpa-gold-600 hover:bg-konpa-gold-600 hover:text-white transition-all transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-konpa-gold-600" href="https://facebook.com">
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 320 512" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path></svg>
                </a>
                <a target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="p-3 rounded-full bg-white border-2 border-konpa-gold-600/50 text-konpa-gold-600 hover:bg-konpa-gold-600 hover:text-white transition-all transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-konpa-gold-600" href="https://instagram.com">
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.9z"></path></svg>
                </a>
                <a target="_blank" rel="noopener noreferrer" aria-label="X" className="p-3 rounded-full bg-white border-2 border-konpa-gold-600/50 text-konpa-gold-600 hover:bg-konpa-gold-600 hover:text-white transition-all transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-konpa-gold-600" href="https://x.com">
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"></path></svg>
                </a>
            </div>
        </div>
      </div>
      <footer className="bg-konpa-bg-footer py-8 text-center text-sm text-gray-500 border-t border-gray-200/80">
        <div className="container mx-auto px-4 sm:px-6">
          <p>{t('footerCopyright', { year: new Date().getFullYear() })}</p>
           <div className="mt-2 flex justify-center items-center space-x-4">
             <Link to="/terms" className="text-xs text-gray-400 hover:text-konpa-gold-600 transition">
                {t('footerTerms')}
            </Link>
            <span className="text-gray-300">|</span>
             <Link to="/contact" className="text-xs text-gray-400 hover:text-konpa-gold-600 transition">
                {t('footerContact')}
            </Link>
            <span className="text-gray-300">|</span>
            <button onClick={() => setIsPasswordModalOpen(true)} className="text-xs text-gray-400 hover:text-konpa-gold-600 transition">
                {t('footerAdmin')}
            </button>
          </div>
        </div>
      </footer>
      <PasswordModal isOpen={isPasswordModalOpen} onClose={() => setIsPasswordModalOpen(false)} onSuccess={handleAdminSuccess} />
      <AdminModal isOpen={isAdminModalOpen} onClose={() => setIsAdminModalOpen(false)} />
    </>
  );
};

export default Footer;