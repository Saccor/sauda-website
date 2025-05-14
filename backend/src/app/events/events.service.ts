import { Injectable } from '@nestjs/common';

export interface Event {
  id: number;
  date: string;
  venue: string;
  city: string;
  country: string;
  ticketLink: string;
  soldOut: boolean;
}

@Injectable()
export class EventsService {
  private events: Event[] = [
    {
      id: 1,
      date: '2025-06-15',
      venue: 'Electric Arena',
      city: 'Stockholm',
      country: 'Sweden',
      ticketLink: 'https://tickets.com/sauda-stockholm',
      soldOut: false
    },
    {
      id: 2,
      date: '2025-06-22',
      venue: 'Pulse Club',
      city: 'Oslo',
      country: 'Norway',
      ticketLink: 'https://tickets.com/sauda-oslo',
      soldOut: false
    },
    {
      id: 3,
      date: '2025-07-05',
      venue: 'Bass Factory',
      city: 'Copenhagen',
      country: 'Denmark',
      ticketLink: 'https://tickets.com/sauda-copenhagen',
      soldOut: false
    },
    {
      id: 4,
      date: '2025-07-12',
      venue: 'Underground Hall',
      city: 'Berlin',
      country: 'Germany',
      ticketLink: 'https://tickets.com/sauda-berlin',
      soldOut: false
    },
    {
      id: 5,
      date: '2025-07-19',
      venue: 'Club Vibrations',
      city: 'Helsinki',
      country: 'Finland',
      ticketLink: 'https://tickets.com/sauda-helsinki',
      soldOut: false
    }
  ];

  getEvents(): Event[] {
    // Sort events by date (ascending)
    return [...this.events].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }
} 