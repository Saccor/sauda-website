import { Controller, Get } from '@nestjs/common';
import { ArtistService, Artist } from './artist.service';

@Controller('api/artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  getArtistInfo(): Artist {
    return this.artistService.getArtistInfo();
  }
} 