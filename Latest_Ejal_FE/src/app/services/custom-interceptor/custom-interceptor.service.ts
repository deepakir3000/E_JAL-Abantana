import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';

@Injectable(/* {
  providedIn: 'root'
} */)
export class CustomInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log('--------------INTERCEPTOR INVOKED----------------');
    // const httpRequest = req.clone({
    //   headers: new HttpHeaders({
    //     'Cache-Control': 'no-cache',
    //     'Pragma': 'no-cache',
    //     'Expires': '-1',
    //     'Access-Control-Allow-Origin': 'http://localhost:4200',
    //     'X-Powered-By':''
    //   })
    // });
    const httpRequest = req.clone({
      headers: req.headers
        .set('X-Powered-By',"") // Remove the existing 'X-Powered-By' header
        .set('Cache-Control', 'no-cache')
        .set('Pragma', 'no-cache')
        .set('Expires', '-1')
        .set('Access-Control-Allow-Origin', 'http://localhost:4200') // Set the Access-Control-Allow-Origin header
    });
    console.log(httpRequest,'http');
    
    return next.handle(httpRequest);
  }
}
