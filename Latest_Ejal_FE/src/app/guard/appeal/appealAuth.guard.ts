import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

/**
 * Guards all e-appeal routes (dashboard, profile, admin) — confirms
 * the person is logged into the e-appeal sub-app at all.
 *
 * Intentionally separate from the main app's AuthGuard: the e-appeal
 * sub-app has its own JWT, its own eappeal_users table, and its own
 * login flow (AppealLoginComponent). Reusing the main AuthGuard would
 * either wrongly block real e-appeal users or let a stale main-portal
 * session through to routes whose APIs still 401 via authenticateAppeal.
 *
 * Role IDs: 1=dowd, 2=aawd, 3=rawd, 4=Admin.
 * This guard only checks "is there a valid e-appeal session" — it does
 * NOT restrict by role. Use AppealAdminGuard on top of this for routes
 * that should be Admin-only (e.g. /e-appeal-admin).
 */
@Injectable({
  providedIn: 'root'
})
export class AppealAuthGuard implements CanActivate, CanActivateChild {

  private readonly VALID_ROLE_IDS = ['1', '2', '3', '4'];

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkAuth(state.url);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkAuth(state.url);
  }

  private checkAuth(attemptedUrl: string): boolean {
    const token = localStorage.getItem('access_token');
    const roleId = localStorage.getItem('role_id');

    if (token && roleId && this.VALID_ROLE_IDS.includes(roleId)) {
      return true;
    }

    this.clearAppealSession();

    this.router.navigate(['/appeal-login'], {
      queryParams: { returnUrl: attemptedUrl }
    });
    return false;
  }

  private clearAppealSession(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('role_id');
    localStorage.removeItem('role_name');
    localStorage.removeItem('user_Name');
    localStorage.removeItem('hrms_id');
    localStorage.removeItem('id');
    localStorage.removeItem('is_new_user');
  }
}