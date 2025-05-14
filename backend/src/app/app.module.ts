import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { ArtistModule } from './artist/artist.module';

@Module({
  imports: [EventsModule, ArtistModule],
})
export class AppModule {} 