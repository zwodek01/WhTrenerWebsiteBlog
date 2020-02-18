import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
declare var UIkit: any;

@Injectable({
  providedIn: 'root'
})
export class IsloggedGuard implements CanActivate {

  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.afAuth.authState.pipe(map(user => {
      if (user === null) {
        return true
      } else {
        this.router.navigate(['/'])
        UIkit.notification({ message: 'Jesteś już zalogowany', status: 'primary' })
        return false
      }
    }));
  }

}
