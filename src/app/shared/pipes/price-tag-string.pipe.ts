import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'priceTagString',
})
export class PriceTagStringPipe implements PipeTransform {
    transform(value: number, ...args: unknown[]): unknown {
        if (!value) return value;
        if (value == 0) return 'GRATIS';
        else return value.toString();
    }
}
