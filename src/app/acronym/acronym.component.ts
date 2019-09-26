import { Component, OnInit } from '@angular/core';
import { AcronymService } from '../services/acronym.service';

@Component({
  selector: 'rwc-acronym',
  templateUrl: './acronym.component.html',
  styleUrls: ['./acronym.component.scss'],
  providers: [AcronymService]
})
export class AcronymComponent implements OnInit {

  constructor () { }

  isAcronymVisible (): boolean {
    return AcronymService.acronym !== null;
  }

  getAcronymName (): string {
    return AcronymService.acronym;
  }

  getAcronymDescription (): string {
    return AcronymService.acronymDescription;
  }

  ngOnInit() {

  }

}
