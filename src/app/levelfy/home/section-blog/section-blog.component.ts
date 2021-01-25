import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-section-blog',
  templateUrl: './section-blog.component.html',
  styleUrls: ['./section-blog.component.css']
})
export class SectionBlogComponent implements OnInit {

  blogSection = [
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

  constructor() { }

  ngOnInit(): void {
  }

}
