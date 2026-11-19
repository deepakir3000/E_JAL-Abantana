import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '@app/services/authentication/auth.service';
import { StorageService } from '@app/services/storage/storage.service';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { MenuModel } from '@app/menu/menu-model';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard {
    constructor(
        private router: Router,
        private authService: AuthService,
        private appStorage: StorageService
    ) { }

    // THIS USED TO CHECK IF PARENT IS VALID TO VIEW OR NOT
    canActivate(currentRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        console.log('--------CanActive--------');
        this.authService.isSessionAvail().subscribe(successResponse => {
            if (successResponse === true) {
                return true;
            }
            this.router.navigateByUrl('/login');
            return false;
        }, errorResponse => {
            return false;
        });
        return of(false);
    }

    // THIS USED TO CHECK EVERY CHILD IS VALID TO VIEW OR NOT
    canActivateChild(currentRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        console.log('--------Authentication Guard--------');
        // console.log(localStorage.getItem('access_token'));
        // console.log(currentRoute, state);
        if(sessionStorage.getItem('access_token') !== null){
            return of(true);
        }else{
            // this.router.navigateByUrl('/login');

            return of(false);
            // this.router.navigateByUrl('/login');
        }
        /* this.authService.isSessionAvail().subscribe(successResponse => {
            console.log('Is session available', successResponse);
            if (successResponse === true) {
                console.log('Yes available');
                return true;
            }
            this.router.navigateByUrl('/login');
            console.log('No not available');
            return false;
        }, errorResponse => {
            console.log('No not available');
            return false;
        }); */
        // this.isAllowedToAccess(state)
    }

    /* private isAllowedToAccess(state: RouterStateSnapshot): boolean {
        const REDIRECTING_URL = state.url; let isAllowed = false;
        console.log('redirecting url', REDIRECTING_URL, REDIRECTING_URL.split('/').slice(0, 2));

        let menuList: MenuModel[] = this.appStorage.getSessionAttribute('menus');
        menuList = (menuList !== null) ? menuList : [];
        let pres_url_arr = REDIRECTING_URL.split('/');
        while (pres_url_arr.length > 2) {
            const INDEX = menuList.findIndex(ele => ele.routerLink === pres_url_arr.join('/'));
            if (INDEX !== -1) {
                isAllowed = true;
                break;
            } else {
                isAllowed = false;
                pres_url_arr.pop();
            }
        }
        // checking either it's present in sidebar menus
        if (!isAllowed) {
            pres_url_arr = REDIRECTING_URL.split('/');
            while (pres_url_arr.length > 1) {
                const INDEX = COMMON_MENUS.findIndex(ele => ele.routerLink === pres_url_arr.join('/'));
                if (INDEX !== -1) {
                    isAllowed = true;
                    break;
                } else {
                    isAllowed = false;
                    pres_url_arr.pop();
                }
            }
            // checking either it's present in extra menus
            if (!isAllowed) {
                console.log('Not allowed to access');
                this.router.navigateByUrl('/error/401');
            }
        }

        if (isAllowed) {
            console.log('Allowed to access');
        }

        return isAllowed;
    } */
}
