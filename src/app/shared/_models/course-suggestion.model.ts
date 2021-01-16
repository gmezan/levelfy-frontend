import { Auditable } from '../_dto/auditable.model';
import { Deserializable } from '../_dto/deserializable.model';
import { User } from './user.model';

export class CourseSuggestion extends Auditable implements Deserializable {
    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
    idSuggestion: number;
    user: User;
    name: string;
    service: string;
}
