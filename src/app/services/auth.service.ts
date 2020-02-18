import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from 'firebase';
import { Observable, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
declare var UIkit: any;

export interface Credentials {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly authState: Observable<User | null> = this.afAuth.authState;

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore, private router: Router) {
  }

  getUser(): User | null {
    return this.afAuth.auth.currentUser
  }

  async login({ email, password }: Credentials) {
    await this.afAuth.auth.setPersistence('session');
    return this.afAuth.auth.signInWithEmailAndPassword(email, password).then(() => {
      UIkit.notification({ message: 'Zalogowano', status: 'success' })
      this.router.navigate([''])
    })
      .catch(error => {
        switch (error.code) {
          case 'auth/user-not-found': {
            return UIkit.notification({ message: 'Nie odnaleziono takiego użytkownika', status: 'danger' });
          }
          case 'auth/invalid-email': {
            return UIkit.notification({ message: 'Nieprawidłowy adres e-mail', status: 'danger' });
          }
          case 'auth/wrong-password': {
            return UIkit.notification({ message: 'Nieprawidłowe hasło', status: 'danger' });
          }
          default: {
            return UIkit.notification({ message: 'Wystąpił błąd. Spróbuj jeszcze raz.', status: 'danger' });
          }
        }
      })
  }

  async register({ email, password }: Credentials) {
    const res = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
    const user = {
      email: res.user.email,
      uid: res.user.uid,
      isAdmin: false
    };
    this.db.collection('users').doc(res.user.uid).set(user)
  }

  async logout() {
    await this.afAuth.auth.signOut().then(() => {
      UIkit.notification({ message: 'Wylogowano', status: 'success' })
      this.router.navigate(['/'])
    })
  }
}
