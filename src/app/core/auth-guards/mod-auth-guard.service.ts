import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { AuthService } from '../common/auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class ModAuthGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthService) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        let user = this.authService.currentUser;

        if (!user) this.router.navigate(['/login']);
        else if (user.teach) return true;
        else this.router.navigate(['/no-access']);

        return false;
    }
}
