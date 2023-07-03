import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'currencyRlt' })
export class CurrencyRltPipe implements PipeTransform {
  transform(value: number | undefined, cur = 'USD', local = 'de-DE'): string | void {
    if (value) {
      return new Intl.NumberFormat(local, { style: 'currency', currency: cur }).format(value);
    }
  }
}
