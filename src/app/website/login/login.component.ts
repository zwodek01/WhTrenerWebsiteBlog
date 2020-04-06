import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {}

  showLoader: boolean;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ])
  });

  loginWithEmailAndPassword() {
    this.showLoader = true;
    this.firebaseService
      .loginWithEmailAndPassword(
        this.loginForm.value.email,
        this.loginForm.value.password
      )
      .then(() => {
        this.showLoader = false;
      });
  }

  loginWithGoogle() {
    this.firebaseService.googleAuth();
  }
}
