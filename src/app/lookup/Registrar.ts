import { LookupInformation } from './LookupInformation';
import { Entity } from './Entity';

export class Registrar extends LookupInformation {

  entityRegistrar: Entity = new Entity({});

  constructor (response: any) {
    super(response);

    this.entityRegistrar = response.entities.find((el) => el.role === 'registrar') || new Entity({});
  }

}
