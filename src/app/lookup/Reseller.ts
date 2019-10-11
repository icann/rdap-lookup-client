import { LookupInformation } from './LookupInformation';
import { Entity } from './Entity';

export class Reseller extends LookupInformation {

  entityReseller: Entity = new Entity({});

  constructor (response: any) {
    super(response);

    this.entityReseller = response.entities.find((el) => el.role === 'reseller') || new Entity({});
  }

}
