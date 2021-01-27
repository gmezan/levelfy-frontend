export class Modal {
    constructor(
        private _title?: string,
        private _submitButton?: string,
        private _cancelButton?: string,
        private _isDelete?: boolean,
        private _isCreate?: boolean,
        private _isEdit?: boolean,
        private _file?: any,
        private _hasFile?: boolean
    ) {}

    modalCreate({ title, submit, cancel }) {
        this.isCreate = true;
        this.title = title;
        this.submitButton = submit;
        this.cancelButton = cancel;
        this.hasFile = false;
        this.file = null;
    }

    modalEdit({ title, submit, cancel }) {
        this.isEdit = true;
        this.title = title;
        this.submitButton = submit;
        this.cancelButton = cancel;
        this.hasFile = false;
        this.file = null;
    }

    modalDelete({ title, submit, cancel }) {
        this.isDelete = true;
        this.title = title;
        this.submitButton = submit;
        this.cancelButton = cancel;
        this.hasFile = false;
        this.file = null;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get submitButton(): string {
        return this._submitButton;
    }

    set submitButton(value: string) {
        this._submitButton = value;
    }

    get cancelButton(): string {
        return this._cancelButton;
    }

    set cancelButton(value: string) {
        this._cancelButton = value;
    }

    get isDelete(): boolean {
        return this._isDelete;
    }

    set isDelete(value: boolean) {
        this._isCreate = false;
        this._isEdit = false;
        this._isDelete = value;
    }

    get isCreate(): boolean {
        return this._isCreate;
    }

    set isCreate(value: boolean) {
        this._isDelete = false;
        this._isEdit = false;
        this._isCreate = value;
    }

    get isEdit(): boolean {
        return this._isEdit;
    }

    set isEdit(value: boolean) {
        this._isDelete = false;
        this._isCreate = false;
        this._isEdit = value;
    }

    get file(): any {
        return this._file;
    }

    set file(value: any) {
        this._file = value;
    }

    get hasFile(): boolean {
        return this._hasFile;
    }

    set hasFile(value: boolean) {
        this._hasFile = value;
    }
}
