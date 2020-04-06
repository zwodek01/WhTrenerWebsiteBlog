import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit(): void {}

  showLoader: boolean;

  forgotForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  forgotPassword() {
    this.showLoader = true;
    this.firebaseService
      .forgotPassword(this.forgotForm.value.email)
      .then(() => {
        this.showLoader = false;
      });
  }
}
