import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-app-area',
  templateUrl: './app-area.component.html',
  styleUrls: ['./app-area.component.scss']
})
export class AppAreaComponent implements OnInit {
  constructor(private firebaseService: FirebaseService) { }

  @ViewChild('sidenav') sidenav: MatSidenav;
  reason = '';
  user;
  adminData;
  admin: boolean;

  ngOnInit(): void {
    this.isAdmin();
  }

  ngOnDestroy(): void {
    this.adminData.unsubscribe();
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
    this.firebaseService.logout('Wylogowano ✔');
  }

  close(reason: string) {
    this.reason = reason;
    this.sidenav.close();
  }
}
