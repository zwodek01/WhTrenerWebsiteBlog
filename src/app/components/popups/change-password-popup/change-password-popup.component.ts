import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-change-password-popup',
  templateUrl: './change-password-popup.component.html',
  styleUrls: ['../popup.scss']
})
export class ChangePasswordPopupComponent implements OnInit {
  constructor(private fb: FormBuilder, private firebaseService: FirebaseService) { }

  ngOnInit(): void { }

  showLoader: boolean;

  passwordForm = this.fb.group(
    {
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPass: ['', [Validators.required]]
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

  changePassword() {
    this.firebaseService.changePasswordUser(this.passwordForm.value.password)
  }
}
