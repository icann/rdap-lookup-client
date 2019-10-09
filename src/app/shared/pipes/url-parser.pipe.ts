import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'urlParser'
})
export class UrlParserPipe implements PipeTransform {

  private target = '_blank';
  private title = '';
  private link = '';

  transform(value: any, link?: any, target?: any, title?: any): any {
    if (link) {
      this.link = link;
    } else {
      this.link = value;
    }

    if (target) {
      this.target = target;
    }

    if (title) {
      this.title = title;
    }

    if (
      this.link &&
      !this.link.toLowerCase().includes('http://') &&
      !this.link.toLowerCase().includes('https://')) {
      this.link = `http://${this.link}`;
    }

    return this.title === ''
      ? `<a href="${this.link}" target="${this.target}"> ${value} </a>`
      : `<a title="${this.title}" href="${this.link}" target="${this.target}"> ${value} </a>`;
  }
}
