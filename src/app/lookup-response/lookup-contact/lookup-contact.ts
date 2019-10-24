import { Component, Input } from '@angular/core';
import { Entity } from '../../lookup/Entity';
import { Contact } from '../../lookup/Contact';

@Component({
  selector: 'rwc-lookup-contact',
  templateUrl: './lookup-contact.html'
})
export class  LookupContactComponent {
  @Input() contact: Contact;

  constructor () {

  }

  isContactsPanelEmpty () {
    let isPanelEmpty = true;

    // Find entities objects
    for (const key in this.contact) {
      if (this.contact[key] && this.contact[key] instanceof Entity) {
        if (this.contact[key].isDisplayed === false && this.contact[key].role !== 'registrar') {
          if (this.contact[key].isContactEmpty() === false) {
            isPanelEmpty = false;
            break;
          }
        }
      }
    }
    return isPanelEmpty;
  }

}
