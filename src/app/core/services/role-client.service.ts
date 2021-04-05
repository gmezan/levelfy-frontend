import { Injectable } from '@angular/core';
import { DataService } from '../common/data-service.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Enrollment } from '../../shared/_models/enrollment.model';
import { catchError } from 'rxjs/operators';
import { ServiceSession } from '../../shared/_models/service-session.model';
import { Sale } from '../../shared/_models/sale.model';
import { PaymentDto } from '../../shared/_dto/payment.dto';
import { User } from '../../shared/_models/user.model';

const uri = 'c';

@Injectable({
    providedIn: 'root',
})
export class RoleClientService extends DataService<any> {
    private apiEnrollment = '/c/enrollment';
    private apiIsAlreadyEnrolled = '/c/is-enrolled';

    private apiServiceSession = '/c/service-session';
    private apiSale = '/c/sale';

    private apiRegisterPayment = '/c/register-payment';

    private apiCompleteRegistration = '/c/user-registration';

    constructor(http: HttpClient) {
        super(uri, http);
    }

    // To get the enrollments of the user
    getEnrollments(serviceType: string): Observable<Enrollment[]> {
        let options = serviceType
            ? {
                  params: new HttpParams().set('serviceType', serviceType),
              }
            : {};

        return this.http.get<Enrollment[]>(
            this.buildPath(this.apiEnrollment),
            options
        );
    }

    // To get an enrollment
    getEnrollment(id: string): Observable<Enrollment> {
        return this.http.get<Enrollment>(
            this.buildPath(this.apiEnrollment + '/' + id)
        );
    }

    // To create a new enrollment
    postEnrollment(enrollment: Enrollment): Observable<Enrollment> {
        return this.http.post<Enrollment>(
            this.buildPath(this.apiEnrollment),
            enrollment
        );
    }

    // To delete a enrollment
    deleteEnrollment(enrollment: Enrollment) {
        return this.http.delete<Enrollment>(
            this.buildPath(this.apiEnrollment + '/' + enrollment.idEnrollment)
        );
    }

    getServiceSessionList(
        enrollment: Enrollment
    ): Observable<ServiceSession[]> {
        let options = {
            params: new HttpParams().set(
                'serviceId',
                String(enrollment.service.idService)
            ),
        };

        return this.http.get<ServiceSession[]>(
            this.buildPath(this.apiServiceSession),
            options
        );
    }

    getSaleList(enrollment: Enrollment): Observable<Sale[]> {
        let options = {
            params: new HttpParams().set(
                'enrollmentId',
                String(enrollment.idEnrollment)
            ),
        };

        return this.http.get<Sale[]>(this.buildPath(this.apiSale), options);
    }

    registerPayment(paymentDto: PaymentDto): Observable<Sale> {
        return this.http.post<Sale>(
            this.buildPath(this.apiRegisterPayment),
            paymentDto
        );
    }

    completeRegistration(user: User): Observable<User> {
        return this.http.post<User>(
            this.buildPath(this.apiCompleteRegistration),
            user
        );
    }

    cancelEnrollment(enrollment: Enrollment): Observable<any> {
        return this.http.delete<any>(
            this.buildPath(this.apiEnrollment + '/' + enrollment.idEnrollment)
        );
    }
}
