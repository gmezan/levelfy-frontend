import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TestimonialModel } from '../../shared/_dto/testimonial.model';
import { GeneralService } from './_general-service.service';

@Injectable()
export class TestimonialService extends GeneralService {
    testimonialsTest = [
        new TestimonialModel(
            'Mensaje del testimonio 1',
            'Nombre Testimonio 1',
            'Estudiante de la PUCP',
            4.5,
            'https://genslerzudansdentistry.com/wp-content/uploads/2015/11/anonymous-user.png'
        ),
        new TestimonialModel(
            'Mensaje del testimonio 2',
            'Nombre Testimonio 2',
            'Estudiante de la UDEP',
            5,
            'https://genslerzudansdentistry.com/wp-content/uploads/2015/11/anonymous-user.png'
        ),
        new TestimonialModel(
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
