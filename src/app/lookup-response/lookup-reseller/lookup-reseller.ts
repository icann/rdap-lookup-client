import { Component, Input } from '@angular/core';
import { Reseller } from 'src/app/lookup/Reseller';

@Component({
  selector: 'rwc-lookup-reseller',
  templateUrl: './lookup-reseller.html'
})
export class LookupResellerComponent {
  @Input() reseller: Reseller;

  constructor () {

  }
}
