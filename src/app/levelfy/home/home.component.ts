import { Component, OnInit } from '@angular/core';
import { servicesTypes } from '../utils/services-types';
import { TestimonialService } from '../../core/service/testimonial.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
    services = servicesTypes;

    testimonials = this.testimonialService.getTestimonials();

    constructor(private testimonialService: TestimonialService) {}

    ngOnInit(): void {}
}
