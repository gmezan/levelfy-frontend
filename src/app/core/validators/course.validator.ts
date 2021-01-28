import {
    AbstractControl,
    AsyncValidatorFn,
    ValidationErrors,
} from '@angular/forms';

export class CourseValidator {
    static shouldBeUnique(
        control: AbstractControl
    ): Promise<ValidationErrors | null> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (false) {
                    // already exists
                    reject('Course already exist');
                } else resolve(null);
            }, 2000);
        });
    }
}
