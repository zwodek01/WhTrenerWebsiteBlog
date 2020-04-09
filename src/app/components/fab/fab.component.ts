import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ContactPopupComponent } from 'src/app/components/popups/contact-popup/contact-popup.component';

@Component({
  selector: 'app-fab',
  templateUrl: './fab.component.html',
  styleUrls: ['./fab.component.scss']
})
export class FabComponent implements OnInit {

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit(): void {
  }

  openPopup() {
    this.firebaseService.openPopup(ContactPopupComponent);
  }

}
