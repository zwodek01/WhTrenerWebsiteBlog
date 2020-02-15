import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from 'firebase';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

export interface Credentials {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>;

  readonly authState: Observable<User | null> = this.afAuth.authState;

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.db.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    )
  }

  getUser(): User | null {
    return this.afAuth.auth.currentUser
  }

  getCurrentUser() {
    return this.user$
  }

  async login({ email, password }: Credentials) {
    await this.afAuth.auth.setPersistence('session');
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  async register({ email, password }: Credentials) {
    const res = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
    const user = {
      email: res.user.email,
      uid: res.user.uid,
      isAdmin: false
    };
    this.db.collection('users').doc(res.user.email).set(user)
  }

  async logout() {
    await this.afAuth.auth.signOut();
  }
}
