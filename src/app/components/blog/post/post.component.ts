import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConnectionService } from 'src/app/services/connection.service';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  backgroundImg: SafeStyle;
  routeParam = "";
  database: any;

  constructor(private route: ActivatedRoute, private connectionService: ConnectionService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.routeParam = this.route.snapshot.paramMap.get("link")
    this.getPosts(this.routeParam)
  }

  getPosts(route) {
    this.connectionService.getOnePost({ link: route }).subscribe((data) => {
      this.database = data
      this.backgroundImg = this.sanitizer.bypassSecurityTrustStyle('url(' + this.database.image + ')');
    })
  }

}
