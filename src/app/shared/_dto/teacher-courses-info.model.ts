import { CourseInfoDto } from './course-info-dto.model';

export class TeacherCoursesInfo {
    userId: number;
    fullName: string;
    photo: string;
    courseInfoDtoList: CourseInfoDto[];

    constructor(
        userId?: number,
        fullName?: string,
        photo?: string,
        courseInfoDtoList?: CourseInfoDto[]
    ) {
        this.userId = userId || 0;
        this.fullName = fullName || '';
        this.photo = photo || '';
        this.courseInfoDtoList = courseInfoDtoList || [];
    }
}
