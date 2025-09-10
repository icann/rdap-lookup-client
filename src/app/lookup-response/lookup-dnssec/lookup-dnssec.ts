import { Component, Input, ViewChild, ElementRef, ChangeDetectorRef, OnChanges } from '@angular/core';
import { DnsSec } from '../../lookup/Dnssec';

@Component({
    selector: 'rwc-lookup-dnssec',
    templateUrl: './lookup-dnssec.html',
    styleUrls: ['./lookup-dnssec.component.scss'],
    standalone: false
})
export class  LookupDnssecComponent implements OnChanges {
  @Input() dnsSec: DnsSec;
  @ViewChild('dnssecPanel', {static: false}) dnssecPanel: ElementRef;

  isDnssecPanelExpanded = false;
  isDnssecReduced = false;

  constructor (private cdRef: ChangeDetectorRef) {
  }

  ngOnChanges () {
    if (this.dnsSec && this.dnsSec.dsdata && this.dnsSec.dsdata.length > 2) {
      this.isDnssecReduced = true;
      this.cdRef.detectChanges();
    } else {
      this.isDnssecReduced = false;
    }
  }

  toggleDnssecPanel (): void {
    if (!this.dnsSec || !this.dnsSec.dsdata) {
      return;
    }

    if (this.dnsSec.dsdataDisplayed.length > 2) {
      this.dnsSec.dsdataDisplayed = [...this.dnsSec.dsdata.slice(0, 2)];
    } else {
      this.dnsSec.dsdataDisplayed = this.dnsSec.dsdata;
    }
    this.isDnssecPanelExpanded = this.dnsSec.dsdataDisplayed.length > 2;
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
