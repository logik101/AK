
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { DataProvider } from './contexts/DataContext.tsx';
import { LanguageProvider } from './contexts/LanguageContext.tsx';
import { SupportModalProvider } from './contexts/SupportModalContext.tsx';
import { ArtistProfileProvider } from './contexts/ArtistProfileContext.tsx';
import Home from './pages/Home.tsx';
import Artists from './pages/Artists.tsx';
import ArtistDetail from './pages/ArtistDetail.tsx';
import Albums from './pages/Albums.tsx';
import Years from './pages/Years.tsx';
import YearDetail from './pages/YearDetail.tsx';
import About from './pages/About.tsx';
import TermsOfUse from './pages/TermsOfUse.tsx';
import Contact from './pages/Contact.tsx';
import Host from './pages/Host.tsx';
import NotFound from './pages/NotFound.tsx';
import NavBar from './components/layout/NavBar.tsx';
import Footer from './components/layout/Footer.tsx';
import SupportModal from './components/SupportModal.tsx';
import CookieConsent from './components/CookieConsent.tsx';

function App() {
  return (
    <LanguageProvider>
      <SupportModalProvider>
        <ArtistProfileProvider>
          <DataProvider>
            <HashRouter>
              <div className="flex flex-col min-h-screen bg-white">
                <NavBar />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/artists" element={<Artists />} />
                    <Route path="/artists/:name" element={<ArtistDetail />} />
                    <Route path="/albums" element={<Albums />} />
                    <Route path="/years" element={<Years />} />
                    <Route path="/years/:year" element={<YearDetail />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/terms" element={<TermsOfUse />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/host" element={<Host />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
                <Footer />
                <SupportModal />
                <CookieConsent />
              </div>
            </HashRouter>
          </DataProvider>
        </ArtistProfileProvider>
      </SupportModalProvider>
    </LanguageProvider>
  );
}

export default App;
