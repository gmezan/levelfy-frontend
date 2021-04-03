import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog-header',
  templateUrl: './blog-header.component.html',
  styleUrls: ['./blog-header.component.css']
})
export class BlogHeaderComponent implements OnInit {

  @Input() author = 'author';
  @Input() date = 'date';
  @Input() time = 'time';
  @Input() photo = 'photo';

  @Input() title = 'title';
  @Input() description = 'description';

  constructor() { }

  ngOnInit(): void {
  }

}
