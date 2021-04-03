import { Auditable } from '../_dto/auditable.model';
import { Deserializable } from '../_dto/deserializable.model';
import { User } from './user.model';
import { Service } from './service.model';

export class CommentForum extends Auditable implements Deserializable {
    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
    idComment: number;
    comment: string;
    fileUrl: string;
    fileName: string;
    user: User;
    dateTime: string;
    service: Service;

    constructor(
        idComment?: number,
        comment?: string,
        photo?: string,
        user?: User,
        dateTime?: string,
        service?: Service,
        fileName?: string
    ) {
        super();
        this.idComment = idComment || 0;
        this.comment = comment || '';
        this.fileUrl = photo || '';
        this.user = user || new User();
        this.dateTime = dateTime || new Date().toISOString();
        this.service = service || new Service();
        this.fileName = fileName || '';
    }
}
