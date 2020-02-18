import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private afAuth: AuthService, private router: Router, private db: AngularFirestore) { }
  isAdmin: boolean = false;
  isLogged: boolean = false;
  adminId: string = 'RH9lFZealkU5UPf7R1h81OvgZqG2';

  ngOnInit() {
    this.isUserLogged()
  }

  isUserLogged() {
    this.afAuth.authState.subscribe(user => {
      if (user === null) {
        this.isLogged = false
      } else {
        this.isLogged = true
        if (user.uid === this.adminId) {
          this.isAdmin = true
        } else {
          this.isAdmin = false
        }
      }
    })
  }

  logout() {
    this.afAuth.logout().then()
  }
}
