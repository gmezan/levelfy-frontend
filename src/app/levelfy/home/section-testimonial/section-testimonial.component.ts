import { Component, OnInit } from '@angular/core';
import { TestimonialService } from '../../../core/services/testimonial.service';

@Component({
  selector: 'app-section-testimonial',
  templateUrl: './section-testimonial.component.html',
  styleUrls: ['./section-testimonial.component.css']
})
export class SectionTestimonialComponent implements OnInit {

  testimonials = this.testimonialService.getTestimonials();

  constructor(private testimonialService: TestimonialService) { }

  ngOnInit(): void {
  }

}
