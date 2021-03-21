export class CourseInfoDto {
    courseName: string;
    courseId: string;
    university: string;

    constructor(courseName?: string, courseId?: string, university?: string) {
        this.courseId = courseId || '';
        this.courseName = courseName || '';
        this.university = university || '';
    }
}
