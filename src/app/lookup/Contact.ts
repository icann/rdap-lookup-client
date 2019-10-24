import { LookupInformation } from './LookupInformation';
import { Entity } from './Entity';

export class Contact extends LookupInformation {
  remarks: any[];
  displayedEntities: Entity[] = [];
  entityRegistrant: Entity = new Entity({});
  entityTechnical: Entity = new Entity({});
  entityAdministrative: Entity = new Entity({});
  entityReseller: Entity = new Entity({});

  constructor (response: any) {
    super(response);

    this.parseFromRdapResponse(response);
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

 }
