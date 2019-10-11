import { Entity, EntityType } from './Entity';
import { Event } from './Event';

export class LookupInformation {
  entities: Entity[] = [];
  entitiesRemarks: any[] = [];
  events: Array<Event> = [];
  registrarEvents: Array<Event> = [];
  rdapResponse: {};
  registrarResponse: {};
  whoisRawResponse: {};
  rdapEvents: Event[] = [];

  constructor (response: any) {
    this.rdapResponse = response;
    this.entitiesRemarks = this.parseRemarks(response.remarks || []);
    this.registrarEvents = response.registrarEvents;
    this.events = response.events;
  }

  private parseRemarks (remarks: []): any {
    return (remarks && Array.isArray(remarks))
      ? remarks.filter((el: any) => Array.isArray(el.description))
      : [];
  }

  public isEventExists (events: any, event: string) {
    return (events && events.findIndex((el) => el.eventAction === event && el.eventDate !== null) > -1);
  }

  getEntityByType (entityType: EntityType): Entity {
    if (this.entities.length === 0) {
     return new Entity({});
    }

    return (
      this.entities.find((el) => el.entityType === entityType) ||
      this.entities.find((el) => el.role === entityType)
    );
  }

  getSelfLink (links: any): string {
    if (!links || !Array.isArray(links)) {
      return null;
    }

    const relatedLink: any = links.find((el) => el.rel === 'self');
    if (relatedLink) {
      return relatedLink.href.toLowerCase();
    } else {
      return null;
    }
  }

  getRelatedLink (links: any): string {
    if (!links || !Array.isArray(links)) {
      return null;
    }

    const relatedLink: any = links.find((el) => el.rel === 'related');
    if (relatedLink) {
      return relatedLink.href;
    } else {
      return null;
    }
  }

}
