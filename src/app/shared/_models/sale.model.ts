import { Auditable } from '../_dto/auditable.model';
import { Deserializable } from '../_dto/deserializable.model';
import { User } from './user.model';
import { Enrollment } from './enrollment.model';

export class Sale extends Auditable implements Deserializable {
    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }

    constructor(
        idSale?: number,
        enrollment?: Enrollment,
        saleDateTime?: Date,
        expirationDate?: Date,
        amount?: number,
        persona?: string
    ) {
        super();
        this.idSale = idSale || 0;
        this.enrollment = enrollment || new Enrollment();
        this.saleDateTime = saleDateTime || new Date();
        this.expirationDateTime = expirationDate || new Date();
        this.amount = amount || 0;
        this.persona = persona || '';
    }

    idSale: number;
    enrollment: Enrollment;
    saleDateTime: Date;
    expirationDateTime: Date;
    amount: number;
    persona: string;
    coupon: string;
    message: string;
    method: string;
}
