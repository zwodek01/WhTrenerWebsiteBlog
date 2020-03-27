import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-popup',
  templateUrl: './forgot-popup.component.html',
  styleUrls: ['../popup.scss']
})
export class ForgotPopupComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  closeForgotPopup() {
    this.router.navigate(['/']);
  }
}
