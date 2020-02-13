import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { FirebaseService } from '../../../services/firebase.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  backgroundImg: SafeStyle;
  routeParam = "";
  database: any;

  constructor(private route: ActivatedRoute, private firebaseService: FirebaseService, private sanitizer: DomSanitizer, private location: Location) { }

  ngOnInit() {
    this.routeParam = this.route.snapshot.paramMap.get("link")
    this.getPosts(this.routeParam)
  }

  getPosts(route) {
    this.firebaseService.getOnePost(route).subscribe((data) => {
      this.database = data
      this.backgroundImg = this.sanitizer.bypassSecurityTrustStyle('url(' + this.database.image + ')');
    })
  }

  backToLastPage() {
    window.scroll(0, 0);
    this.location.back();
  }

}
