import { Auditable } from '../_dto/auditable.model';
import { Deserializable } from '../_dto/deserializable.model';
import { Course } from './course.model';
import { User } from './user.model';
import { Enrollment } from './enrollment.model';
import { EnrollmentSession } from './enrollment-session.model';

export class Service extends Auditable implements Deserializable {
    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }

    idService: number;
    course: Course;
    teacher: User;
    photo: string;
    available: boolean;
    serviceType: string;
    price: number;
    evaluation: number;
    description: string;
    expiration: Date;
    sessionsNumber: number;
    archived: boolean;
    enrollmentList: Enrollment[];
    enrollmentSessionList: EnrollmentSession[];
}
