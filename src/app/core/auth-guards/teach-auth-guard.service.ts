import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../common/auth.service';

@Injectable()
export class TeachAuthGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthService) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        let user = this.authService.getCurrentUser();

        if (!user) this.router.navigate(['/login']);
        else if (this.authService.isTeach()) return true;
        else this.router.navigate(['/no-access']);

        return false;
    }
}
