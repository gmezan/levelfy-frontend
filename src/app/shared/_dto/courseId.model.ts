export class CourseId {
    idCourse;
    university;

    constructor(idCourse?: string, university?: string) {
        this.idCourse = idCourse || '';
        this.university = university || '';
    }
}
