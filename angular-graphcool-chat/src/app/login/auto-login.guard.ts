import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable()
export class AutoLoginGuard implements CanActivate {
    
    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ): Observable<boolean> {
        /*console.log('AutoLogin Guard');
        
        return this.authService.isAuthenticated
        .pipe(
            tap(is => (is) ? this.router.navigate(['/dashborad']) : null),
            map(is => !is)
        );*/
        return of(true);
    }
}