import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { RegisterComponent } from 'src/app/layout/register/register.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-popup',
  templateUrl: './register-popup.component.html',
  styleUrls: ['../popup.scss']
})
export class RegisterPopupComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<RegisterComponent>,
    private router: Router
  ) {}

  ngOnInit(): void {}

  closeRegistePopup(): void {
    this.dialogRef.close();
    this.router.navigate(['/']);
  }
}
