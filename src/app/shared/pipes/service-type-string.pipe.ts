import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'serviceTypeString',
})
export class ServiceTypeStringPipe implements PipeTransform {
    transform(value: unknown, ...args: unknown[]): unknown {
        switch (value) {
            case 'ASES_PAQ':
                return 'Paquete de Asesorías';

            case 'ASES_PER':
                return 'Asesoría Personalizada';

            case 'MAR':
                return 'Maratón';

            case 'SELF_P':
                return 'Aprende a tu ritmo';

            default:
                return value;
        }
    }
}
