
import React, { createContext, useState, useContext, ReactNode, useCallback, useEffect } from 'react';
import { ArtistProfile } from '../types/index.ts';

interface ArtistProfileContextType {
  generatedProfiles: Map<string, ArtistProfile>;
  addGeneratedProfile: (profile: ArtistProfile) => void;
  getProfile: (artistName: string) => ArtistProfile | undefined;
}

const LOCAL_STORAGE_KEY_PROFILES = 'haitianKonpaGeneratedProfiles';

const ArtistProfileContext = createContext<ArtistProfileContextType | undefined>(undefined);

export const ArtistProfileProvider = ({ children }: { children: ReactNode }) => {
  const [generatedProfiles, setGeneratedProfiles] = useState<Map<string, ArtistProfile>>(() => {
    try {
      const item = window.localStorage.getItem(LOCAL_STORAGE_KEY_PROFILES);
      return item ? new Map(JSON.parse(item)) : new Map();
    } catch (error) {
      console.error("Error reading generated profiles from localStorage", error);
      return new Map();
    }
  });

  const addGeneratedProfile = useCallback((profile: ArtistProfile) => {
    setGeneratedProfiles(prev => {
        const newProfiles = new Map(prev).set(profile.artist, profile);
        try {
            window.localStorage.setItem(LOCAL_STORAGE_KEY_PROFILES, JSON.stringify(Array.from(newProfiles.entries())));
        } catch (error) {
            console.error("Error saving generated profiles to localStorage", error);
        }
        return newProfiles;
    });
  }, []);

  const getProfile = useCallback((artistName: string) => {
    return generatedProfiles.get(artistName);
  }, [generatedProfiles]);

  return (
    <ArtistProfileContext.Provider value={{ generatedProfiles, addGeneratedProfile, getProfile }}>
      {children}
    </ArtistProfileContext.Provider>
  );
};

export const useArtistProfile = () => {
  const context = useContext(ArtistProfileContext);
  if (context === undefined) {
    throw new Error('useArtistProfile must be used within a ArtistProfileProvider');
  }
  return context;
};
