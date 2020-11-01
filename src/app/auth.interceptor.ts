import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { LoginService } from './service/login.service'
import { Router } from '@angular/router';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {



  intercept(req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {
      // let idToken:string;
      // let cookies:string[] = document.cookie.split(';');
      // cookies.forEach(o=>{
        
      //   let cookie = o.split('=');
        
      //   if(cookie[0].match('idToken')){
      //     idToken = cookie[1];
      //   }
      // });
    

    const idToken = localStorage.getItem("idToken");
    // console.log(idToken);

    if (idToken) {
      const authReq = req.clone({ setHeaders: { Authorization: "Bearer " + idToken } });
      // console.log("--++++++++++++++++---"+authReq.headers.get("Authorization"));
      return next.handle(authReq);
    }
    else {
      return next.handle(req);
    }
  }


  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }
}