import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
declare var UIkit: any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private afAuth: AuthService, private router: Router) { }
  isAdmin: boolean = false;
  isLogged: boolean = false;

  ngOnInit() {
    this.isUserLogged()
  }

  isUserLogged() {
    this.afAuth.getCurrentUser().subscribe(user => {
      if (user === null) {
        this.isLogged = false
      } else {
        this.isLogged = true
      }
    })
  }

  logout() {
    this.afAuth.logout().then(() => {
      UIkit.notification({ message: '<span uk-icon=\'icon: check\'></span> Wylogowano', status: 'success' })
    })

  }
}
