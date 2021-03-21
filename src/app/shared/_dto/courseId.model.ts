export class CourseId {
    idCourse: string;
    university: string;

    constructor(idCourse?: string, university?: string) {
        this.idCourse = idCourse || '';
        this.university = university || '';
    }
}
