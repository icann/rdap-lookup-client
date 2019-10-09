import { LookupInformation } from './LookupInformation';
import { Entity } from './Entity';

export class Registrar extends LookupInformation {

  entityRegistrar: Entity = new Entity({});

  constructor (response: any, isWhoisFallback = false) {
    super(response, isWhoisFallback);

    if (!isWhoisFallback) {
      this.entityRegistrar = response.entities.find((el) => el.role === 'registrar') || new Entity({});
    } else {
      this.entityRegistrar = new Entity(response.registrar, true, 'registrar');
      this.entityRegistrar.link = response.referralURL;
    }
  }

}
