import { Injectable } from '@nestjs/common';

export interface Event {
  date: string;
  venue: string;
  city: string;
  ticketUrl: string;
}

@Injectable()
export class EventsService {
  private events: Event[] = [
    {
      date: '2025-06-15',
      venue: 'Stockholm Live',
      city: 'Stockholm',
      ticketUrl: 'https://tickets.com/sauda-stockholm'
    },
    {
      date: '2025-06-22',
      venue: 'Pulse Club',
      city: 'Oslo',
      ticketUrl: 'https://tickets.com/sauda-oslo'
    },
    {
      date: '2025-07-05',
      venue: 'Bass Factory',
      city: 'Copenhagen',
      ticketUrl: 'https://tickets.com/sauda-copenhagen'
    },
    {
      date: '2025-07-12',
      venue: 'Underground Hall',
      city: 'Berlin',
      ticketUrl: 'https://tickets.com/sauda-berlin'
    },
    {
      date: '2025-07-19',
      venue: 'Club Vibrations',
      city: 'Helsinki',
      ticketUrl: 'https://tickets.com/sauda-helsinki'
    }
  ];

  getEvents(): Event[] {
    // Sort events by date (ascending)
    return [...this.events].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }
} 