
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Router } from "@angular/router";
import { catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { UserAuthService } from "../_Services/user-auth.service";
import { Injectable } from "@angular/core";
import Swal from "sweetalert2";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private userAuthService: UserAuthService,
    private router: Router
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.get("No-Auth") === 'True') {
      return next.handle(req.clone());
    }

    const token = this.userAuthService.getToken();
    if (token) {
      req = this.addToken(req, token); // Add token to the request
    }

    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        console.log('HTTP Error Status:', err.status);

        if (err.status === 401) {
          this.router.navigate(['/login']);
        } else if (err.status === 403) {
          this.router.navigate(['/forbidden']);
        }

        return throwError(err);
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string) {
    console.log('JWT Token:', token);
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
