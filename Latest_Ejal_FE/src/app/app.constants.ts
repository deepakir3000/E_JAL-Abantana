import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AppConstants {

    // BASE URL FOR THE HTTP SERVICES
    public static get BASE_API_URL(): string {
        if (environment.production && environment.name !== 'DEVSTAG') {
            // PRODUCTION SERVER PATH
            const SERVER_LOC = (window.location.href).split('#')[0].split('/')[2]; // JSON.parse(sessionStorage.getItem('apiServerLocationDtls'));

            // return 'http://localhost:3001/dowr/';
            return 'https://waterallocation.odisha.gov.in/dowr/';
        } else {
            // DEVELOPMENT SERVER PATH

            // return 'http://localhost:3001/dowr/';
            return 'https://waterallocation.odisha.gov.in/dowr/';
        }
    }

    // For Financial year limit
    public static VIEW_FIN_YR_LIMIT = 3;
    public static SET_FIN_YR_LIMIT = 2;

    // AUTHORIZATION HEADER FOR GETTTING ACCESS TOKEN //
    public static get LOGIN_AUTHORIZATION_HEADER(): string { return 'Basic bXktdHJ1c3RlZC1jbGllbnQ6c2VjcmV0'; }

    public static get AUTHORIZATION_HEADER(): string { return sessionStorage.getItem('access_token'); }
    // USED TO GET MENU TYPE //
    public static get MENU_TYPE(): object {
        return {
            VMENU: 101,
            HMENU: 102,
            CMENU: 103
        };
    }
    // STORE ACESS TOKEN COMPLETE DETAILS
    public static ACCESS_DETAILS: object = {};

    // DASHBOARD VALUE
    public static DASHBOARD_DRIVE = 'ALL';

    // SESSION TIMOUT VALUE IN SECONDS
    public static SESSION_CHECKER = 10;
    public static SESSION_PRE_CHECK = 300;

    public static ITEM_ENCODE_ITERATOR = 1;
    public static DECODE_ITERATOR = 1;
    public static DECODE_KEY = '0eef9a9d9ccb8ea0fbb21e03ad2c6609e1b98de53c0bcd084c23c0ca8376f6c7'; // 'MY SESSION STORAGE ENCODING TEST';

    // PASSWORD ENCODING TIME
    public static PASSWORD_ENCODING_TIMES = 2;

    // RELOAD MESSAGE
    public static RELOAD_MESS = 'You are using an older version of project. So, click on okay to get new version of it';

    // LOOKUP MENU
    public static LOOKUP_MENU_MAX_LENGTH = 5;
}
