import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConnectionService } from 'src/app/services/connection.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  routeParam = "";
  database: any;

  constructor(private route: ActivatedRoute, private connectionService: ConnectionService) { }

  ngOnInit() {
    this.routeParam = this.route.snapshot.paramMap.get("link")
    this.getPosts(this.routeParam)
  }

  getPosts(route) {
    this.connectionService.getOnePost({ link: route }).subscribe((data) => {
      this.database = data
    })
  }

}
