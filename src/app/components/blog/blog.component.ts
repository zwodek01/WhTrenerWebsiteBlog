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
  category;
  unique;

  ngOnInit() {
    this.connectionService.getPosts().subscribe((date) => {
      this.database = date
      this.category = date
    })

  }


  filterByCategory(event) {
    let category = { category: event.target.textContent }
    this.connectionService.getCategory(category).subscribe((date) => {
      this.database = date
    })
    var unique = this.category.filter(function (elem, index, self) {
      return index === self.indexOf(elem);
    })
  }
}
