import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unit'
})
export class UnitPipe implements PipeTransform {

  transform(value: string, unit: string, args?: any): string {

    if( value && /\d+/.test(value) ) {
      return `${ value } <span>${ unit }</span>`;
    }

    return value;
  }

}
