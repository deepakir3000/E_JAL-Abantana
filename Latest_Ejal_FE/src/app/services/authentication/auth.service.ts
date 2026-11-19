import { Injectable } from '@angular/core';
import { HttpClientService } from '../httpClient/http-client.service';
import { Observable } from 'rxjs/internal/Observable';
import { StorageService } from '../storage/storage.service';
import { AppConstants } from '@app/app.constants';
import { EncryptionService } from '../encryption/encryption.service';
import { MenuModel } from '@app/menu/menu-model';
import { of } from 'rxjs/internal/observable/of';
import { ServerMenuModel } from '@app/menu/server-menu';
import { map } from 'rxjs/operators';
import { TEST_MENU } from '@app/menu/menu.data';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private httpClient: HttpClientService,
        private appStorage: StorageService,
        private encryptService: EncryptionService,
        private router: Router,
        private authService: AuthService,
        private location: Location
    ) { }

    public isSessionAvail(): Observable<boolean> {
        if (this.appStorage.getSessionAttribute('isLoggedIn') === true) {
            console.log('--------- Checking After Login --------- ');
            AppConstants.ACCESS_DETAILS = this.appStorage.getSessionAttribute('accessTokenDetails');
            return of(true);
        } else {
            return of(false);
        }
    }

    public login(uid, upass, salt) {
        let DATA = null;
        if (this.appStorage.getSessionAttribute('tokenSaltValue')) {
            DATA = JSON.parse(this.encryptService.encSaltedPassword(upass, AppConstants.PASSWORD_ENCODING_TIMES, salt));
        }
        const data: object = {
            'grant_type': 'custom',
            'username': uid,
            'password': DATA,
            // 'salt': DATA['salt']
        };
        return this.httpClient.postAuth(AppConstants.BASE_API_URL + 'admin/logintoken', data);
    }

    public logout() {
        this.removeStorageDetails();
        this.router.navigateByUrl('/login');
    }

    public getAuthenticationToken() {
        return this.httpClient.getAuthResponse(AppConstants.BASE_API_URL + 'admin/logintoken');
    }
    public goBack() {
        this.location.back();
    }

    /* revokeAuthToken(data: object) {
        return this.httpClient.postAuth(AppConstants.BASE_API_URL + 'admin/refreshtoken', data).map(result => {
            // console.log('coming under success Response');
            this.appStorage.setSessionAttribute('accessTokenDetails', result);
            AppConstants.ACCESS_DETAILS = this.appStorage.getSessionAttribute('accessTokenDetails');
            this.sessionChecker.resetSession();
            this.sessionChecker.syncSession(AppConstants.ACCESS_DETAILS['expires_in']);
            return Observable.of<boolean>(true);
        }, errorRep => {
            // console.log('coming under Error Response');
            return Observable.of<boolean>(false);
        }).catch(errorResponse => {
            // console.log('coming under Error Response');
            return Observable.of<boolean>(false);
        });
    } */

    public getAuthMenus(): any {
        if (this.isSessionAvail()) {
            return this.httpClient.getNoAuth(AppConstants.BASE_API_URL + 'sysadmin/getUIResourceForUser').pipe(map(successResponse => {
                console.log(successResponse);
                // this.setModules(successResponse['moduleInfo'], successResponse['primaryModuleId']);
                return this.setMenusInFormat(successResponse['resourceInfo']);
            }));
        }
    }

    public getAuthMenusModuleWise(data: number) {
        if (this.isSessionAvail()) {
            return this.httpClient.getRPNoAuth(AppConstants.BASE_API_URL + 'sysadmin/getUIResourceofModule', { moduleId: data }).pipe(map(successResponse => {
                console.log(successResponse);
                // this.setMenuType(data);
                return this.setMenusInFormat(successResponse['resourceInfo']);
            }));
        }
    }

    private setMenusInFormat(menuResponse: ServerMenuModel[]) {
        if (menuResponse.length !== 0) {
            const orgMenu: MenuModel[] = menuResponse.map(item => {
                const menu: MenuModel = {
                    menuId: item.smId,
                    parentMenuId: (item.parentSmId !== null ? item.parentSmId : 0),
                    isSubMenu: item.hasSubMenu,
                    iconType: (item.iconType !== null ? item.iconType : 'ICON'),
                    icon: (item.iconType !== 'IMAGE' ? (item.icon !== '' ? 'fa-' + item.icon : 'fa-user-circle-o') : item.icon),
                    title: item.resourceName,
                    routerLink: (item.routerLink !== '' ? item.routerLink : null),
                    resId: (item.resourceId !== null ? item.resourceId : 0),
                    menuOrder: (item.parentSmId === null && item.smOrder !== null ? item.smOrder : 0),
                    subMenuOrder: (item.parentSmId !== null && item.resourceOrder !== null ? item.resourceOrder : 0),
                    isExtraMenu: item.extraMenu,
                    isItLookUp: false,
                    lookUpMenuName: null,
                    resGrId: item.rGId,
                    isItInTopNav: false,
                    isReadPerAvail: false,
                    isWritePerAvail: false
                };
                return menu;
            });
            console.log(orgMenu);
            TEST_MENU.forEach(item => {
                orgMenu.push(item);
            });
            console.log('FInal Menu', orgMenu);
            // this.appStorage.setSessionAttribute('defaultLink', this.getDefaultUrlToRedirect(orgMenu));
            return orgMenu;
        } else {
            return [];
        }
    }

    /* private setModules(modules: ModuleAvail[], primeModuleId: number) {
        console.log(modules);
        if (modules.length !== 0) {
            this.appStorage.setSessionAttribute('modules', modules);
            this.appStorage.setSessionAttribute('currentModule', primeModuleId);
            this.setMenuType(primeModuleId);
            return true;
        } else {
            return false;
        }
    } */

    /* private setMenuType(moduleId: number) {
        const MODULES: ModuleAvail[] = this.appStorage.getSessionAttribute('modules');
        if (MODULES.length !== 0) {
            const PRES_MODULE = MODULES.find(ele => ele.moduleId === moduleId);
            if (typeof PRES_MODULE !== 'undefined') {
                const MENU_TYPE: string = PRES_MODULE.menuType.toUpperCase().trim();
                this.appStorage.setSessionAttribute('menuType', MENU_TYPE);
                this.settings.theme.menuType = MENU_TYPE;
            }
        }
    } */

    /* private getDefaultUrlToRedirect(data: MenuModel[]) {
        const ORDERED_MAIN_MENU = data.filter(ele => ele.parentId === 0).sort((R1, R2) => {
            return R1.menuOrder - R2.menuOrder;
        });
        const F_MENU = ORDERED_MAIN_MENU[0];
        console.log('--------- Main Menu Details ---------');
        if (F_MENU.hasSubMenu) {
            const ORDERED_SUB_MENU = data.filter(ele => ele.parentId === F_MENU.id).sort((R1, R2) => {
                return R1.subMenuOrder - R2.subMenuOrder;
            });
            const F_SUB_F_MENU = ORDERED_SUB_MENU[0];
            return F_SUB_F_MENU.routerLink;
        } else {
            return F_MENU.routerLink;
        }
    } */


    /* getMenusList() {
        const PATH = this.location.path();
        const TOTAL_MENUS: Menu[] = this.appStorage.getSessionAttribute('menus');
        const PARENT_ID = TOTAL_MENUS.find(ele => ele.routerLink === PATH).id;
        const SUB_MENU_LIST = TOTAL_MENUS.filter(ele => ele.parentId === PARENT_ID).sort((M1, M2) => {
            return M1.subMenuOrder - M2.subMenuOrder;
        });
        console.log('Sub Menus List: ', SUB_MENU_LIST);
        return SUB_MENU_LIST;
    } */

    /* public getAssignedSocietyDetails() {
        const PACS_TYPES: string[] = ['PACS', 'CREDIT' ];
        this.appStorage.setSessionAttribute('assignedInspTypes', PACS_TYPES);
    } */

    // IS USER ALLOWED TO GIVE FEED BACK
    public isUserAllowedForFeedback() {
        return this.httpClient.getWithoutRGrp(AppConstants.BASE_API_URL + 'sysadmin/isUserAllowedForFeedback');
    }

    // USED FOR SAVING FEEDBACK FORM
    public sendFeedbackDetails(data: object) {
        return this.httpClient.postWithoutRGrp(AppConstants.BASE_API_URL + 'sysadmin/saveFeedbackDtls', data);
    }

    /* async logout() {
        if (environment.server === 'PRODUCTION') {
            if (AppConstants.ACCESS_DETAILS['access_token'] !== undefined) {
                return await this.serverSessionOut(AppConstants.ACCESS_DETAILS['access_token']).toPromise();
            } else {
                return true;
            }
        } else {
            this.removeStorageDetails();
            return true;
        }
    } */

    public removeStorageDetails() {
        this.appStorage.removeSessionAttribute('isLoggedIn');
        this.appStorage.removeSessionAttribute('accessTokenDetails');
        this.appStorage.removeSessionAttribute('menus');
        this.appStorage.removeSessionAttribute('menuType');
        this.appStorage.removeSessionAttribute('modules');
        this.appStorage.removeSessionAttribute('currentModule');
        this.appStorage.removeSessionAttribute('defaultLink');
        // Inspection Planning menus
        this.appStorage.removeSessionAttribute('planningMenus');
        // DCP Search
        this.appStorage.removeSessionAttribute('searchData');
        this.appStorage.removeSessionAttribute('prevMenuPathForRd');
        // Template Authentication
        this.appStorage.removeSessionAttribute('assignedSocietyDetails');
        this.appStorage.removeSessionAttribute('assignedInspTypes');
        this.appStorage.removeSessionAttribute('templateAllotedStatus');
        this.appStorage.removeSessionAttribute('currentSheetNo');
        this.appStorage.removeSessionAttribute('assignedPetitionerPetSlNo');
        this.appStorage.removeSessionAttribute('assignedPetitionerDetails');
        this.appStorage.removeSessionAttribute('role');

        this.appStorage.removeStorageDetails();
    }

    /* private serverSessionOut(tokenValue: string) {
        return this.httpClient.postWithoutRGrp(AppConstants.BASE_API_URL + 'revoke', null).map(() => {
            this.removeStorageDetails();
            return Observable.of<boolean>(true);
        }).catch(errorResponse => {
            this.removeStorageDetails();
            return Observable.of<boolean>(false);
        });
    } */
}
