import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-popup',
  templateUrl: './verify-popup.component.html',
  styleUrls: ['../popup.scss']
})
export class VerifyPopupComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  closeVerifyPopup(): void {
    this.router.navigate(['/']);
  }
}
