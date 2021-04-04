import { Auditable } from '../_dto/auditable.model';
import { Deserializable } from '../_dto/deserializable.model';
import { Role } from './role.model';

export class User extends Auditable implements Deserializable {
    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }

    constructor(idUser?: number) {
        super();
        this.idUser = idUser || 0;
    }

    idUser: number;
    email: string;
    phone: number;
    balance: number;
    code: string;
    name: string;
    lastname: string;
    coupon: string;
    photo: string;
    active: boolean;
    university: string;
    token: string;
    birthday: string;
    gender: string;
    role: Role[];

    invitingId: number;
    // "transient"
    fullName: string;
}
