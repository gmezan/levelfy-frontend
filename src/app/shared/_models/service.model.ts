import { Auditable } from '../_dto/auditable.model';
import { Deserializable } from '../_dto/deserializable.model';
import { Course } from './course.model';
import { User } from './user.model';
import { Enrollment } from './enrollment.model';
import { ServiceSession } from './service-session.model';
import { Evaluations } from '../../core/util/evaluations.data';
import { ServiceAgenda } from './service-agenda';

export class Service extends Auditable implements Deserializable {
    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }

    constructor(
        idService?: number,
        course?: Course,
        teacher?: User,
        photo?: string,
        available?: boolean,
        archived?: boolean
    ) {
        super();
        this.idService = idService || 0;
        this.course = course || new Course();
        this.teacher = teacher || new User();
        this.photo = photo || '';
        this.available = available || true;
        this.serviceSessionList = [];
        this.archived = archived || false;
        this.serviceAgendaList = [];
    }

    idService: number;
    course: Course;
    teacher: User;
    photo: string;
    available: boolean;
    serviceType: string;
    price: number;
    evaluation: Evaluations;
    description: string;
    expiration: Date;
    archived: boolean;
    enrollmentList: Enrollment[];
    serviceSessionList: ServiceSession[];
    serviceAgendaList: ServiceAgenda[];
}
