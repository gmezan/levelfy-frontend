import { Deserializable } from '../_dto/deserializable.model';

export class Role implements Deserializable {
    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }

    idRole: number;
    name: string;
}
