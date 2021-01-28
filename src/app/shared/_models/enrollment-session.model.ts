import { Auditable } from '../_dto/auditable.model';
import { Deserializable } from '../_dto/deserializable.model';
import { Service } from './service.model';

export class EnrollmentSession extends Auditable implements Deserializable {
    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
    idEnrollmentSession: number;
    class: Service;
    date: Date;
    start: Date;
    end: Date;
    zoom: string;
    description: string;
}
