import { LookupInformation } from './LookupInformation';
import { Entity } from './Entity';

export class Contact extends LookupInformation {
  remarks: any[];
  displayedEntities: Entity[] = [];
  entityRegistrant: Entity = new Entity({});
  entityTechnical: Entity = new Entity({});
  entityAdministrative: Entity = new Entity({});
  entityReseller: Entity = new Entity({});

  constructor (response: any, isWhoisFallback = false) {
    super(response, isWhoisFallback);

    if (!isWhoisFallback) {
      this.parseFromRdapResponse(response);
    } else {
      this.parseFromWhoisResponse(response);
    }
  }

  private parseFromRdapResponse (response: any): void {
    this.entityRegistrant = response.entities.find((el) => el.role === 'registrant') || new Entity({});
    this.entityTechnical = response.entities.find((el) => el.role === 'technical') || new Entity({});
    this.entityAdministrative = response.entities.find((el) => el.role === 'administrative') || new Entity({});
    this.entityReseller = response.entities.find((el) => el.role === 'reseller') || new Entity({});

    for (let i = response.entities.length - 1; i >= 0; i--) {
      if (response.entities[i].isDisplayed) {
        this.displayedEntities.push(response.entities[i]);
      }
    }
   }

  private parseFromWhoisResponse (response: any): void {
    this.entityRegistrant = new Entity(response.registrant, true, 'registrant');
    this.entityTechnical = new Entity(response.tech, true, 'technical');
    this.entityAdministrative = new Entity(response.admin, true, 'administrative');
  }
 }
