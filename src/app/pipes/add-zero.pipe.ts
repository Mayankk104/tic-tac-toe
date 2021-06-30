import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addZero'
})
export class AddZeroPipe implements PipeTransform {

  transform(digit: number): string {
    if(digit<10)
      return `0${digit}`;
    else
      return `${digit}`
  }

}
