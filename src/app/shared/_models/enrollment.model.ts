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

    constructor(
        idEnrollment?: number,
        service?: Service,
        student?: User,
        payed?: boolean
    ) {
        super();
        this.idEnrollment = idEnrollment || 0;
        this.service = service || new Service();
        this.student = student || new User();
        this.payed = payed || false;
    }

    idEnrollment: number;
    service: Service;
    student: User;
    payed: boolean;
    numberOfStudents: number;
    start: Date;
    end: Date;
    active: boolean;
    url: string;
    saleList: Sale[];
}
