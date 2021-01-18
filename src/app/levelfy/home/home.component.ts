import { Component, OnInit } from '@angular/core';
import { servicesTypes } from '../utils/services-types';
import { TestimonialService } from '../../core/service/testimonial.service';

const blogSection = [
    {
        message:
            '¿Quieres conocer más acerca de tus cursos? Entra a nuestro blog y averigua que te espera',
        route: ['/blog'],
        buttonMessage: 'Conoce más',
    },
    {
        message:
            'Consejos para tu vida universitaria Apps, actividades y mucho más',
        route: ['/blog'],
        buttonMessage: 'Conoce más',
    },
    {
        message: 'Tenemos resumenes de lecturas para ti',
        route: ['/blog'],
        buttonMessage: 'Conoce más',
    },
];

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
    services = servicesTypes;
    blogSection = blogSection;

    testimonials = this.testimonialService.getTestimonials();

    constructor(private testimonialService: TestimonialService) {}

    ngOnInit(): void {}
}
