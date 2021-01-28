import { Auditable } from '../_dto/auditable.model';
import { Deserializable } from '../_dto/deserializable.model';
import { User } from './user.model';
import { Sale } from './sale.model';
import { Service } from './service.model';

export class Enrollment extends Auditable implements Deserializable {
    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }

    idEnrollment: number;
    class: Service;
    student: User;
    payed: boolean;
    numberOfStudents: number;
    start: Date;
    end: Date;
    info: string;
    active: boolean;
    url: string;
    saleList: Sale[];
}
