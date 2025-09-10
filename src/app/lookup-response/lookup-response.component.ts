import { Component } from '@angular/core';
import { DomainFormComponent } from '../domain-form/domain-form.component';
import { Router } from '@angular/router';
import { LookupService } from '../services/lookup.service';

@Component({
    selector: 'rwc-lookup-response',
    templateUrl: './lookup-response.component.html',
    styleUrls: ['./lookup-response.component.scss'],
    providers: [DomainFormComponent],
    standalone: false
})
export class LookupResponseComponent  {
  domainInLookup = false;

  constructor (private router: Router, public lookupService: LookupService) {
    this.domainInLookup = (this.lookupService.getDomain() !== null && this.lookupService.getDomain() !== undefined);
    if (!this.domainInLookup) {
      this.router.navigateByUrl('/');
    }
  }

}
