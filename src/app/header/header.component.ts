import { Component, OnInit } from '@angular/core';

import * as $ from 'jquery';
import { Foundation } from 'foundation-sites/dist/js/foundation.min';

@Component({
  selector: 'rwc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor () { }

  ngOnInit() {
    $(document).ready(() => {
      Foundation.addToJquery($);
      $(document).foundation();
      $(window).on('changed.zf.mediaquery', function() {
        $('.is-dropdown-submenu.invisible').removeClass('invisible');
      });
    });
  }

  }
