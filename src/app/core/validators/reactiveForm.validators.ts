import {
    AbstractControl,
    FormControl,
    FormGroup,
    ValidationErrors,
} from '@angular/forms';

export class ReactiveFormValidators {
    static hasChanged = (initialValue: any): any => {
        return (control: FormControl) => {
            if (
                JSON.stringify(initialValue) !== JSON.stringify(control.value)
            ) {
                return {
                    changed: true,
                };
            }
            return null;
        };
    };
}
