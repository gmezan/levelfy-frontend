import { Injectable } from '@angular/core';
import { DataService } from '../common/data-service.service';
import { Course } from '../../shared/_models/course.model';
import { CommentForum } from '../../shared/_models/comment-forum.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const uri = '/model/comment-forum';

@Injectable({
    providedIn: 'root',
})
export class CommentForumService extends DataService<CommentForum> {
    apiUploadImage = '/s3/comment-forum/';

    constructor(http: HttpClient) {
        super(uri, http);
    }

    uploadImage(id: string, form: FormData): Observable<any> {
        if (!id) return null;
        let url = this.buildPath(this.apiUploadImage + id);
        return this.http.post<any>(url, form);
    }
}
