import { Auditable } from '../_dto/auditable.model';
import { Deserializable } from '../_dto/deserializable.model';
import { User } from './user.model';
import { Course } from './course.model';
import DateTimeFormat = Intl.DateTimeFormat;

export class SaleCanceled extends Auditable implements Deserializable {
    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }

    constructor(
        id?: number,
        student?: User,
        teacher?: User,
        course?: Course,
        serviceType?: string,
        paymentDateTime?: Date,
        amount?: number,
        message?: string,
        method?: string,
        dateTimeSaleCreation?: Date,
        solved?: boolean
    ) {
        super();
        this.id = id || 0;
        this.student = student || new User();
        this.teacher = teacher || new User();
        this.course = course || new Course();
        this.serviceType = serviceType || '';
        this.paymentDateTime = paymentDateTime || new Date();
        this.amount = amount || 0;
        this.message = message || '';
        this.method = method || '';
        this.dateTimeSaleCreation = dateTimeSaleCreation || new Date();
        this.solved = solved || false;
    }

    id: number;
    student: User;
    teacher: User;
    course: Course;
    serviceType: string;
    paymentDateTime: Date;
    amount: number;
    message: string;
    method: string;
    dateTimeSaleCreation: Date;
    solved: boolean;
}
