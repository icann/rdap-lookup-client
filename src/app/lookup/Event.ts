export class Event {
  eventAction: string;
  eventDate: string;

  constructor (event: any) {
    this.eventAction = event.eventAction;
    this.eventDate = event.eventDate;
  }
}

