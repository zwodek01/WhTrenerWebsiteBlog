import { Component, OnInit } from '@angular/core';
import { postList } from "./postList";
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  animations: [
    trigger(
      'listAnimation',
      [
        transition(
          ':enter',
          [
            style({ opacity: 0 }),
            animate('.5s ease-out',
              style({ opacity: 1 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ opacity: 1 }),
            animate('.5s ease-in',
              style({ opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class BlogComponent implements OnInit {
  constructor() { }

  ngOnInit(): void { }

  searchText: string;
  list = postList;

  filterCategory($event) {
    this.list = [];
    if ($event.target.textContent === "Wszystkie") {
      this.list = postList;
    } else {
      this.list = postList.filter(post => post.category.includes($event.target.textContent))
    }
  }
}