import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-delete-account-popup',
  templateUrl: './delete-account-popup.component.html',
  styleUrls: ['../popup.scss']
})
export class DeleteAccountPopupComponent implements OnInit {
  constructor(private firebaseService: FirebaseService) { }

  ngOnInit(): void { }
  uid = JSON.parse(sessionStorage.getItem('userDetails')).uid;

  deleteUser() {
    this.firebaseService.deleteUser(this.uid);
  }
}
