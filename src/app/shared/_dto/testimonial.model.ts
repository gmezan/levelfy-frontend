export class TestimonialModel {
    constructor(
        private _message?: string,
        private _name?: string,
        private _description?: string,
        private _stars?: number,
        private _photoUrl?: string
    ) {}

    get photoUrl(): string {
        return this._photoUrl;
    }

    set photoUrl(value: string) {
        this._photoUrl = value;
    }

    get message(): string {
        return this._message;
    }

    set message(value: string) {
        this._message = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    get stars(): number {
        return this._stars;
    }

    set stars(value: number) {
        this._stars = value;
    }
}
