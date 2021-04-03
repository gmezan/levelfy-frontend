export class Paragraph {
    id: number;
    text: string;
    order: number;

    constructor(
        id?: number,
        text?: string,
        order?: number
    ) {
        this.id = id || 0;
        this.text = text || '';
        this.order = order || 0;
    }
}
