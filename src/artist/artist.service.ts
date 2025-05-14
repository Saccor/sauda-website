import { Injectable } from '@nestjs/common';

export interface SocialMediaLink {
  name: string;
  url: string;
}

export interface Artist {
  name: string;
  description: string;
  longBio: string;
  image: string;
  socialMedia: SocialMediaLink[];
}

@Injectable()
export class ArtistService {
  private artistData: Artist = {
    name: 'SAUDA',
    description: 'SAUDA is a dynamic artist duo signed by Bad Taste Empire, known for blending electronic beats with soulful vocals. Their unique sound bridges the gap between underground dance culture and accessible pop, creating an immersive sonic experience that has captivated audiences worldwide.',
    longBio: 'Formed in 2020, SAUDA quickly established themselves in the electronic music scene with their debut EP "Electric Dreams". The duo\'s creative process combines analog synthesizers with digital production techniques, resulting in a distinctive sound that feels both nostalgic and futuristic. Their live performances are known for high energy and impressive visual elements that complement their musical journey.',
    image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1200&auto=format&fit=crop',
    socialMedia: [
      { 
        name: 'Instagram', 
        url: 'https://instagram.com/sauda'
      },
      { 
        name: 'Spotify', 
        url: 'https://open.spotify.com/artist/sauda'
      },
      { 
        name: 'YouTube', 
        url: 'https://youtube.com/sauda'
      },
      { 
        name: 'SoundCloud', 
        url: 'https://soundcloud.com/sauda'
      }
    ]
  };

  getArtistInfo(): Artist {
    return this.artistData;
  }
} 