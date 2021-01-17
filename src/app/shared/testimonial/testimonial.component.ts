import { Component, Input, OnInit } from '@angular/core';
import { TestimonialModel } from '../_dto/testimonial.model';

@Component({
    selector: 'app-testimonial',
    templateUrl: './testimonial.component.html',
    styleUrls: ['./testimonial.component.css'],
})
export class TestimonialComponent implements OnInit {
    @Input('testimonial') testimonial: TestimonialModel;

    stars = [
        ['far', 'star'],
        ['far', 'star'],
        ['far', 'star'],
        ['far', 'star'],
        ['far', 'star'],
    ];

    constructor() {}

    validateStars(): number {
        if (this.testimonial.stars < 0) return 0;

        if (this.testimonial.stars > 5) return 5;

        let integerStar = Math.floor(this.testimonial.stars);
        let decimalStar = parseInt(
            (this.testimonial.stars % 1).toFixed(1).substring(2)
        );
        if (decimalStar < 5) {
            decimalStar = 0.0;
        } else if (decimalStar === 5) {
            decimalStar = 0.5;
        } else if (decimalStar > 5) {
            decimalStar = 1;
        }
        return integerStar + decimalStar;
    }

    ngOnInit(): void {
        let stars = this.validateStars();
        let n = Math.floor(stars);
        let i = 0;
        for (i = 0; i < n; i++) this.stars[i] = ['fas', 'star'];
        let decimalStar = parseInt((stars % 1).toFixed(1).substring(2));

        if (decimalStar === 5) {
            this.stars[i++] = ['fas', 'star-half-alt'];
        }
    }
}
