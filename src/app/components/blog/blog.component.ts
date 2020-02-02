import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../../services/connection.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ opacity: 0 }),
            animate('1s ease-out',
              style({ opacity: 1 }))
          ]
        )
      ]
    )
  ]
})
export class BlogComponent implements OnInit {

  constructor(private connectionService: ConnectionService) { }

  database: any;
  listCategory: Array<string>;
  allDatabase: any;
  p: number = 1;
  showPost: boolean;

  ngOnInit() {
    this.getPosts()
  }

  getPosts() {
    this.connectionService.getPosts().subscribe((data) => {
      this.database = data
      this.allDatabase = data;
      let categoryList = [];
      this.database.forEach((item) => {
        categoryList.push(item.category)
      })
      const list = new Set(categoryList)
      const uniqueList = [...list]
      this.listCategory = uniqueList
      this.showPost = true;
    })
  }

  scroll() {
    return window.scroll(0, 300);
  }

  filterByCategory(event) {
    this.scroll()
    if (event.target.innerText === "Wszystko") {
      this.database = this.allDatabase
    } else {
      let category = { category: event.target.innerText }
      this.connectionService.getCategory(category).subscribe((data) => {
        this.database = data
      })
    }
    this.p = 1;
  }
}
