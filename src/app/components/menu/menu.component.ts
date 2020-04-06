import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  constructor(
    private firebaseService: FirebaseService
  ) { }

  ngOnInit(): void {
    this.isLogged();
  }

  isLoggedStatus: boolean;

  isLogged() {
    this.firebaseService.authState$.subscribe(user => {
      if (user) {
        this.isLoggedStatus = true;
      } else {
        this.isLoggedStatus = false;
      }
    });
  }

  logout() {
    this.firebaseService.logout("Wylogowano ✔");
  }
}
