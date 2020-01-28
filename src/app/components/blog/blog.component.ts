import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../../services/connection.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  constructor(private connectionService: ConnectionService) { }

  database;
  listCategory;
  allDatabase;
  p: number = 1;

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
    })
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
    this.p = 1;
  }

  filterByCategory(event) {
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
