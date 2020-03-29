import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit(): void {}

  showLoader: boolean;

  registerForm = this.fb.group(
    {
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPass: ['', [Validators.required]],
      rules: ['', [Validators.required]]
    },
    {
      validator: this.checkIfMatchingPasswords('password', 'confirmPass')
    }
  );

  checkIfMatchingPasswords(
    passwordKey: string,
    passwordConfirmationKey: string
  ) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey],
        passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({ notEquivalent: true });
      } else {
        return passwordConfirmationInput.setErrors(null);
      }
    };
  }

  register() {
    this.showLoader = true;
    this.firebaseService
      .register(
        this.registerForm.value.email,
        this.registerForm.value.password,
        this.registerForm.value.name
      )
      .then(() => {
        this.showLoader = false;
      });
  }
}
