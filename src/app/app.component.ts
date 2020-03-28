import { Component, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private router: Router) {}

  @ViewChild('sidenav') sidenav: MatSidenav;
  activeRoute: boolean = true;

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
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.activeRoute = !this.routes.includes(event.url);
      });
  }
  reason = '';
  close(reason: string) {
    this.reason = reason;
    this.sidenav.close();
  }
}
