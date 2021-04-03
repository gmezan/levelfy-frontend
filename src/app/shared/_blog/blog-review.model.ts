import { Auditable } from '../_dto/auditable.model';
import { Deserializable } from '../_dto/deserializable.model';

export class BlogReview extends Auditable implements Deserializable {
    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }

    constructor(
        id?: number,
        idBlog?: number,
        author?: string,
        email?: string,
        phone?: string,
        review?: string
    ) {
        super();
        this.id = id || 0;
        this.idBlog = idBlog || 0;
        this.author =  author || '';
        this.email = email || '';
        this.phone = phone || '';
        this.review = review || '';
    }

    id: number;
    idBlog: number;
    author: string;
    email: string;
    phone: string;
    review: string;
}
