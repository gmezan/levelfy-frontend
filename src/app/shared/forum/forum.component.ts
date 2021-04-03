import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { CommentForum } from '../_models/comment-forum.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../core/services/service.service';
import { RoleClientService } from '../../core/services/role-client.service';
import { DOCUMENT } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentForumService } from '../../core/services/comment-forum.service';
import { Service } from '../_models/service.model';
import { Enrollment } from '../_models/enrollment.model';
import { AuthService } from '../../core/security/auth.service';
import { Modal } from '../_dto/modal.model';

const modalStrings = {
    edit: { title: 'Editar Comentario', submit: 'Guardar', cancel: 'Cancelar' },
    delete: {
        title: 'Borrar Comentario',
        submit: 'Borrar',
        cancel: 'Cancelar',
    },
};

const ALLOWED_CONTENT_TYPES = [
    'application/pdf',
    'image/png',
    'image/jpg',
    'image/jpeg',
    'text/plain',
    'image/gif',
];

@Component({
    selector: 'app-forum',
    templateUrl: './forum.component.html',
    styleUrls: ['./forum.component.css'],
})
export class ForumComponent implements OnInit {
    @Input('service') service: Service;
    comment: CommentForum;
    comments: CommentForum[];

    hasFile: boolean = false;
    fileFormData: any;
    commentForm: FormGroup;

    form: FormGroup;
    modal: Modal = new Modal();
    indexAux: number;

    private modalStrings = modalStrings;

    constructor(
        private route: ActivatedRoute,
        private serviceService: ServiceService,
        private router: Router,
        private roleClientService: RoleClientService,
        private fb: FormBuilder,
        private commentForumService: CommentForumService,
        public authService: AuthService
    ) {
        this.comment = new CommentForum();
        this.commentForm = this.fillModal();
        this.form = this.fillModal();
        this.comments = [];
    }

    fillModal(): FormGroup {
        // Validations must be according to the database
        return this.fb.group({
            idComment: [this.comment.idComment],
            comment: [
                this.comment.comment,
                [Validators.required, Validators.maxLength(1000)],
            ],
            fileUrl: [this.comment.fileUrl],
            fileName: [this.comment.fileName],
            user: this.fb.group({
                idUser: [this.comment.user.idUser],
            }),
            dateTime: [this.comment.dateTime],
            service: this.fb.group({
                idService: [this.comment.service.idService],
            }),
        });
    }

    ngOnInit(): void {
        this.restartCommentForum();
        this.commentForumService
            .getAll({ serviceId: this.service.idService })
            .subscribe(
                (data) => {
                    this.comments = data;
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    submitForm() {
        let commentForum: CommentForum = this.commentForm.value;

        this.commentForumService.create(commentForum).subscribe(
            (data) => {
                this.appendComment(data);
                let index = this.comments.indexOf(data);
                if (!this.hasFile) {
                    this.restartCommentForum();
                    return;
                }
                this.commentForumService
                    .uploadImage(
                        data.idComment.toString(),
                        this.obtainImageFormData(this.fileFormData)
                    )
                    .subscribe(
                        (imageData) => {
                            data.fileUrl = imageData.url;
                            data.fileName = imageData.name;
                            // Replace this new Data with the data (photo) updated
                            this.replaceCommentAt(index, data);
                            this.restartCommentForum();
                        },
                        (error) => {
                            this.restartCommentForum();
                            alert(
                                'Something went wrong uploading the image: ' +
                                    error.toString()
                            );
                        }
                    );
            },
            (error) =>
                alert(
                    'Hubo un problema al enviar el comentario: ' +
                        error.toString()
                )
        );
        // At the end
    }

    protected addCommentAt(index: number, resource: CommentForum): void {
        this.comments.splice(index, 0, resource);
    }

    protected appendComment(resource: CommentForum): void {
        this.addCommentAt(this.comments.length, resource);
    }

    protected replaceCommentAt(index: number, resource: CommentForum): void {
        this.comments.splice(index, 1, resource);
    }

    protected deleteCommentAt(index: number): void {
        this.comments.splice(index, 1);
    }

    private restartCommentForum() {
        this.comment = new CommentForum();
        this.comment.service = this.service;
        this.commentForm = this.fillModal();
        this.hasFile = false;
        this.fileFormData = null;
    }

    // ---------------------------------------------------- Methods for the modal
    modalEdit(id: string, index: number) {
        this.indexAux = index;
        this.modal.modalEdit(this.modalStrings.edit);
        this.commentForumService.get(id).subscribe(
            (data) => {
                this.comment = data;
                this.form = this.fillModal();
            },
            (error) => {
                alert('Something wrong happened: ' + error);
            }
        );
    }

    modalDelete(id: string, index: number) {
        this.indexAux = index;
        this.modal.modalDelete(this.modalStrings.delete);
        this.commentForumService.get(id).subscribe(
            (data) => {
                this.comment = data;
                this.form = this.fillModal();
            },
            (error) => {
                alert('Something wrong happened: ' + error);
            }
        );
    }

    protected obtainImageFormData(fileFormData: any): FormData {
        const formData = new FormData();
        formData.append('file', fileFormData, fileFormData.name);
        return formData;
    }

    onSubmitModalForm() {
        // Using Pessimistic update
        if (!this.form.valid) {
            //console.log(this.form);
            alert('Invalid submit');
            return;
        }
        // Getting utils variables
        let commentForum: CommentForum = this.form?.value;
        let index: number = this.indexAux;
        let id: string = commentForum.idComment.toString();

        if (this.modal.isDelete)
            this.commentForumService.delete(id).subscribe(
                (data) => {
                    this.deleteCommentAt(index);
                },
                (error) => {
                    console.log(error);
                }
            );
        else if (this.modal.isEdit)
            this.commentForumService.update(commentForum).subscribe(
                (data) => {
                    // Replace the Data with the data updated
                    this.replaceCommentAt(index, data);
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    onSelectFile(event) {
        // called each time file input changes (for the modal)

        this.modal.hasFile = true;
        this.modal.fileFormData = event.target.files[0];
    }

    onSelectFileToCreate(event) {
        // called each time file input changes

        this.hasFile = true;
        this.fileFormData = event.target.files[0];

        if (!ALLOWED_CONTENT_TYPES.includes(this.fileFormData.type)) {
            this.commentForm.get('fileName').setValue('');
            alert(
                'Solo se permite adjuntar archivos JPG, JPEG, PDF, PNG y TXT'
            );
        }
    }
}
