import { Controller, Get } from '@nestjs/common';
import { EventsService, Event } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}
  
  @Get()
  getEvents(): Event[] {
    return this.eventsService.getEvents();
  }
} 