import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistModule } from './artist/artist.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [ArtistModule, EventsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
