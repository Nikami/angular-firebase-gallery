import { Pipe, PipeTransform } from '@angular/core';

export const ONE_MINUTE_MS: number = 60000;
export const ONE_SEC_MS: number = 1000;

@Pipe({
  name: 'msToTime'
})
export class MsToTimePipe implements PipeTransform {

  transform(value: number): string {
    let minutes: number | string = Math.floor(value / ONE_MINUTE_MS);
    minutes = ('0' + minutes).slice(-2);

    let seconds:  number | string = Math.floor((value % ONE_MINUTE_MS) / ONE_SEC_MS);
    seconds = ('0' + seconds).slice(-2);

    return `${minutes}:${seconds}`;
  }

}
