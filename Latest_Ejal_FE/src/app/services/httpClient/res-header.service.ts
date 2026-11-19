import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
 
@Injectable()
export class ResponseHeaderInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("Responsecalled");
    
    return next.handle(req).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log("HttpResponse");
         
          // Create a new response object without the X-Powered-By header
          const modifiedResponse = event.clone({
            headers: event.headers
              .delete('X-Powered-By') // Remove the X-Powered-By header
              .set('Access-Control-Allow-Origin', 'http://localhost:4200') // Set Access-Control-Allow-Origin header
          });
 
          return modifiedResponse; // Return the modified response
        }
        else {
          console.log("HttpResponse1");
        }
        console.log(event);
        
        return event; // If not an HttpResponse, return the original event
      })
    );
  }
}