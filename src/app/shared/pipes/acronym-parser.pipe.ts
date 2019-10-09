import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'acronymParser'
})
export class AcronymParserPipe implements PipeTransform {

  transform(value: any): any {

    return `<span class="acronym-name">${value}</span>`;
  }

}
