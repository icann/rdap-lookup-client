import { Event } from './Event';
import { Entity } from './Entity';

export class Response {
  response: any;
  events: Event[] = [];
  registrarEvents: Event[] = [];
  entities: Entity[] = [];
  remarks: any[] = [];
  mergeRegistrarInformations: any = null;
  parsedResponse: any;

  constructor (response: any, mergeRegistrarInformations: any = null) {
    this.response = response;
    this.parsedResponse = response;
    this.mergeRegistrarInformations = mergeRegistrarInformations;
  }

  parseResponseFromRdap (): Response {
    this.parseEvents();
    this.parseEntities();

    this.parsedResponse.entities = this.entities;
    this.parsedResponse.remarks = this.remarks;
    this.parsedResponse.registrarEvents = this.registrarEvents;
    this.parsedResponse.events = this.events;

    if (this.mergeRegistrarInformations && this.mergeRegistrarInformations.authoritativeServer) {
      if (this.parsedResponse.links) {
        this.parsedResponse.links.push(this.mergeRegistrarInformations.response.links.find((el: any) => el.rel === 'related'));
      } else {
        this.parsedResponse.links = [this.mergeRegistrarInformations.response.links.find((el: any) => el.rel === 'related')];
      }
    }

    return this.parsedResponse;
  }

  parseEvents (): void {
    if (this.response.events) {
      if (!this.mergeRegistrarInformations) {
        this.response.events.forEach((element: any) => this.events.push(new Event(element)));
      } else {
        if (this.mergeRegistrarInformations.response.events) {
          this.mergeRegistrarInformations.response.events.forEach((element: any) => this.events.push(new Event(element)));
        }
        this.response.events.forEach((element: any) => this.registrarEvents.push(new Event(element)));
      }
    }
  }

  parseEntities (): void {
    if (this.response.entities) {
      this.response.entities.forEach((element: any) => {
        if (element.remarks) {

          element.remarks.forEach((remarkElt: any) => {
            if (!this.remarks.find((el: any) => el.type === remarkElt.type)) {
              this.remarks.push(remarkElt);
            }
          });
        }

        if (!element.roles) {
          this.entities.push(new Entity(element, element.role[0]));
        } else {
          element.roles.forEach ((role: any) => {
            this.entities.push(new Entity(element, role));
          });
        }
      });
    }
  }
}
