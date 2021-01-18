export class CourseId {
    constructor(private _idCourse?: string, private _university?: string) {}

    get idCourse(): string {
        return this._idCourse;
    }

    set idCourse(value: string) {
        this._idCourse = value;
    }

    get university(): string {
        return this._university;
    }

    set university(value: string) {
        this._university = value;
    }
}
