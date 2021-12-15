import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private userService : UserService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headersConfig : any = {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*"
    };

    const token = this.userService.currentUserValue()?.user.token;
    
    if (token) {
      headersConfig['Authorization'] = `Token ${token}`;
    }

    const request = req.clone({ setHeaders: headersConfig });
    return next.handle(request);
  }
}
