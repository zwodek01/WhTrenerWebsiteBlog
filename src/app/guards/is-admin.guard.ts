import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IsAdminGuard implements CanActivate {

  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  adminId: string = 'RH9lFZealkU5UPf7R1h81OvgZqG2';

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.afAuth.authState.pipe(map(user => {
      if (user !== null) {
        if (user.uid === this.adminId) {
          return true;
        } else {
          this.router.navigate(['/logowanie'])
          return false
        }
      }
      this.router.navigate(['/logowanie'])
      return false;
    }
    )
    )
  }

}
