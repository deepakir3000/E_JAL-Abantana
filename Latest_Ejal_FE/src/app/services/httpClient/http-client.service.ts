import { HttpClient, HttpHeaders, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/internal/Observable';

import { AppConstants } from '@app/app.constants';
import { StorageService } from '@app/services/storage/storage.service';
import { MenuModel } from '@app/menu/menu-model';
import { catchError } from 'rxjs/operators';
import { ClientErrorHandlerService } from '../ErrorHandler/client-error-handler.service';


@Injectable({
    providedIn: 'root'
})
export class HttpClientService {

    constructor(
        private http: HttpClient,
        private appStorage: StorageService,
        private location: Location,
        private clientErrorHandler: ClientErrorHandlerService
    ) { }

    // USED FOR METHOD TYPE GET & CONTENT TYPE IS JSON
    getWithoutRGrp(url: string, opt?: object): Observable<any> {
        const accessToken = AppConstants.AUTHORIZATION_HEADER;
        const HEADERS = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', accessToken);
        const options = opt ? opt : {
            headers: HEADERS,
            params: {}
        };
        // console.log(options);
        return this.http.get(url, options).pipe(catchError(this.clientErrorHandler.handleError));
    }

    // USED FOR METHOD TYPE POST & CONTENT TYPE IS JSON
    postWithoutRGrp(url: string, data: object, opt?: object): Observable<any> {
        const accessToken = AppConstants.AUTHORIZATION_HEADER;
        const HEADERS = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', accessToken);
        const options = opt ? opt : {
            headers: HEADERS,
            params: {}
        };
        return this.http.post(url, data, options).pipe(catchError(this.clientErrorHandler.handleError));
    }

    // FOR GET AUTHORIZATION
    getAuth(url: string, opt?: object): Observable<any> {
        const HEADERS = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', AppConstants.AUTHORIZATION_HEADER);
        const options = opt ? opt : {
            headers: HEADERS
        };
        return this.http.get(url, options).pipe(catchError(this.clientErrorHandler.handleError));
    }

    // FOR GET AUTHORIZATION
    getAuthResponse(url: string, opt?: object): Observable<any> {
        const HEADERS = new HttpHeaders()
            .set('Content-Type', 'application/x-www-form-urlencoded');
        // .set('Origin', (window.location.href).split('#')[0].split('/')[2]);
        // .set('Authorization', AppConstants.AUTHORIZATION_HEADER);
        const options = opt ? opt : {
            headers: HEADERS,
            // observe: 'response',
            withCredentials: true
        };
        return this.http.get(url, options).pipe(catchError(this.clientErrorHandler.handleError));
    }

    // SEND AUTHORIZATION DETAILS TO GET ACCESS
    postAuth(url: string, data: object, opt?: object): Observable<any> {
        
        const accessToken = AppConstants.AUTHORIZATION_HEADER;
        const HEADERS = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('x-auth', accessToken)
            .set('Cache-Control', 'private, no-cache, no-store, must-revalidate')
            .set('Pragma', 'no-cache')
            .set('Expires', '-1')
            .set('Access-Control-Allow-Credentials', 'true')
            .set('Access-Control-Allow-Methods', 'GET, POST')
            .set('Access-Control-Max-Age', '1800')
            .set('X-Frame-Options', 'SAMEORIGIN')
            .set('X-XSS-Protection', '1; mode=block');
        const options = opt ? opt : {
            headers: HEADERS,
            withCredentials: true
        };
        return this.http.post(url, data, options).pipe(catchError(this.clientErrorHandler.handleError));
    }
    // FOR AUTHENTICATION WITH OUT RGID
    getNoAuth(url: string, opt?: object): Observable<any> {
        const accessToken = AppConstants.AUTHORIZATION_HEADER;
        const HEADERS = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', accessToken);
        const options = opt ? opt : {
            headers: HEADERS,
            params: {}
        };
        // console.log(options);
        return this.http.get(url, options).pipe(catchError(this.clientErrorHandler.handleError));

    }
    // FOR AUTHENTICATION WITH OUT RGID
    getRPNoAuth(url: string, extraParams: object, opt?: object): Observable<any> {
        const accessToken = AppConstants.AUTHORIZATION_HEADER;
        const HEADERS = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', accessToken);
        const options = opt ? opt : {
            headers: HEADERS,
            params: {}
        };
        for (const param of Object.keys(extraParams)) {
            options['params'][param] = extraParams[param];
        }
        return this.http.get(url, options).pipe(catchError(this.clientErrorHandler.handleError));
    }

    // USED FOR METHOD TYPE GET & CONTENT TYPE IS JSON
    get(url: string, opt?: object): Observable<any> {
        // console.log('rGId', this.getRgId().toString());
        const accessToken = AppConstants.AUTHORIZATION_HEADER;
        // console.log(accessToken);
        const HEADERS = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('x-auth', accessToken)
            .set('Cache-Control', 'private, no-cache, no-store, must-revalidate')
            .set('Pragma', 'no-cache')
            .set('Expires', '-1')
            .set('Access-Control-Allow-Credentials', 'true')
            .set('Access-Control-Allow-Methods', 'GET, POST')
            .set('Access-Control-Max-Age', '1800')
            .set('X-Frame-Options', 'SAMEORIGIN')
            .set('X-XSS-Protection', '1; mode=block');
            // .set('rGId', this.getRgId().toString());
        const options = opt ? opt : {
            headers: HEADERS,
            params: {}
        };
        // console.log(options);
        return this.http.get(url, options).pipe(catchError(this.clientErrorHandler.handleError));
    }
    // USED FOR METHOD TYPE GET & CONTENT TYPE IS JSON
    getByCN(url: string, opt?: object): Observable<any> {
        const data = this.appStorage.getSessionAttribute('assignedPetitionerDetails');
        // console.log('data.caseNo+++', data.caseNo);
        const accessToken = AppConstants.AUTHORIZATION_HEADER;
        const HEADERS = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', accessToken)
            .set('rGId', this.getRgId().toString())
            .set('caseno', data.caseNo);
        const options = opt ? opt : {
            headers: HEADERS,
            params: {}
        };

        return this.http.get(url, options).pipe(catchError(this.clientErrorHandler.handleError));
    }

    // USED FOR METHOD TYPE GET & CONTENT TYPE IS FORM DATA
    getFD(url: string, opt?: object): Observable<any> {
        const accessToken = AppConstants.AUTHORIZATION_HEADER;
        const HEADERS = new HttpHeaders()
            .delete('X-Powered-By')
            .set('Content-Type', 'application/json')
            .set('x-auth', accessToken)
            .set('Cache-Control', 'private, no-cache, no-store, must-revalidate')
            .set('Pragma', 'no-cache')
            .set('Expires', '-1')
            .set('Access-Control-Allow-Credentials', 'http://localhost:4200')
            .set('Access-Control-Allow-Methods', 'GET, POST')
            .set('Access-Control-Max-Age', '1800')
            .set('X-Frame-Options', 'SAMEORIGIN')
            .set('X-XSS-Protection', '1; mode=block');
            // .set('rGId', this.getRgId().toString());
        const options = opt ? opt : {
            headers: HEADERS,
            params: {}
        };
        return this.http.get(url, options).pipe(catchError(this.clientErrorHandler.handleError));
    }

    // USED FOR METHOD TYPE GET & REQUEST PARAMETERS
    getRP(url: string, extraParams: object, opt?: object): Observable<any> {
        const accessToken = AppConstants.AUTHORIZATION_HEADER;
        const HEADERS = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', accessToken)
            .set('Cache-Control', 'private, no-cache, no-store, must-revalidate')
            .set('Pragma', 'no-cache')
            .set('Expires', '-1')
            .set('Access-Control-Allow-Credentials', 'true')
            .set('Access-Control-Allow-Methods', 'GET, POST')
            .set('Access-Control-Max-Age', '1800')
            .set('X-Frame-Options', 'SAMEORIGIN')
            .set('X-XSS-Protection', '1; mode=block');
            // .set('rGId', this.getRgId().toString());
        const options = opt ? opt : {
            headers: HEADERS,
            params: {}
        };
        for (const param of Object.keys(extraParams)) {
            options['params'][param] = extraParams[param];
        }
        return this.http.get(url, options).pipe(catchError(this.clientErrorHandler.handleError));
    }

    // USED FOR METHOD TYPE POST & CONTENT TYPE IS JSON
    post(url: string, data: object, opt?: object): Observable<any> {
        const accessToken = AppConstants.AUTHORIZATION_HEADER;
        const HEADERS = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('x-auth', accessToken)
            .set('Cache-Control', 'private, no-cache, no-store, must-revalidate')
            .set('Pragma', 'no-cache')
            .set('Expires', '-1')
            .set('Access-Control-Allow-Credentials', 'true')
            .set('Access-Control-Allow-Methods', 'GET, POST')
            .set('Access-Control-Max-Age', '1800')
            .set('X-Frame-Options', 'SAMEORIGIN')
            .set('X-XSS-Protection', '1; mode=block');
            // .set('rGId', this.getRgId().toString());
        const options = opt ? opt : {
            headers: HEADERS,
            params: {}
        };
        return this.http.post(url, data, options).pipe(catchError(this.clientErrorHandler.handleError));
    }
    // USED FOR METHOD TYPE POST & HEADER TYPE IS JSON
    postRH(url: string, data: any, opt?: object): Observable<any> {
        // const accessToken = AppConstants.AUTHORIZATION_HEADER;
        const HEADERS = new HttpHeaders()
            // .set('Authorization', accessToken)
            .set('ackNo', data);
        const options = opt ? opt : {
            headers: HEADERS,
            params: {}
        };
        return this.http.post(url, null, options).pipe(catchError(this.clientErrorHandler.handleError));
    }

    // USED FOR METHOD TYPE POST & CONTENT TYPE IS FORM DATA
    postFD(url: string, data: FormData, opt?: object): Observable<any> {
        const accessToken = AppConstants.AUTHORIZATION_HEADER;
        const HEADERS = new HttpHeaders()
            .set('x-auth', accessToken)
            .set('Cache-Control', 'private, no-cache, no-store, must-revalidate')
            .set('Pragma', 'no-cache')
            .set('Expires', '-1')
            .set('Access-Control-Allow-Credentials', 'true')
            .set('Access-Control-Allow-Methods', 'GET, POST')
            .set('Access-Control-Max-Age', '1800')
            .set('X-Frame-Options', 'SAMEORIGIN')
            .set('X-XSS-Protection', '1; mode=block');
            // .set('rGId', this.getRgId().toString());
        const options = opt ? opt : {
            headers: HEADERS,
            params: {}
        };
        // console.log('data..................>>>>', data);
        return this.http.post(url, data, options).pipe(catchError(this.clientErrorHandler.handleError));
    }

    // USED FOR METHOD TYPE POST & REQUEST PARAMETER
    postRP(url: string, data: object, extraParams: object, opt?: object): Observable<any> {
        const accessToken = AppConstants.AUTHORIZATION_HEADER;
        const HEADERS = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', accessToken)
            .set('Cache-Control', 'private, no-cache, no-store, must-revalidate')
            .set('Pragma', 'no-cache')
            .set('Expires', '-1')
            .set('Access-Control-Allow-Credentials', 'true')
            .set('Access-Control-Allow-Methods', 'GET, POST')
            .set('Access-Control-Max-Age', '1800')
            .set('X-Frame-Options', 'SAMEORIGIN')
            .set('X-XSS-Protection', '1; mode=block');
            // .set('rGId', this.getRgId().toString());
        const options = opt ? opt : {
            headers: HEADERS,
            params: {}
        };
        for (const param of Object.keys(extraParams)) {
            options['params'][param] = extraParams[param];
        }
        return this.http.post(url, data, options).pipe(catchError(this.clientErrorHandler.handleError));
    }

    // USED FOR METHOD TYPE GET & RESPONSE TYPE IS BLOB
    getBlobRP(url: string, extraParams?: object, opt?: object): Observable<any> {
        const accessToken = AppConstants.AUTHORIZATION_HEADER;
        const HEADERS = new HttpHeaders()
            .set('Authorization', accessToken)
            .set('Cache-Control', 'private, no-cache, no-store, must-revalidate')
            .set('Pragma', 'no-cache')
            .set('Expires', '-1')
            .set('Access-Control-Allow-Credentials', 'true')
            .set('Access-Control-Allow-Methods', 'GET, POST')
            .set('Access-Control-Max-Age', '1800')
            .set('X-Frame-Options', 'SAMEORIGIN')
            .set('X-XSS-Protection', '1; mode=block');
        // .set('rGId', this.getRgId().toString());
        const options = opt ? opt : {
            headers: HEADERS,
            // observe: 'response',
            params: {},
            responseType: 'blob'
        };
        if (extraParams !== undefined) {
            for (const param of Object.keys(extraParams)) {
                options['params'][param] = extraParams[param];
            }
        }
        return this.http.get(url, options).pipe(catchError(this.clientErrorHandler.handleError));
    }

   /*  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // cloning original request and set/add new headers
        const authReq = req.clone({
            headers: req.headers
                .set('Access-Control-Allow-Origin', '*')
                .set('Content-Type', 'application/json')
                .set('Access-Control-Expose-Headers', '*')
             req.headers,
            params: req.params
    });
        return next.handle(authReq);
        } */

    private getRgId(): number {
    if (this.appStorage.getSessionAttribute('isLoggedIn')) {
        const MENU: MenuModel[] = this.appStorage.getSessionAttribute('menus');
        const CURR_PATH_ARR = this.location.path().split('/');
        while (CURR_PATH_ARR.length > 1) {
            const CURR_PATH = CURR_PATH_ARR.join('/');
            const INDEX = MENU.findIndex(ele => ele.routerLink === CURR_PATH);
            if (INDEX !== -1) {
                return MENU[INDEX].resGrId;
            } else {
                CURR_PATH_ARR.pop();
            }
        }
        return 0;
    } else {
        return 0;
    }

}

// for e-appeal whcih is outeside the loigin
   getWithOutAuth(url: string, opt?: object): Observable<any> {
        // console.log('rGId', this.getRgId().toString());
       const accessToken = AppConstants.AUTHORIZATION_HEADER || '';
        // console.log(accessToken);
        const HEADERS = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('x-auth', accessToken)
            .set('Cache-Control', 'private, no-cache, no-store, must-revalidate')
            .set('Pragma', 'no-cache')
            .set('Expires', '-1')
            .set('Access-Control-Allow-Credentials', 'true')
            .set('Access-Control-Allow-Methods', 'GET, POST')
            .set('Access-Control-Max-Age', '1800')
            .set('X-Frame-Options', 'SAMEORIGIN')
            .set('X-XSS-Protection', '1; mode=block');
            // .set('rGId', this.getRgId().toString());
        const options = opt ? opt : {
            headers: HEADERS,
            params: {}
        };
        // console.log(options);
        return this.http.get(url, options).pipe(catchError(this.clientErrorHandler.handleError));
    }
}
