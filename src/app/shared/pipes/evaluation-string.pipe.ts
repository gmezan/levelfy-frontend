import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'evaluationString',
})
export class EvaluationStringPipe implements PipeTransform {
    /*
  PC1 = 'PC1',
    PC2 = 'PC2',
    PC3 = 'PC3',
    PC4 = 'PC4',
    PC5 = 'PC5',
    EXAM_PARCIAL = 'Examen Parcial',
    EXAM_FINAL = 'Examen Final',
    EXAM_1 = 'Examen 1',
    EXAM_2 = 'Examen 2',
    EXAM_3 = 'Examen 3',
    EXAM_4 = 'Examen 4',
    EXAM_ESPECIAL = 'Examen Especial',
    OPEN = 'Open',
   */
    transform(value: unknown, ...args: unknown[]): unknown {
        switch (value) {
            case 'PC1':
                return 'PC 1';
            case 'PC2':
                return 'PC 2';
            case 'PC3':
                return 'PC 3';
            case 'PC4':
                return 'PC 4';
            case 'PC5':
                return 'PC 5';
            case 'EXAM_PARCIAL':
                return 'Examen Parcial';
            case 'EXAM_FINAL':
                return 'Examen Final';
            case 'EXAM_1':
                return 'Examen 1';
            case 'EXAM_2':
                return 'Examen 2';
            case 'EXAM_3':
                return 'Examen 3';
            case 'EXAM_4':
                return 'Examen 4';
            case 'EXAM_ESPECIAL':
                return 'Examen Especial';
            default:
                return 'Libre';
        }
    }
}
