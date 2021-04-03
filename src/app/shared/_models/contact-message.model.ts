import { Auditable } from '../_dto/auditable.model';
import { Deserializable } from '../_dto/deserializable.model';

export class ContactMessage extends Auditable implements Deserializable {
    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }

    id: number;
    name: string;
    contact: string;
    message: string;

    constructor(
        id?: number,
        name?: string,
        contact?: string,
        message?: string
    ) {
        super();
        this.id = id || 0;
        this.name = name || '';
        this.contact = contact || '';
        this.message = message || '';
    }
}
