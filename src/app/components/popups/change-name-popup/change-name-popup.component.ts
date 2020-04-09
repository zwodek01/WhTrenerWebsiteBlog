import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-change-name-popup',
  templateUrl: './change-name-popup.component.html',
  styleUrls: ['../popup.scss']
})
export class ChangeNamePopupComponent implements OnInit {

  constructor(private fb: FormBuilder, private firebaseService: FirebaseService) { }

  ngOnInit(): void { }

  uid = JSON.parse(sessionStorage.getItem('userDetails')).uid;

  nameForm = this.fb.group(
    {
      name: ['', [Validators.required]]
    }
  );

  changeName() {
    this.firebaseService.changeNameUser(this.nameForm.value.name, this.uid)
  }
}
