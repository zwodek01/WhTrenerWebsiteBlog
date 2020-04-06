import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseService } from '../services/firebase.service';
import { VerifyPopupComponent } from '../components/popups/verify-popup/verify-popup.component';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.firebaseService.authState$.pipe(
      map(user => {
        if (user === null) {
          this.router.navigate(['/logowanie']);
        } else if (user.emailVerified === false) {
          this.firebaseService.openPopup(VerifyPopupComponent);
        } else {
          return true;
        }
      })
    );
  }
}
