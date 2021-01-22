import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Testimonial } from '../../shared/_dto/testimonial';
import { DataService } from '../common/data-service.service';

const uri = '/model/testimonial';

@Injectable()
export class TestimonialService extends DataService<Testimonial> {
    constructor(http: HttpClient) {
        super(uri, http);
    }

    testimonialsTest = [
        new Testimonial(
            'Mensaje del testimonio 1',
            'Nombre Testimonio 1',
            'Estudiante de la PUCP',
            4.5,
            'https://genslerzudansdentistry.com/wp-content/uploads/2015/11/anonymous-user.png'
        ),
        new Testimonial(
            'Mensaje del testimonio 2',
            'Nombre Testimonio 2',
            'Estudiante de la UDEP',
            5,
            'https://genslerzudansdentistry.com/wp-content/uploads/2015/11/anonymous-user.png'
        ),
        new Testimonial(
            'Mensaje del testimonio 3',
            'Nombre Testimonio 3',
            'Estudiante de la ULIMA',
            3.5,
            'https://genslerzudansdentistry.com/wp-content/uploads/2015/11/anonymous-user.png'
        ),
    ];

    getTestimonials() {
        return this.testimonialsTest;
    }
}
