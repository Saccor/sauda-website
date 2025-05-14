import { Injectable } from '@nestjs/common';

export interface Artist {
  id: number;
  name: string;
  bio: string;
  imageUrl: string;
  socialLinks: {
    instagram?: string;
    spotify?: string;
    soundcloud?: string;
    youtube?: string;
  };
}

@Injectable()
export class ArtistService {
  private artist: Artist = {
    id: 1,
    name: 'SAUDA',
    bio: 'SAUDA is an electronic music duo signed to Bad Taste Empire, known for their unique blend of techno, house, and ambient sounds. Their performances create immersive experiences that take listeners on a journey through pulsating beats and atmospheric melodies.',
    imageUrl: 'https://images.unsplash.com/photo-1571145551427-5c0e3868584a?q=80&w=1000',
    socialLinks: {
      instagram: 'https://www.instagram.com/saudamusic',
      spotify: 'https://open.spotify.com/artist/saudamusic',
      soundcloud: 'https://soundcloud.com/saudamusic',
      youtube: 'https://youtube.com/saudamusic'
    }
  };

  getArtist(): Artist {
    return this.artist;
  }
} 