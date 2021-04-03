import { Fragment } from './fragment.model';
import { Deserializable } from '../_dto/deserializable.model';
import { Auditable } from '../_dto/auditable.model';

export class BlogPost extends Auditable implements Deserializable {
    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }

    id: number;
    title: string;
    thumbnail: string;
    description: string;
    author: string;
    photoAuthor: string;
    badge: string;
    dateTime: string;
    timeRead: string;
    fragments: string;

    constructor(
        id?: number,
        title?: string,
        thumbnail?: string,
        description?: string,
        author?: string,
        photoAuthor?: string,
        badge?: string,
        dateTime?: string,
        timeRead?: string,
        fragments?: string
    ) {
        super();
        this.id = id || 0;
        this.title = title || '';
        this.thumbnail = thumbnail || '';
        this.description = description || '';
        this.author = author || '';
        this.photoAuthor = photoAuthor || '';
        this.badge = badge || '';
        this.dateTime = dateTime || '';
        this.timeRead = timeRead || '';
        this.fragments = fragments || '';
    }
}
