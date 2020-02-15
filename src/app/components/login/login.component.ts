import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
declare var UIkit: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private afAuth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.afAuth.login(this.loginForm.value)
      .then(() => {
        UIkit.notification({ message: '<span uk-icon=\'icon: check\'></span> Zalogowano', status: 'success' })
        this.router.navigate([''])
      })
      .catch(error => {
        switch (error.code) {
          case 'auth/user-not-found': {
            return UIkit.notification({ message: '<span uk-icon=\'icon: close\'></span> Nie odnaleziono takiego użytkownika', status: 'danger' });
          }
          case 'auth/invalid-email': {
            return UIkit.notification({ message: '<span uk-icon=\'icon: close\'></span> Nieprawidłowy adres e-mail', status: 'danger' });
          }
          case 'auth/wrong-password': {
            return UIkit.notification({ message: '<span uk-icon=\'icon: close\'></span> Nieprawidłowe hasło', status: 'danger' });
          }
          default: {
            return UIkit.notification({ message: '<span uk-icon=\'icon: close\'></span> Wystąpił błąd. Spróbuj jeszcze raz.', status: 'danger' });
          }
        }
      })
  }
}
