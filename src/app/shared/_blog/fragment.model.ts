import {Image} from './image.model';
import {List} from './list.model';
import {Cite} from './cite.model';
import {Paragraph} from './paragraph.model';

export class Fragment {
    id: number;
    subtitle: string;
    img: Image;
    paragraph: Paragraph[];
    list: List;
    cite: Cite;

    constructor(
        id?: number,
        subtitle?: string,
        img?: Image,
        paragraph?: Paragraph[],
        list?: List,
        cite?: Cite
    ) {
        this.id = id || 0;
        this.subtitle = subtitle || '';
        this.img = img || new Image();
        this.paragraph = paragraph || [];
        this.list = list || new List();
        this.cite = cite || new Cite();
    }
}
