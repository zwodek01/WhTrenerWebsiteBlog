import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { FirebaseService } from 'src/app/services/firebase.service';
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

  ngOnInit(): void {}

  public scrollToTarget(target: string) {
    this.router.navigate(['/']).then(() => {
      setTimeout(() => {
        this.viewportScroller.scrollToAnchor(target);
      }, 100);
    });
  }

  isLogged() {
    return this.firebaseService.isLoggedIn;
  }

  logout() {
    this.firebaseService.logout();
  }
}
