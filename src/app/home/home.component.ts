import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LookupService } from '../services/lookup.service';

@Component({
    selector: 'rwc-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: false
})
export class HomeComponent implements OnInit {
  domain: string;

  constructor(private route: ActivatedRoute, private lookupService: LookupService) {
  }

  ngOnInit () {
    // Reset domain service
    this.lookupService.cleanResponse();

    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        const element = document.querySelector('#' + fragment);
        if (element) {
          element.scrollIntoView();
        }
      }
    });
  }

}
