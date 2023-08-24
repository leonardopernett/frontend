import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StateService } from "../services/state.service";

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {

  constructor(
    private state:StateService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      
      if (this.state.getValueOf('rawtoken')){

        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${this.state.getValueOf('rawtoken')}`
          }
        });
      }

      return next.handle(request);
  }
}

export const JwtInterceptor = { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true }