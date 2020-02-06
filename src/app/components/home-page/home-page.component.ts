import { Component, OnInit } from '@angular/core';
import { ConnectionService } from 'src/app/services/connection.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  database: Object;
  p: number = 1;

  constructor(private connectionService: ConnectionService) { }

  ngOnInit() {
    this.getPosts()
  }

  getPosts() {
    this.connectionService.getPosts().subscribe((data) => {
      this.database = data
      console.log(this.database)
    })
  }
}
