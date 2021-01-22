import { ErrorHandler } from '@angular/core';

/*
    Global error handler
*/

export class MyErrorHandler implements ErrorHandler {
    handleError(error: any) {
        // do something with the exception
        console.log('Global error handling');
        alert(error);
    }
}
