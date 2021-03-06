import { Injectable, NgZone } from '@angular/core';
import { auth, User } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { RegisterPopupComponent } from '../components/popups/register-popup/register-popup.component';
import { VerifyPopupComponent } from '../components/popups/verify-popup/verify-popup.component';
import { ForgotPopupComponent } from '../components/popups/forgot-popup/forgot-popup.component';
import { first, map } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  userData: any;
  admin;
  authState$: Observable<User | null> = this.afAuth.authState;
  authStateStatus;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    private router: Router,
    private notificationService: NotificationService,
    private dialog: MatDialog,
    private ngZone: NgZone
  ) {
    this.authStateStatus = this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        sessionStorage.setItem(
          'userDetails',
          JSON.stringify({
            uid: this.userData.uid,
          })
        );
      } else {
        sessionStorage.setItem('userDetails', null);
      }
    });
    this.isAdmin().then((user) => {
      this.admin = user['admin'];
    });
  }

  async isAdmin() {
    const res = await this.afAuth.authState.pipe(first()).toPromise();
    if (res === null) {
      return false;
    } else {
      return this.afs
        .collection('users')
        .doc(res.uid)
        .valueChanges()
        .pipe(first())
        .toPromise();
    }
  }

  loginWithEmailAndPassword(email: string, password: string) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        this.setUserData(res.user, res.user.displayName);
        if (res.user.emailVerified === false) {
          this.openPopup(VerifyPopupComponent);
        } else {
          this.notificationService.notifycation('Zalogowano ✔', 'done');
          setTimeout(() => {
            this.router.navigate(['/panel']);
          }, 300);
        }
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/user-not-found':
            this.notificationService.notifycation(
              'Nieprawidłowy e-mail ❌',
              'error'
            );
            break;
          case 'auth/wrong-password':
            this.notificationService.notifycation(
              'Nieprawidłowe hasło ❌',
              'error'
            );
            break;
          default:
            this.notificationService.notifycation(
              'Błąd z logowaniem. Spróbuj jeszcze raz ❌',
              'error'
            );
            console.log(error);
        }
      });
  }

  googleAuth() {
    return this.authLogin(new auth.GoogleAuthProvider());
  }

  authLogin(provider) {
    return this.afAuth.auth
      .signInWithPopup(provider)
      .then((res) => {
        this.setUserData(res.user, res.user.displayName);
        this.notificationService.notifycation('Zalogowano ✔', 'done');
        setTimeout(() => {
          this.ngZone.run(() => {
            this.router.navigate(['/panel']);
          });
        }, 1000);
      })
      .catch((error) => {
        this.notificationService.notifycation(
          'Błąd z logowaniem. Spróbuj jeszcze raz ❌',
          'error'
        );
        console.log(error);
      });
  }

  register(email, password, name) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        this.sendVerificationMail();
        this.setUserData(res.user, name);
        firebase.auth().currentUser.updateProfile({
          displayName: name,
          photoURL:
            'https://firebasestorage.googleapis.com/v0/b/test-pelicar.appspot.com/o/avatar.png?alt=media&token=c6420afb-50cf-4f30-9c95-99d86bddc20b',
        });
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/invalid-email':
            this.notificationService.notifycation(
              'Nieprawidłowy e-mail ❌',
              'error'
            );
            break;
          case 'auth/email-already-in-use':
            this.notificationService.notifycation(
              'Konto już istnieje ❌',
              'error'
            );
            break;
          default:
            this.notificationService.notifycation(
              'Błąd z logowaniem. Spróbuj jeszcze raz ❌',
              'error'
            );
            console.log(error);
        }
      });
  }

  sendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification().then(() => {
      this.openPopup(RegisterPopupComponent);
    });
  }

  forgotPassword(passwordResetEmail: string) {
    return this.afAuth.auth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        this.openPopup(ForgotPopupComponent);
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/invalid-email':
            this.notificationService.notifycation(
              'Nieprawidłowy e-mail. Popraw go ❌',
              'error'
            );
            break;
          case 'auth/user-not-found':
            this.notificationService.notifycation(
              'Nie ma takiego konta ❌',
              'error'
            );
            break;
          default:
            this.notificationService.notifycation(
              'Błąd! Spróbuj jeszcze raz ❌',
              'error'
            );
            console.log(error);
        }
      });
  }

  deleteUser(uid) {
    this.afAuth.auth.currentUser
      .delete()
      .then(() => {
        this.afs.collection('users').doc(uid).delete();
        this.logout('Konto usunięto poprawnie ✔');
      })
      .catch((error) => {
        this.notificationService.notifycation(
          'Błąd! Spróbuj jeszcze raz ❌',
          'error'
        );
        console.log(error);
      });
  }

  changeNameUser(name: string, uid: string) {
    this.afAuth.auth.currentUser
      .updateProfile({ displayName: name })
      .then(() => {
        this.notificationService.notifycation('Nazwa zmieniona ✔', 'done');
        this.afs.collection('users').doc(uid).update({ displayName: name });
        this.dialog.closeAll();
      })
      .catch((error) => {
        this.notificationService.notifycation(
          'Błąd! Spróbuj jeszcze raz ❌',
          'error'
        );
        console.log(error);
      });
  }

  changePasswordUser(password: string) {
    this.afAuth.auth.currentUser.updatePassword(password).then(() => {
      this.notificationService.notifycation(
        'Hasło zmienione poprawnie ✔',
        'done'
      );
      this.dialog.closeAll();
    });
  }

  setUserData(user, name) {
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: name,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      premium: false,
    };
    return this.afs
      .collection('users')
      .doc(user.uid)
      .set(userData, { merge: true });
  }

  logout(text: string) {
    return this.afAuth.auth
      .signOut()
      .then(() => {
        this.notificationService.notifycation(text, 'done');
        this.router.navigate(['/']);
      })
      .catch(() => {
        this.notificationService.notifycation(
          'Błąd! Spróbuj jeszcze raz ❌',
          'error'
        );
      });
  }

  openPopup(component) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.maxWidth = 800;
    dialogConfig.autoFocus = false;
    this.dialog.open(component, dialogConfig);
  }

  getUserDetails(uid: string) {
    return this.afs.collection('users').doc(uid).valueChanges();
  }

  addQuestion(uid: string, id: string, data: object) {
    return this.afs
      .collection('users')
      .doc(uid)
      .collection('questions')
      .doc(id)
      .set(data)
      .then(() => {
        this.notificationService.notifycation(
          'Pytanie dodano poprawnie ✔',
          'done'
        );
      })
      .catch(() => {
        this.notificationService.notifycation(
          'Błąd! Spróbuj jeszcze raz ❌',
          'error'
        );
      });
  }

  updateAnswer(uid: string, id: string, data: string, add: boolean) {
    return this.afs
      .collection('users')
      .doc(uid)
      .collection('questions')
      .doc(id)
      .update({ answer: data })
      .then(() => {
        this.notificationService.notifycation(
          add
            ? 'Odpowiedź dodano poprawnie ✔'
            : 'Odpowiedź usunięto poprawnie ✔',
          'done'
        );
      })
      .catch(() => {
        this.notificationService.notifycation(
          'Błąd! Spróbuj jeszcze raz ❌',
          'error'
        );
      });
  }

  deleteQuestion(uid: string, id: string) {
    this.afs
      .collection('users')
      .doc(uid)
      .collection('questions')
      .doc(id)
      .delete()
      .then(() => {
        this.notificationService.notifycation(
          'Pytanie usunięto poprawnie ✔',
          'done'
        );
      })
      .catch(() => {
        this.notificationService.notifycation(
          'Błąd! Spróbuj jeszcze raz ❌',
          'error'
        );
      });
  }

  ngOnDestroy() {
    this.authStateStatus.unsubscribe();
  }
}
