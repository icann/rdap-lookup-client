import { Component, OnInit } from '@angular/core';
import { AcronymService } from '../services/acronym.service';

@Component({
  selector: 'rwc-faq',
  templateUrl: './faq.component.html',
  providers: [AcronymService]
})
export class FaqComponent implements OnInit {

  constructor (public acronymService: AcronymService) { }

  ngOnInit() {
  }

}
