import { Component, Input, OnInit } from '@angular/core';
import { Fragment } from '../../../../shared/_blog/fragment.model';

@Component({
  selector: 'app-blog-fragment',
  templateUrl: './blog-fragment.component.html',
  styleUrls: ['./blog-fragment.component.css']
})
export class BlogFragmentComponent implements OnInit {

  @Input() fragment: Fragment = new Fragment();

  constructor() { }

  ngOnInit(): void {
  }

}
