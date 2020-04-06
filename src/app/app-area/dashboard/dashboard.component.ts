import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private firebaseService: FirebaseService) { }

  uid = JSON.parse(sessionStorage.getItem('userDetails')).uid;
  userDetails;
  user;

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails() {
    this.userDetails = this.firebaseService
      .getUserDetails(this.uid)
      .subscribe(user => {
        this.user = user;
        console.log(user);
      });
  }

  ngOnDestroy(): void {
    this.userDetails.unsubscribe();
  }
}
