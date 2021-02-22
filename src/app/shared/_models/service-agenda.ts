import { Deserializable } from '../_dto/deserializable.model';
import { Service } from './service.model';

export class ServiceAgenda implements Deserializable {
    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }

    constructor(
        id?: number,
        key?: string,
        description?: string,
        service?: Service
    ) {
        this.id = id || 0;
        this.key = key || '';
        this.description = description || '';
        this.service = service || new Service();
    }

    id: number;
    key: string;
    description: string;
    service: Service;
}
