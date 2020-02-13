import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  database: any;
  p: number = 1;

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.getPosts()
  }

  getPosts() {
    this.firebaseService.getPosts().subscribe((data) => {
      this.database = data
    })
  }
}
