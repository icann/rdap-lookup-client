import { Component, Input } from '@angular/core';
import { Entity } from '../../lookup/Entity';
import { Registrar } from 'src/app/lookup/Registrar';

@Component({
    selector: 'rwc-lookup-registrar',
    templateUrl: './lookup-registrar.html',
    standalone: false
})
export class  LookupRegistrarComponent {
  @Input() registrar: Registrar;

  constructor () {

  }

  isRegistrarPanelEmpty () {
    let isPanelEmpty = true;

    // Find entities objects
    for (const key in this.registrar) {
      if (this.registrar[key] && this.registrar[key] instanceof Entity) {
        if (this.registrar[key].role === 'registrar') {
          if (this.registrar[key].isContactEmpty() === false) {
            isPanelEmpty = false;
            break;
          }
        }
      }
    }

    return isPanelEmpty;
  }

  getEventDate (event, events) {
    if (!Array.isArray(events)) {
      return;
    }

    return events.find((el) => el.eventAction === event)
      ? events.find((el) => el.eventAction === event).eventDate
      : null;
  }
}
