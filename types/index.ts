
export interface Album {
  id: string;
  artist: string;
  album: string;
  year: number | null;
  label: string;
  coverUrl: string;
  tracks: string;
  tracksCount: number;
}

export interface DataStats {
  totalAlbums: number;
  totalArtists: number;
  yearSpan: [number, number];
}

export interface ArtistProfile {
  artist: string;
  fullName?: string;
  born?: string;
  origin?: string;
  genre?: string;
  overview: string;
  popularSongs: string[];
  following?: { platform: string; count: string }[];
  links?: { platform: string; url: string }[];
  imageUrl: string;
}

export interface HostProfile {
  name: string;
  bio: string;
  imageUrl: string;
  links?: { platform: string; url: string }[];
}
