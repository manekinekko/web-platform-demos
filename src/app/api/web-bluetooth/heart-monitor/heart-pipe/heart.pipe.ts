import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'heart'
})
export class HeartPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    if( value && /\d+/.test(value) ) {
      return `${ value } <span class="x-heartbeat">❤️</span>`;
    }

    return value;
  }

}
