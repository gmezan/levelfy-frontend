import { Auditable } from '../_dto/auditable.model';
import { Deserializable } from '../_dto/deserializable.model';
import { Service } from './service.model';

export class ServiceSession extends Auditable implements Deserializable {
    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
    idServiceSession: number;
    service: Service;
    date: Date;
    start: Date;
    end: Date;
}
