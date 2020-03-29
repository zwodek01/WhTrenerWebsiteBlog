import { Component, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';
import { FirebaseService } from './services/firebase.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private router: Router,
    private firebaseService: FirebaseService
  ) {}

  @ViewChild('sidenav') sidenav: MatSidenav;
  route: boolean = true;
  reason = '';
  user;
  adminData;
  admin: boolean;
  routes = [
    '/panel',
    '/panel-admin',
    '/trening',
    '/dieta',
    '/suplementacja',
    '/raport',
    '/ankieta',
    '/ustawienia'
  ];

  ngOnInit(): void {
    this.activeRoute();
    this.isAdmin();
  }

  activeRoute() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.route = !this.routes.includes(event.url);
      });
  }

  isAdmin() {
    this.firebaseService.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        this.adminData = this.firebaseService.afs
          .collection('users')
          .doc(user.uid)
          .valueChanges()
          .subscribe(user => {
            if (user) {
              this.admin = user['admin'];
            }
          });
      }
    });
  }

  logout() {
    this.adminData.unsubscribe();
    this.firebaseService.logout();
  }

  close(reason: string) {
    this.reason = reason;
    this.sidenav.close();
  }
}
