import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'universityString',
})
export class UniversityStringPipe implements PipeTransform {
    transform(value: string, ...args: unknown[]): string {
        switch (value) {
            case 'PUCP':
                return 'Pontificia Universidad Católica del Perú';

            case 'UL':
                return 'Universidad de Lima';

            case 'UDEP':
                return 'Universidad de Piura';

            case 'UPC':
                return 'Universidad Peruana de Ciencias Aplicadas';

            default:
                return value;
        }
    }
}
