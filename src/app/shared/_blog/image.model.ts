export class Image {
    src: string;
    description: string;
    order: number;

    constructor(
        src?: string,
        description?: string,
        order?: number
    ) {
        this.src = src || '';
        this.description = description || '' ;
        this.order = order || 0;
    }
}
