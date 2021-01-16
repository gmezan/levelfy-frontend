import { Auditable } from '../_dto/auditable.model';
import { Deserializable } from '../_dto/deserializable.model';
import { User } from './user.model';

export class CourseSuggestion extends Auditable implements Deserializable {
    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
    idComment: number;
    comment: string;
    photo: string;
    user: User;
    dateTime: string;
    idService: string;
}
