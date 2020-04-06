import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AppAreaComponent } from 'src/app/app-area/app-area.component';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  constructor(
    private router: Router,
    private viewportScroller: ViewportScroller,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit(): void {
    this.isLogged();
  }

  isLoggedStatus: boolean;

  scrollToTarget(target: string) {
    this.router.navigate(['/']).then(() => {
      setTimeout(() => {
        this.viewportScroller.scrollToAnchor(target);
      }, 100);
    });
  }

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
    this.firebaseService.logout();
  }
}
