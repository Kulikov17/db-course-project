import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  isDadata(request: HttpRequest<any>): Boolean {
    return request.url == 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address' ? true : false
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isLoggedIn = localStorage.getItem('token');
    
    if (isLoggedIn && !this.isDadata(request)) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${isLoggedIn}`
        }
      });
    }

    return next.handle(request);
  }
}