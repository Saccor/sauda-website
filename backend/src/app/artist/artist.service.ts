import { Injectable } from '@nestjs/common';

export interface Artist {
  name: string;
  bio: string;
  image: string;
  socials: {
    instagram: string;
    spotify: string;
    soundcloud?: string;
    youtube?: string;
  };
}

@Injectable()
export class ArtistService {
  private artist: Artist = {
    name: 'SAUDA',
    bio: 'Electronic duo signed to Bad Taste Empire, known for their unique blend of techno, house, and ambient sounds. Their performances create immersive experiences that take listeners on a journey through pulsating beats and atmospheric melodies.',
    image: '/sauda-profile.jpg',
    socials: {
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