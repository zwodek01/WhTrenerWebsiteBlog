import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-popup',
  templateUrl: './register-popup.component.html',
  styleUrls: ['../popup.scss']
})
export class RegisterPopupComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  closeRegistePopup(): void {
    this.router.navigate(['/']);
  }
}
