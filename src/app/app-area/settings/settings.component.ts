import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ChangeNamePopupComponent } from 'src/app/components/popups/change-name-popup/change-name-popup.component';
import { ChangeEmailPopupComponent } from 'src/app/components/popups/change-email-popup/change-email-popup.component';
import { ChangePasswordPopupComponent } from 'src/app/components/popups/change-password-popup/change-password-popup.component';
import { DeleteAccountPopupComponent } from 'src/app/components/popups/delete-account-popup/delete-account-popup.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {}

  DeleteAccountPopupComponent = DeleteAccountPopupComponent;
  ChangePasswordPopupComponent = ChangePasswordPopupComponent;
  ChangeEmailPopupComponent = ChangeEmailPopupComponent;
  ChangeNamePopupComponent = ChangeNamePopupComponent;

  openPopup(component) {
    this.firebaseService.openPopup(component);
  }
}
