import { Auditable } from '../_dto/auditable.model';
import { Deserializable } from '../_dto/deserializable.model';
import { CourseId } from '../_dto/courseId.model';

export class Course extends Auditable implements Deserializable {
    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
    courseId: CourseId;
    name: string;
    cycle: number;
    photo: string;
    description: string;
    // "transient"
    univNameStr: string;
}
