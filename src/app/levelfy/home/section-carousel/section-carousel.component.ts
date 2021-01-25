import { Component, OnInit } from '@angular/core';
import { servicesTypes } from '../../utils/services-types';

@Component({
  selector: 'app-section-carousel',
  templateUrl: './section-carousel.component.html',
  styleUrls: ['./section-carousel.component.css']
})
export class SectionCarouselComponent implements OnInit {

  services = servicesTypes;

  constructor() { }

  ngOnInit(): void {
  }

}
