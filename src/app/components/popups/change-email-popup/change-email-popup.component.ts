import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-change-email-popup',
  templateUrl: './change-email-popup.component.html',
  styleUrls: ['../popup.scss']
})
export class ChangeEmailPopupComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private firebaseService: FirebaseService,
    private dialogRef: MatDialogRef<ChangeEmailPopupComponent>
  ) {}

  ngOnInit(): void {}

  showLoader: boolean;

  changeEmailForm = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      repeatEmail: ['', [Validators.required, Validators.email]]
    },
    {
      validator: this.checkIfMatchingEmails('email', 'repeatEmail')
    }
  );

  checkIfMatchingEmails(emailKey: string, emailConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[emailKey],
        passwordConfirmationInput = group.controls[emailConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({ notEquivalent: true });
      } else {
        return passwordConfirmationInput.setErrors(null);
      }
    };
  }

  changeEmail() {
    this.showLoader = true;
    // this.firebaseService
    //   .changeEmail(this.changeEmailForm.value.email)
    //   .then(() => {
    //     this.showLoader = false;
    //     this.dialogRef.close();
    //   });
  }
}
