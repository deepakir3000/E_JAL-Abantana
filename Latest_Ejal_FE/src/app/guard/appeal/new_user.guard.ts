import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

@Injectable()
export class NewUserGuard implements CanActivate {

  constructor(
    private router: Router
  ) {}

  canActivate(): boolean {

    const isNewUser =
      localStorage.getItem('is_new_user') === 'true';

    if (isNewUser) {
      this.router.navigate(['/e-appeal/appeal-profile']);
      return false;
    }

    return true;
  }
}