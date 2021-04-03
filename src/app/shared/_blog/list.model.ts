export class List {
    items: string[];
    order: number;

    constructor(
        items?: string[],
        order?: number
    ) {
        this.items = items || [];
        this.order = order || 0;
    }
}
