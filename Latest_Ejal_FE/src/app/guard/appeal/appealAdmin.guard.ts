import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

/**
 * Restricts a route to the dedicated e-appeal Admin account (role_id 4).
 *
 * Run this ALONGSIDE AppealAuthGuard, not instead of it — AppealAuthGuard
 * confirms there's a valid e-appeal session at all; this guard narrows
 * that down to Admin only. If someone is logged in as dowd/aawd/rawd
 * (1/2/3) and hits an admin route, they're bounced to their own dashboard
 * rather than back to the login page, since they ARE authenticated —
 * just not authorized for this route.
 */
@Injectable({
  providedIn: 'root'
})
export class AppealAdminGuard implements CanActivate, CanActivateChild {

  private readonly ADMIN_ROLE_ID = '4';

  constructor(private router: Router) {}

  canActivate(): boolean {
    return this.checkAdmin();
  }

  canActivateChild(): boolean {
    return this.checkAdmin();
  }

  private checkAdmin(): boolean {
    const roleId = localStorage.getItem('role_id');

    if (roleId === this.ADMIN_ROLE_ID) {
      return true;
    }

    // Authenticated e-appeal user, just not an Admin — send them to their own dashboard
    this.router.navigate(['/e-appeal/dashboard']);
    return false;
  }
}