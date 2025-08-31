import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react';
import { Album, DataStats } from '../types/index.ts';
import { csvData } from '../assets/data.ts';
import { parseCSV } from '../lib/csv.ts';

interface DataContextType {
  albums: Album[];
  artists: string[];
  labels: string[];
  stats: DataStats | null;
  loading: boolean;
  error: string | null;
  addCsvData: (csvText: string) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'haitianKonpaAdminDataCsv';

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const initialAlbums = await parseCSV(csvData);
        
        const storedCsv = localStorage.getItem(LOCAL_STORAGE_KEY);
        let storedAlbums: Album[] = [];
        if (storedCsv) {
          try {
            storedAlbums = await parseCSV(storedCsv);
          } catch (e) {
            console.error("Failed to parse persisted data from localStorage", e);
          }
        }
        
        const allAlbumsMap = new Map<string, Album>();
        initialAlbums.forEach(album => allAlbumsMap.set(album.id, album));
        storedAlbums.forEach(album => allAlbumsMap.set(album.id, album));
        
        setAlbums(Array.from(allAlbumsMap.values()));

      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const addCsvData = useCallback(async (csvText: string) => {
    if (!csvText.trim()) return;
    
    try {
      const newAlbums = await parseCSV(csvText);
      if (newAlbums.length === 0) return;

      setAlbums(prevAlbums => {
        const albumsMap = new Map(prevAlbums.map(a => [a.id, a]));
        newAlbums.forEach(album => albumsMap.set(album.id, album));
        return Array.from(albumsMap.values());
      });

      const storedCsv = localStorage.getItem(LOCAL_STORAGE_KEY) || '';
      const updatedCsv = storedCsv ? `${storedCsv}\n${csvText}` : csvText;
      localStorage.setItem(LOCAL_STORAGE_KEY, updatedCsv);

    } catch (err) {
        console.error("Error processing new CSV data:", err);
        throw err;
    }
  }, []);

  const derivedData = useMemo(() => {
    const sortedAlbums = [...albums].sort((a, b) => (b.year || 0) - (a.year || 0));
    const uniqueArtists = Array.from(new Set(sortedAlbums.map(a => a.artist))).sort();
    const uniqueLabels = Array.from(new Set(sortedAlbums.map(a => a.label).filter(Boolean))).sort();
    
    const years = sortedAlbums.map(a => a.year).filter((y): y is number => y !== null);
    if (years.length === 0) {
        return { albums: sortedAlbums, artists: uniqueArtists, labels: uniqueLabels, stats: null };
    }
    const minYear = Math.min(...years);
    const maxYear = Math.max(...years);

    const stats: DataStats | null = sortedAlbums.length > 0 ? {
      totalAlbums: sortedAlbums.length,
      totalArtists: uniqueArtists.length,
      yearSpan: [minYear, maxYear],
    } : null;

    return { albums: sortedAlbums, artists: uniqueArtists, labels: uniqueLabels, stats };
  }, [albums]);


  const value = {
    ...derivedData,
    loading,
    error,
    addCsvData,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};