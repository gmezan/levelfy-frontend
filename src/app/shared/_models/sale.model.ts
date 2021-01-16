import { Auditable } from '../_dto/auditable.model';
import { Deserializable } from '../_dto/deserializable.model';
import { User } from './user.model';

export class Sale extends Auditable implements Deserializable {
    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
    idSale: number;
    saleDateTime: Date;
    expirationDateTime: Date;
    amount: number;
    persona: User;
    coupon: string;
    message: string;
    method: string;
}
