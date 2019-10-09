import { LookupInformation } from './LookupInformation';
import { Entity } from './Entity';

export class Reseller extends LookupInformation {

  entityReseller: Entity = new Entity({});

  constructor (response: any, isWhoisFallback = false) {
    super(response, isWhoisFallback);

    if (!isWhoisFallback) {
      this.entityReseller = response.entities.find((el) => el.role === 'reseller') || new Entity({});
    } else {
      this.entityReseller = new Entity(response.reseller, true, 'reseller');
    }
  }

}
