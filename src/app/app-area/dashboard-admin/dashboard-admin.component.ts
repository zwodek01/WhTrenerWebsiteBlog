import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss'],
})
export class DashboardAdminComponent implements OnInit {
  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.getAllDataUser();
  }

  userData;
  userList;
  selectedUser;

  getAllDataUser() {
    this.userData = this.firebaseService.afs
      .collection('users')
      .valueChanges()
      .subscribe((users) => {
        this.userList = users;
        console.log(users);
      });
  }

  onSelect(user): void {
    this.selectedUser = user;
  }

  ngOnDestroy() {
    this.userData.unsubscribe();
  }
}
