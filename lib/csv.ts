import { Album } from '../types/index.ts';

declare const Papa: any;

export const parseCSV = (csvString: string): Promise<Album[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(csvString, {
      header: true,
      skipEmptyLines: true,
      delimiter: "	",
      transformHeader: (header: string) => header.trim(),
      complete: (results: any) => {
        if (results.errors.length) {
          reject(new Error(`CSV parsing errors: ${JSON.stringify(results.errors)}`));
          return;
        }

        const processedData = processData(results.data);
        resolve(processedData);
      },
      error: (error: Error) => {
        reject(error);
      },
    });
  });
};

const processData = (data: any[]): Album[] => {
  const uniqueAlbums = new Map<string, Album>();

  data.forEach((row, index) => {
    const artist = (row.Artist || '').trim();
    const album = (row.Album || '').trim();
    const yearStr = (row.Year || '').trim();
    const year = yearStr ? parseInt(yearStr, 10) : null;

    if (!artist || !album || (yearStr && isNaN(year!))) {
      return; // Ignore rows with missing artist, album, or invalid year
    }

    const uniqueKey = `${artist}-${album}-${year}`;
    if (!uniqueAlbums.has(uniqueKey)) {
      const tracks = (row.Tracks || '').trim();
      const tracksCount = tracks ? tracks.split(',').length : 0;
      
      uniqueAlbums.set(uniqueKey, {
        id: uniqueKey,
        artist,
        album,
        year,
        label: (row.Label || '').trim(),
        coverUrl: (row.Cover_URL || '').trim(),
        tracks,
        tracksCount,
      });
    }
  });

  return Array.from(uniqueAlbums.values());
};