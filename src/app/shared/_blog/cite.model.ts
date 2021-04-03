export class Cite {
    text: string;
    order: number;

    constructor(
        text?: string,
        order?: number
    ) {
        this.text = text || '';
        this.order = order || 0;
    }
}
